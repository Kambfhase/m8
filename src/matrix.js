#ifndef MATRIX_JS
#define MATRIX_JS
#include "class.js"
#include "matrixbase.js"

(function(namespace){
"use strict";

var Matrix,
    MatrixFn,
    instanceDescriptor,
    staticDescriptor;

staticDescriptor = {
    // this object holds the Properties to be added to the Matrix function.
    create:{ 
        value: function( arr){
            // returns a new Matrix
            return this.wrap( arguments.length > 1 ? this.rectangle.apply( this, arguments) : arr);
        },
        enumerable: false,
        configurable: true,
        writable: true
    },
    isRectangular:{
        value: function( arr){
            // checks if a given array is rectangular
            var i=1, n= arr[0].length;
            for(; i<arr.length; ++i){
                if( arr[i].length !== n){
                    return false;
                }
            }
            return true;
        },
        enumerable: false,
        configurable: true,
        writable: true
    },
    isSquare:{
        value: function( arr){
            // returns true if the given array is square
            return arr.length === arr[0].length && this.isRectangular( arr);
        },
        enumerable: false,
        configurable: true,
        writable: true
    },
    isTriangular:{
        value: function( arr){            
            // returns 1 if the given array is an upper triagonal matrix.
            // returns -1 if arr is a lower triagonal matrix.
            // returns 0 otherwise;
            // returns 2 for diagonal matrices.
            var m=arr.length, n= arr[0].length,
                j,i,flag,row;
            
            i=m;
            while( i--){
                // iterate over the rows
                j=n;
                row = arr[i];
                while( j--){
                    // iterate over the coloumns
                    if( i=== j || !row[j]){
                        // skip zero and diagonal elements.
                        continue; 
                    }
                    if( !flag){
                        flag = ( i > j ? -1 : 1 ); 
                        // set the flag the first time
                        continue;
                    }
                    if( flag === ( i > j ? -1 : 1 )){
                        // check if the current elements fits the pattern
                        continue;
                    }
                    return 0;
                }
            }
            // if flag ist still undefined at this point, we can 
            // conclude, that the matrix only contains zeros or
            // diagonal elements.
            return flag || 2;
        },
        enumerable: false,
        configurable: true,
        writable: true
    },
    identity: { 
        value: function( n){
            // returns the identity Matrix with the dimension n
            var arr = [],
                i= 0, k;
            for(; i<n; ++i){
                arr[i]=[];
                for( k=0; k<n; ++k){
                    arr[i][k] = i === k ? 1 : 0;
                }
            }
            return this.wrap( arr);
        },
        enumerable: false,
        configurable: true,
        writable: true
    },
    householder:{
        value: function( arr){
            var vec = Vector( arr).normalize(), l=vec.length;
            return Matrix.identity(l).add( vec.mult( vec.transpose()).scale( -2));
        },
        enumerable: false,
        configurable: true,
        writable: true
    },
    det: { 
        value: function( arr){
            // arr: a square-matrix-like array
            // returns the determinant of the given matrix
            var ret= 0,
                m=arr.length, n= arr[0].length,
                i=n, firstrow;
            if( m === 1){
                // End of recursion
                return arr[0][0];
            }
            if( m === 2){
                // reduce recursion for 2x2 matrices
                return arr[0][0] * arr[1][1] - arr[0][1] * arr[1][0];
            }
            if( !!Matrix.isTriangular( arr)){
                // if arr is a triangular matrix, the determinant is
                // just the product of the elements along the main diagonal
                ret= 1;
                while( i--){
                    ret *= arr[i][i];
                }
                return ret;
            } else {
                // else we do Laplace expansion along the first row
                // which is sloooooooooooooooooow!
                firstrow = arr[0];
                while( i--){
                    if( firstrow[i]){
                        // skip 0 elements since 0*x=0
                        ret += firstrow[i] * ( i & 1 ? -1 : 1) * Matrix.det( Matrix.cut( arr, 0, i));
                    }
                }
                return ret;
            }
        },
        enumerable: false,
        configurable: true,
        writable: true
    },
    cut:{
        value: function( arr, i, j){
            // returns arr without row i and col j
            var ret = arr.slice(0,i).concat( arr.slice(i+1));
            ret = ret.map( function( row){
                return row.slice(0, j).concat( row.slice( j+1));
            });
            return ret;
        },
        enumerable: false,
        configurable: true,
        writable: true
    }
};

instanceDescriptor = {
    // this objects contains the property descriptors for the Matrix prototype
    add: {
        value: function( other){
            // other is either another Matrix instance or a Matrix-like array
            // returns the sum
            if( !Matrix.sameDimensions( this, other)){
                throw new TypeError("this.add( other): Only Matrices of the same Dimensions kann be added. this: "+this.toString()+" other: "+Matrix.prototype.toString.call(other));
            }
            return Matrix.wrap( MatrixBase.prototype.add.call( this, other));
        },
        enumerable: false,
        configurable: true,
        writable: true
    },
    mult: {
        value: function( other){
            // other is either another Matrix instance or a Matrix-like array
            // returns this*other
            if( this[0].length !== other.length){
                throw new TypeError("this.mult( other): The matrices dimensions mismatch! this: "+ this.toString()+ " other: "+other);
            }
            return Matrix.wrap( MatrixBase.prototype.mult.call(this,other));
        },
        enumerable: false,
        configurable: true,
        writable: true
    },
    adjugate: {
        value: function(){
            // returns the adjugate matrix
            if( !Matrix.isSquare( this)){
                throw new TypeError("this.adjugate(): there is no adjugate matrix for non square matrixes. this:"+this.toString());
            }
            if( this.length === 1){
                return this.copy();
            }
            
            var arr= [], n= this[0].length, i= n, j, row;
            
            while( i--){
                row=[];
                j=n;
                while( j--){
                    row[j] = ( (i^j) & 1 ? -1 : 1) * Matrix.det( Matrix.cut( this, j, i));
                    // auto transpose
                }
                arr[i]=row;
            }
            
            return Matrix.wrap(arr);
        },
        enumerable: false,
        configurable: true,
        writable: true
    },
    invert: {
        value:function(){
            // returns the inverted Matrix
            if( !Matrix.isSquare( this)){
                throw new TypeError("this.invert(): there is no inverted matrix for non square matrixes. this:"+this.toString());
            }
            if( this.length === 1){
                return Matrix.create([[1/this[0][0]]]);
            }
            return this.adjugate().scale( 1/this.det());
        },
        enumerable: false,
        configurable: true,
        writable: true
    },
    row: {
        value: function( i){
            //returns the i-th row
            return this[i];
        },
        enumerable: false,
        configurable: true,
        writable: true
    },
    col: {
        value: function( j){
            // returns the j-th coloumn
            var that= [],
                i=0;
            for(; i< this.length; i++){
                that[i] = this[i][j];
            }
            return that;
        },
        enumerable: false,
        configurable: true,
        writable: true
    },
    det: {
        value: function(){
            if( !Matrix.isSquare( this)){
                return 0;
            }
            return Matrix.det( this.toArray());
        },
        enumerable: false,
        configurable: true,
        writable: true
    },
    equals: {
        value: function( other){
            // returns a boolean if this is the same Matrix as other
            if( !Matrix.sameDimensions( this, other)){
                return false;
            }
            return MatrixBase.prototype.equals.call(this,other);
        },
        enumerable: false,
        configurable: true,
        writable: true
    },
};

Matrix = Class.create({
    "static": staticDescriptor,
    instance: instanceDescriptor,
    parent: MatrixBase
});

namespace.Matrix = Matrix;

})(window);

#endif
