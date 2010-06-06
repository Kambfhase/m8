#ifndef VECTOR_JS
#define VECTOR_JS

var Vector = Class.create({
    parent: MatrixBase,
    "static":{
        create: { value: function( arr, initial){
                return this.wrap( arguments.length > 1 || typeof arr === "number" ? this.rectangle( arr, 1, initial) : arr);
            }, 
            enumerable: false,
            DOC({
                args: ["arr ( Array | Number): an Array to be wrapped by Vector XOR the number of rows for a new Vector","b (Number), optional: an intial value for the new Vector"],
                returntype: "Vector",
                desc: "Passes through to Vector.wrap if the first argument is an Array. Else passes through to Vector.rectangle.",
                example: "Vector( 3, 1)"
            })
        }
    },
    "instance":{
        "scale": { value: function( lambda){
                return Vector.wrap( MatrixBase.prototype.scale.call( this, lambda));
            },
            enumerable: false,
            DOC({
                args: ["lambda ( Number): the factor to scale this vector by."],
                returntype: "Vector",
                desc: "Scales a Vector by a factor called lambda.",
                example: "Vector([[3,9]]).scale(1/3)"
            })
        },
        "transpose":{ value: function(){
                return Vector.wrap( MatrixBase.prototype.transpose.call(this));
            },
            enumerable: false,
            
        },
        "add":{ value: function( other){
                if( this.length !== other.length){
                    throw new TypeError("this.add( other): Vector dimensions mismatch!");
                }
                return Vector.wrap( MatrixBase.prototype.add.call(this,other));
            },
            enumerable: false,
            DOC({
                args: ["other ( Array | MatrixBase | Vector): the Vector to add!"],
                returntype: "Vector",
                desc: "Adds an other vector to the this vector.",
                example: "Vector([[1,2]]).add([[2,1]])"
            })
        },
        "mult":{ value: function( other){
                return MatrixBase.wrap( MatrixBase.prototype.mult.call(this,other));
            },
            enumerable: false
        },
        "magnitude":{ value:function(){
                // returns the "length" of this vector
                var sum=0, i=this.length;
                while( i--){
                    sum += Math.pow( this[i], 2);
                }
                return Math.pow( sum, 1/2);
            },
            enumerable: false
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
            enumerable: false
        }
    }
});

#endif
