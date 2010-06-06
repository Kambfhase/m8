#ifndef MATRIX_JS
#define MATRIX_JS
#include "class.js"
#include "matrixbase.js"

(function(namespace){
"use strict";

var Matrix,
    MatrixFn,
    instanceDescriptor,
    staticDescriptor,
    addLength = function( obj){
return Object.defineProperty( obj, 'length', { get: 
    function(){
        var keys = Object.keys( this),
            i=0,
            biggest = 0;
        for(; i< keys.length; ++i){
            if( ~~keys[i] > biggest){
                biggest = ~~keys[i];
            }
        }
        return biggest+1;
    },
    set: function( biggest){
        if( biggest >= this.length){
            this[ biggest] = undefined;
        }
    }});
};

staticDescriptor = {
    // this object holds the Properties to be added to the Matrix function.
    create:{ value: function( arr){
        // returns a new Matrix
        return this.wrap( arguments.length > 1 ? this.rectangle.apply( this, arguments) : arr);
    }},
    isRectangular:{value: function( arr){
        // checks if a given array is rectangular
        var i=1, n= arr[0].length;
        for(; i<arr.length; ++i){
            if( arr[i].length !== n){
                return false;
            }
        }
        return true;
    }},
    isSquare:{value: function( arr){
        // returns true if the given array is square
        return arr.length === arr[0].length && this.isRectangular( arr);
    }},
    identity: { value: function( n){
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
    }},
    det: { value: function( arr){
        // arr: a matrix like array
        // returns the determinant of the given matrix
        var ret= 0,
            i=0;
        if( !Matrix.isSquare(arr)){
            return 0;
        }
        if( arr.length === 1){
            // End of recursion
            return arr[0][0];
        }
        if( arr.length === 2){
            // reduce recursion for 2x2 matrices
            return arr[0][0] * arr[1][1] - arr[0][1] * arr[1][0];
        }
        for(; i< arr[0].length; ++i){
            if( arr[0][i] !== 0){
                // skip 0 elements since 0*x=0
                ret += arr[0][i] * Math.pow( -1, i) * Matrix.det( Matrix.cut( arr, 0, i));
            }
        }
        return ret;
    }},
    cut:{value: function( arr, i, j){
        // returns arr without row i and col j
        var ret = arr.slice(0,i).concat( arr.slice(i+1));
        ret = ret.map( function( row){
            return row.slice(0, j).concat( row.slice( j+1));
        });
        return ret;
    }},
    prototype:{ value: {}}
};

instanceDescriptor = {
    // this objects contains the property descriptors for the Matrix prototype
    copy: {value: function(){
        // returns a deep copy of this Matrix instance
        return Matrix.wrap( Matrix.deepArrayCopy( this.toArray()));
    }},
    add: {value: function( other){
        // other is either another Matrix instance or a Matrix-like array
        // returns the sum
        if( !Matrix.sameDimensions( this, other)){
            throw new TypeError("this.add( other): Only Matrices of the same Dimensions kann be added. this: "+this.toString()+" other: "+Matrix.prototype.toString.call(other));
        }
        return Matrix.wrap( MatrixBase.prototype.add.call( this, other));
    }},
    scale: {value: function( lambda){
        // lambda should be a number
        // returns a new Matrix where each element is old_element*lambda
        return Matrix.wrap( MatrixBase.prototype.scale.call(this, lambda));
    }},
    mult: {value: function( other){
        // other is either another Matrix instance or a Matrix-like array
        // returns this*other
        if( this[0].length !== other.length){
            throw new TypeError("this.mult( other): The matrices dimensions mismatch! this: "+ this.toString()+ " other: "+other);
        }
        return Matrix.wrap( MatrixBase.prototype.mult.call(this,other));
    }},
    transpose: {value: function(){
        // returns this Matrix flipped
        return Matrix.wrap( MatrixBase.prototype.transpose.call(this));
    }},
    adjugate: {value: function(){
        // returns the adjugate matrix
        if( !Matrix.isSquare( this)){
            throw new TypeError("this.adjugate(): there is no adjugate matrix for non square matrixes. this:"+this.toString());
        }
        if( this.length === 1){
            return this.copy();
        }
        var arr = Matrix.rectangle( this.length, this[0].length),
            i=0, j=0;
        for(; i< this.length; ++i){
            for(j=0; j< this[0].length; ++j){
                arr[i][j] = Math.pow(-1, i+j) * Matrix.det( Matrix.cut( this, i, j));
            }
        }
        
        return Matrix(arr).transpose();
    }},
    invert: {value:function(){
        // returns the inverted Matrix
        if( !Matrix.isSquare( this)){
            throw new TypeError("this.invert(): there is no inverted matrix for non square matrixes. this:"+this.toString());
        }
        if( this.length === 1){
            return Matrix([[1/this[0][0]]]);
        }
        return this.adjugate().scale( 1/this.det());
    }},
    row: {value: function( i){
        //returns the i-th row
        return this[i];
    }},
    col: {value: function( j){
        // returns the j-th coloumn
        var that= [],
            i=0;
        for(; i< this.length; i++){
            that[i] = this[i][j];
        }
        return that;
    }},
    det: {value: function(){
        return Matrix.det( this.toArray());
    }},
    equals: {value: function( other){
        // returns a boolean if this is the same Matrix as other
        if( !Matrix.sameDimensions( this, other)){
            return false;
        }
        return MatrixBase.prototype.equals.call(this,other);
    }},
    //length:{ value: 0}
};

//Matrix = combine( MatrixFn, staticDescriptor, instanceDescriptor);
Matrix = Class.create({
    "static": staticDescriptor,
    instance: instanceDescriptor,
    parent: MatrixBase
});

//Matrix.prototype = addLength( Matrix.prototype);

//namespace.Vector = Vector;
namespace.Matrix = Matrix;

})(window,'en');

#endif
