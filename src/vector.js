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
        }
    },
    "instance":{
        "scale": { value: function( lambda){
                return Vector.wrap( MatrixBase.prototype.scale.call( this, lambda));
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        "transpose":{ value: function(){
                return Vector.wrap( MatrixBase.prototype.transpose.call(this));
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
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
        "magnitude":{ value:function(){
                // returns the "length" of this vector
                var sum=0, i=this.length;
                while( i--){
                    sum += Math.pow( this[i], 2);
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
        }
    }
});

#endif
