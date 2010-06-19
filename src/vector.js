#ifndef VECTOR_JS
#define VECTOR_JS

var Vector = Class.create({
    parent: MatrixBase,
    "static":{
        create: { value: function( arr, initial){
                return this.wrap( arguments.length > 1 || typeof arr === "number" ? this.rectangle( arr, 1, initial) : arr);
            }, 
            enumerable: false,
            configurable: true,
            writable: true
        },
        wrap: {
            value: function( arr){
                if( Array.prototype.isPrototypeOf( arr) && typeof arr[0] === "number"){
                    return Vector.wrap([ arr]).transpose();
                } else {
                    return MatrixBase.wrap.call( this, arr);
                }
            },
            enumerable: false,
            configurable: true,
            writable: true
        }
    },
    "instance":{
        "add":{ value: function( other){
                if( this.length !== other.length){
                    throw new TypeError("this.add( other): Vector dimensions mismatch!");
                }
                return Vector.wrap( MatrixBase.prototype.add.call(this,other));
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        "mult":{ value: function( other){
                return MatrixBase.wrap( MatrixBase.prototype.mult.call(this,other));
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        "magnitude":{ 
            value:function(){
                // returns the "length" of this vector aka euclidian norm
                var that= this.coords(),
                    sum= 0, i= that.length;
                
                while( i--){
                    sum += Math.pow( that[i][0], 2); // works without the [1], too. but this is clearer
                }
                return Math.pow( sum, 1/2);
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        "dot":{ value: function( other){
                var sum=0, i=this.length;
                if( i !== other.length){
                    throw new TypeError("this.dot( other): Vector dimensions mismatch!");
                }
                while( i--){
                    sum += this[i] * other[i];
                }
                return sum;
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        normalize:{
            value:function(){
                return this.scale( 1/this.magnitude());
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        "coords":{
            value: function(){
                // calculates the coordinate vector of this.
                // For vectical vectors that will just be a copy.
                // For horizontal vectors we will transpose them.
                // Might take a base param in a future version
                if( this.length < this [0].length){
                    return this.transpose();
                } else {
                    return this.copy();
                }
            },
            enumerable: false,
            configurable: true,
            writable: true
        }
    }
});

#endif
