#ifndef MATRIX_JS
#define MATRIX_JS
#include "class.js"


var Matrix = Class({
    "parent": Collection,
    "static": {
        // this object holds the Properties to be added to the Matrix function.
        create:{ 
            value: function( arr, b, c){
                // returns a new Matrix
                return this.wrap( b ? this.rectangle( arr, b, c) : arr);
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        wrap: { value: function( arr){
                var that = Object.create( this.prototype),
                    i=arr.length;
                while( i--){
                    that[i] = arr[i].slice();
                }
                return that;
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        rectangle: { value: function( m, n, initial){
                var row, i=m, j=n, arr=[];
                initial = initial === undefined? 0: initial;
                while( i--){
                    row=[];
                    j=n;
                    while( j--){
                        row[j] = initial;
                    }
                    arr[i]=row;
                }
                return arr;
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        deepArrayCopy: { value: function( arr){
                if( Array.prototype.isPrototypeOf( arr) || arr.map){
                    return arr.map( this.deepArrayCopy, this);
                } else {
                    return arr;
                }
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        sameDimensions:{value:function(){
                // returns true if all given matrices have the same dimensions
                var k = arguments.length - 1,
                    n = arguments[ k].length,
                    m = arguments[ k][ 0].length;
                    
                while( k--){
                    if( n !== arguments[k].length || m !== arguments[k][0].length){
                        return false;
                    }
                }
                return true;
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        precision: { 
            value: 1e-6,
            enumerable: false,
            configurable: true,
            writable: true 
        },
        like: {
            value: function( arr){
                // returns true if arr is an array of arrays( of numbers)
                return this.isRectangular( arr);
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        isRectangular:{
            value: function( arr){
                // checks if a given array is rectangular
                if( !arr || !arr.length || !arr[0].length){
                    return false;
                }
                
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
    },
    "instance":{
        // this objects contains the property descriptors for the Matrix prototype
        copy: { 
            value: function(){
                //return Matrix.create( Matrix.deepArrayCopy( this));
                return this.constructor.create( Matrix.deepArrayCopy( this));
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        toArray: { value: function(){
                return this.slice();
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        toString: { value: function(){
                return JSON.stringify( this.toArray());
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        transpose: { value: function(){
                var j, i=this[0].length, m= this.length,
                    that = [];
                while( i--){
                    j=m;
                    that[i] = [];
                    while( j--){
                        that[i][j] = this[j][i];
                    }
                }
                return this.constructor.create(that);
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        "scale":{ value: function( lambda){
                var that = [], i=this.length, j, row;
                while( i--){
                    row=[];
                    j=this[i].length;
                    while( j--){
                        row[j]=this[i][j] * lambda;
                    }
                    that[i]=row;
                }
                return this.constructor.create(that);
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        add: {
            value: function( other){
                // other is either another Matrix instance or a Matrix-like array
                // returns the sum
                if( !Matrix.sameDimensions( this, other)){
                    throw new TypeError("this.add( other): Only Matrices of the same Dimensions kann be added. this: "+this.toString()+" other: "+Matrix.prototype.toString.call(other));
                }
                var that = [], i=this.length,j,row;
                while( i--){
                    row=[];
                    j=this[i].length;
                    while(j--){
                        row[j]=this[i][j]+other[i][j];
                    }
                    that[i]=row;
                }
                return this.constructor.create(that);
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        multWMatrix: {
            value: function( other){
                // other is either another Matrix instance or a Matrix-like array
                // returns this*other
                if( this[0].length !== other.length){
                    throw new TypeError("this.mult( other): The matrices dimensions mismatch! this: "+ this.toString()+ " other: "+other);
                }
                var that = [],
                    i=0,j,k,
                    n=this.length,
                    m=other[0].length,
                    o=other.length,
                    sum, rowThis, rowThat;
                    
                if( o=== 1){
                    for(;i< n; i++){
                        //rowThat=[];
                        rowThis=this[i];
                        for(j=0;j< m; ++j){
                            rowThat = [ rowThis[0]*other[0][j]];
                        }
                        that[i]=rowThat;
                    }
                    return this.constructor.create( that);
                }
                if( o=== 2){
                    i=n;
                    //for(;i< n; i++){
                    while( i--){
                        rowThat=[];
                        rowThis=this[i];
                        j=m;
                        while( j--){
                        //for(j=0;j< m; ++j){
                            rowThat[j] = rowThis[0]*other[0][j]+rowThis[1]*other[1][j];
                        }
                        that[i]=rowThat;
                    }
                    return this.constructor.create( that);
                }
                for(;i< n; ++i){ 
                    // for all this-rows
                    rowThat=[];
                    rowThis=this[i];
                    for(j=0;j< m; ++j){ 
                        // for each other-cols
                        sum = 0;
                        // walk through the col-row pair multiply the values and sum them up
                        for(k=0; k<o; ++k){
                            sum += rowThis[k]*other[k][j];
                        }
                        rowThat[j] = sum;
                    }
                    that[i]=rowThat;
                }
                return this.constructor.create(that);
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        multWVector: {
            value: function( other){
                var constr= other.constructor;
                
                return constr( this.multWMatrix( other.toMatrix()).map(function(a){
                    return a[0];
                }));
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        mult: {
            value: function( other){
                // Meta function
                if( typeof other === "number"){
                    return this.scale( other);
                } else if( Matrix.is( other) || Matrix.like( other)){
                    return this.multWMatrix( other);
                } else if( Vector.is( other)){
                    return this.multWVector( other);
                } else if( other.toMatrix ){
                    return this.multWMatrix( other.toMatrix());
                }
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        pow: {
            value: function( e){
                // multiply this matrix e-1 times with itself
                e = ~~e; // convert e to an integer
                var n=this.length;
                if( !e){
                    return Matrix.identity( n);
                }
                if( e === 1){
                    return this.copy();
                }
                // the trick here is to reduce the number of multiplications.
                // say you need A^9 you could do A^9 = A*A*A*A*A*A*A*A*A
                // that'd be 8 multiplications. But there is a faster way.
                // You calculate A^2= A*A and A^4 = A^2 * A^2 and A^8 = A^4 * A^4.
                // finally A^9 = A^8 * A which takes only 4 multiplications!
                var cache = this, l=2, ret= e & 1 ? this : Matrix.identity( n);
                
                while( l <= e){
                    cache = cache.mult( cache);
                    if( l & e){
                        ret = ret.mult( cache);
                    }
                    
                    l <<= 1;
                }

                return ret; 
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
                        row[j] = ( (i^j) & 1 ? -1 : 1) * Matrix.prototype.det.call( Matrix.cut( this, j, i));
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
                //returns the determinant
                if( !Matrix.isSquare( this)){
                    return null;
                }
                var n= this.length, ret = 1;
                
                if( n=== 1){
                    return this[0][0];
                }
                if( n=== 2){
                    return this[0][0] * this[1][1] - this[1][0] * this[0][1];
                }
                if( Matrix.isTriangular( this)){
                    while( n--){
                        ret *= this[n][n];
                    }
                    return ret;
                } else {
                    // Use Gauss elimination for computation, which is faster than Laplace expansion.
                    // This method has a small round-off error.
                    // It was hard to write, so it should be at least hard to read.
                    var i, j, k, fak, rowi, rowj, R=Matrix.deepArrayCopy( this);
                    
                    for(i=0; i<n; i++){
                        rowi = R[i];
                        if( !rowi[i]){
                            for( j=i+1; j<n; j++){
                                rowj=R[j];
                                if( rowj[i]){
                                    for( k=i; k<n; k++){
                                        rowi[ k] += rowj[ k];
                                    }
                                    break;
                                }
                            }
                        }
                        if( rowi[i]){
                            for( j=i+1; j<n; j++){
                                rowj= R[j];
                                fak= rowj[i] / rowi[i];
                                if( fak){
                                    for( k=i; k<n; k++){
                                        rowj[k] -= rowi[k]*fak;
                                    }
                                }
                            }
                            ret *= rowi[i];
                        } else {
                            return 0;
                        }
                    }
                    return ret;
                }
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
                var i= this.length, j, rowThis, rowThat;

                while( i--){
                    rowThis = this[i];
                    rowThat = other[i];
                    j=rowThis.length;

                    while( j--){
                        if( Math.abs( rowThis[j] - rowThat[j]) > Matrix.precision){
                            return false;
                        }
                    }
                }
                return true;
            },
            enumerable: false,
            configurable: true,
            writable: true
        }
    }
});


#endif
