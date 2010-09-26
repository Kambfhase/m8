#ifndef VECTOR_JS
#define VECTOR_JS

var Vector = Class.create({
    parent: Collection,
    "static":{
        like: {
            value: function( obj){
                 if( (Array.prototype.isPrototypeOf( obj) || "length" in obj) && typeof obj[0] === "number"){
                      return true;
                 } else {
                      return false;
                 }
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        sameDimensions: {
            value: function( ){
                var i = arguments.length, m= arguments[ --i].length;
                while( i--){
                    if( arguments[ i].length !== m){
                        return false;
                    }
                }
                return true;
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        standardScalarproduct: {
            value: function( a, b){
                if( !this.sameDimensions( a, b)){
                    throw new TypeError("Vector-Dimensions mismatch!");
                }
                var ret=0, i=a.length;
                while( i--){
                    ret += a[ i] * b[ i];
                }
                return ret;
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
        }
    },
    "instance":{
        sameDimensions: {
            value: function( other){
                if( arguments.length === 1){
                    return this.length === other.length;
                } else {
                    return this.constructor.sameDimensions.apply( this.constructor, arguments.push( this)); // ES5 only
                }
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        toArray: {
            value: function(){
                return this.slice();
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        copy: {
            value: function(){
                return this.constructor.create( this.slice());
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        toMatrix: {
            value: function(){
                var that = [], i= this.length;
                while( i--){
                    that[ i]= [ this[ i]];
                }
                return Matrix.create( that);
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        magnitude: {
            value: function(){
                var ret=0, i=this.length;
                while( i--){
                    ret += this[i]*this[i];
                }
                return Math.sqrt( ret);
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        equals: {
            value: function( other, precision){
                precision = precision === undefined ? this.constructor.precision : precision;
                if( !this.sameDimensions( other))
                    return false;
                var i= this.length;
                while( i--){
                    if( Math.abs( this[ i] - other[ i]) > precision){
                        return false;
                    }
                }
                return true;
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        scale: {
            value: function( lambda){
                var that = [], i= this.length;
                while( i--){
                    that[ i]= this[ i]* lambda;
                }
                return this.constructor.create( that);
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        normalize: {
            value: function(){
                return this.scale( 1/ this.magnitude());
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        add: {
            value: function( other){
                var that = [], i=this.length;
                if( !this.sameDimensions( other))
                    throw new TypeError("Vector-Dimensions mismatch");
                while( i--){
                    that[ i] = this[ i]+ other[ i];
                }
                return this.constructor.create( that);
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        dot: {
            value: function( other){
                if( !this.sameDimensions( other))
                    throw new TypeError("Vector-Dimension mismatch");
                var ret = 0, i=this.length;
                while( i--){
                    ret += this[ i] * other[ i];
                }
                return ret;
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        multWMatrix: {
            value: function( mat){
                
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        mult: {
            value: function( other){
                var constr = this.constructor;
                if( typeof other === "number"){
                    return this.scale( other);
                } else if( hVector.is( other) || hVector.like( other)){
                    return (function(){
                        // Matrix Product
                        var n=this.length,i=n,j, that=[], row;
                        while( i--){
                            j=n;
                            row=[];
                            while( j--){
                                row[ j] = this[i] * other[j];
                            }
                            that[i]=row;
                        }
                        return Matrix.create( that);
                    }).call( this);
                
                } else if( Matrix.is( other) || Matrix.like( other)){
                    return this.multWMatrix( other);
                } else if( constr.is( other) || constr.like( other)){
                    return this.dot( other);
                }
            },
            enumerable: false,
            configurable: true,
            writable: true
        }
    }
}),

hVector = Class({
    parent: Vector,
    "static": {
        like: {
            value: function( other){
                return Vector.like( other) && other.horizontal;
            }
        }
    },
    instance: {
        horizontal: {
            value: true,
            enumerable: false,
            configurable: true,
            writable: true
        },
        
    }
});

#endif
