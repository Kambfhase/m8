var Complex = Class({
    "parent": Number,
    "static": {
        create: {
            value: function( r, i){
                var that = Object.create( this.prototype);
                that.r = r ||0;
                that.i = i ||0;
                return that;
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
        zero: {
            value: function(){
                return this.create( 0,0);
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        one: {
            value: function(){
                return this.create( 1,0);
            },
            enumerable: false,
            configurable: true,
            writable: true
        }
    },
    "instance":{
        copy: {
            value: function(){
                return this.constructor.create( this.r, this.i);
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        valueOf : {
            value: function(){
                return this.r;
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        toString: {
            value: function(){
                return this.r+ (this.i < 0 ? ""+ this.i : "+"+ this.i)+ "i";
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        equals: {
            value: function( other){
                return Math.abs( this.r - other.r) < this.constructor.precision 
                    && Math.abs( this.i - other.i) < this.constructor.precision;
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        conjugate: {
            value: function(){
                return this.constructor.create( this.r, -this.i);
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        add: {
            value: function( other){
                return this.constructor.create( this.r + other.r, this.i + other.i);
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        sub: {
            value: function( other){
                return this.constructor.create( this.r - other.r, this.i - other.i);
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        mult: {
            value: function( other){
                if( typeof other == "number"){
                    return this.constructor.create( other* this.r, other* this.i);
                } else {
                    return this.constructor.create( 
                        this.r * other.r - this.i * other.i,
                        this.r * other.i + this.i * other.r );
                }
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        div: {
            value: function( other){
                var foo = 1/( other.r * other.r + other.i * other.i);
                return this.constructor.create( ( this.r* other.r+this.i* other.i)*foo , ( this.i* other.r- this.r*other.i)*foo);
            },
            enumerable: false,
            configurable: true,
            writable: true
        }
    }
});