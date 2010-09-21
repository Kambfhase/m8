/*!
 * m8 - JavaScript Math Library - v0.2
 * by Kambfhase
 * released under MIT License 
 *
 * includes vice-versa by Andrea Giammarchi
 */
 (function (Object, hasOwnProperty) {







    var forIn = (function () {
        function forIn(o, callback, self) {
            for (var key in o) {
                callback.call(self, o[key], key, o);
            }
        }
        for(var key in {toString:null}) {
            if (key === "toString") {
                return forIn;
            }
        }
        return (function () {
            for (var
                split = "constructor.hasOwnProperty.isPrototypeOf.propertyIsEnumerable.toLocaleString.toString.valueOf".split("."),
                callback = [],
                i = split.length;
                i--;
            ) {
                callback[i] = ['hasOwnProperty.call(o,"', '")&&callback.call(self,o.', ',"', '",o);'].join(split[i]);
            }
            return Function("hasOwnProperty", forIn + ";return function(o,callback,self){forIn(o,callback,self);" + callback.join("") + "};")(hasOwnProperty);
        })();
    })();
    if (!Object.defineProperty) {
        Object.defineProperty = (function () {
            function $defineProperty(value, key) {
                if (hasOwnProperty.call(value, "value")) {
                    this[key] = value.value;
                } else {
                    if (hasOwnProperty.call(value, "get")) {

                        this.__defineGetter__(key, value.get);
                    }
                    if (hasOwnProperty.call(value, "set")) {

                        this.__defineSetter__(key, value.set);
                    }
                }
            };




            function defineProperty(o, key, desc){
                if (hasOwnProperty.call(desc, "value")) {
                    o[key] = desc.value;
                } else {
                    if (hasOwnProperty.call(desc, "get")) {

                        o.__defineGetter__(key, desc.get);
                    }
                    if (hasOwnProperty.call(desc, "set")) {

                        o.__defineSetter__(key, desc.set);
                    }
                }
                return o;
            };
            return defineProperty;
        })();
    }
    if (!Object.defineProperties) {
        Object.defineProperties = (function () {
            function $defineProperty(value, key) {
                Object.defineProperty(this, key, value);
            };
            function defineProperties(__proto__, desc) {
                forIn(desc, $defineProperty, __proto__);
                return __proto__;
            };
            return defineProperties;
        })();
    }
    if (!Object.create) {
        Object.create = (function () {
            function $() {};
            function create(__proto__, desc) {
                __proto__ = new $($.prototype = __proto__);
                $.prototype = null;
                return desc ? Object.defineProperties(__proto__, desc) : __proto__;
            };
            return create;
        })();
    }
    if( typeof Object.keys !== 'function'){
        Object.keys = function( Obj){
            var keys = [], p;
            for( p in Obj){
                if(hasOwnProperty.call( Obj, p)){
                    keys.push( p);
                }
            }
            return keys;
        };
    }






    if (!Object.getPrototypeOf) {
        Object.getPrototypeOf = (function () {
            function getPrototypeOf(o) {
                return o.__proto__;
            };
            return {}.__proto__ === Object.prototype ?
                getPrototypeOf :
                function(o){
                    if(o instanceof Object && o instanceof o.constructor) {
                        return o.constructor.prototype;
                    }
                }
            ;
        })();
    }

    if(!Object.getOwnPropertyDescriptor){
        Object.getOwnPropertyDescriptor = function( O, P){
            if( P in O){
                 return {value: O[P] };
            }
        }
    }
    if( !Object.getOwnPropertyNames){
        Object.getOwnPropertyNames= Object.keys;
    }

})(Object, Object.prototype.hasOwnProperty);
var Class = (function( Object){
"use strict";

var Class,
    skip = Object.getOwnPropertyNames(function(){});

Class = function( obj){
    var klass = function(){
            return klass.create.apply( klass, arguments);
        }, props, i, prop,
        par = obj[ "parent" ],
        stat = obj[ "static"],
        inst = obj["instance"];

    if( par){
        props = Object.getOwnPropertyNames( par);
        i= props.length;
        while( i--){
            prop = props[ i];
            if( skip.indexOf( prop) == -1){
                klass = Object.defineProperty( klass, prop, Object.getOwnPropertyDescriptor( par, prop));
            }
        }
    }

    if( stat){
        klass = Object.defineProperties( klass, stat);
    }
    klass.prototype = Object.create( (par && par.prototype || Object.prototype), inst);
    klass.prototype = Object.defineProperty( klass.prototype, "constructor", {
        value: klass,
        enumerable: false,
        configurable: true,
        writable: true
    });
    if( !klass.create){
        klass.create = function(){ return Object.create( this.prototype);};
    }
    if( !klass.is ){
        klass.is = function( obj){ return this.prototype.isPrototypeOf( obj);};
    }


    return klass;
};

Class = Class({
    "static": {
        create: {
            value: Class,
            enumerable: false,
            configurable: true,
            writable: true
        }
    }
});

return Class;

})(Object);




var Collection = (function(){

var klass = Class({
    "parent": Array,
    "static":{
        create: {
            value: function( arr){
                var that = Object.create( this.prototype),
                    i=arr.length;
                while( i--){
                    that[ i]= arr[ i];
                }
                return that;
            }
        }
    },
    "instance":{
         length: {
              value: 0,
              configurable: true
         },
         toArray: {
             value: function(){
                 return this.slice();
             }
         },
         toString: {
             value: function(){
                 return this.slice().toString();
             }
         },





    }
});

klass.prototype= (function( obj){
    return Object.defineProperty( obj, 'length', {
        get: function(){
            return Object.keys(this).length;
        },
        set: function( biggest){
            if( biggest >= this.length){
                this[ biggest] = undefined;
            }
        }
    });
})(klass.prototype);

return klass;
})();
var MatrixBase = (function(){
var klass = Class.create({
    "parent": Array,
    "static": {
        create : { value: function( arr){
                return this.wrap( arguments.length > 1 ? this.rectangle.apply( this, arguments): arr);
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
        }
    },
    "instance":{
        copy: {
            value: function(){

                return this.constructor.create( MatrixBase.deepArrayCopy( this));
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
        length: {
            value: 0,
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
        "add":{ value: function( other){
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
        "mult":{ value: function(other){

                var that = [],
                    i=0,j,k, sum,
                    cols = other[0].length;
                for(;i< this.length; ++i){

                    that[i] = [];
                    for(j=0;j< cols; ++j){

                        sum = 0;

                        for(k=0; k<this[i].length; ++k){
                            sum += this[i][k]*other[k][j];
                        }
                        that[i][j] = sum;
                    }
                }
                return this.constructor.create(that);
            },
            enumerable: false,
            configurable: true,
            writable: true
        },
        equals: { value: function( other){
                var i= this.length, j;
                if( i !== other.length){
                    return false;
                }
                while( i--){
                    j= this[ i].length;
                    if( j !== other[i].length){
                        return false;
                    }
                    while( j--){
                        if( Math.abs( this[i][j] - other[i][j]) > MatrixBase.precision){
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

klass.prototype = (function( obj){
    return Object.defineProperty( obj, 'length', {
        get: function(){

            return Object.keys(this).length;
        },
        set: function( biggest){
            if( biggest >= this.length){
                this[ biggest] = undefined;
            }
        }
    });
})(klass.prototype);

return klass;
})();




var Matrix= (function(namespace){


var Matrix,
    MatrixFn,
    instanceDescriptor,
    staticDescriptor;

staticDescriptor = {

    create:{
        value: function( arr){

            return this.wrap( arguments.length > 1 ? this.rectangle.apply( this, arguments) : arr);
        },
        enumerable: false,
        configurable: true,
        writable: true
    },
    like: {
        value: function( arr){

            return this.isRectangular( arr);
        },
        enumerable: false,
        configurable: true,
        writable: true
    },
    isRectangular:{
        value: function( arr){

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

            return arr.length === arr[0].length && this.isRectangular( arr);
        },
        enumerable: false,
        configurable: true,
        writable: true
    },
    isTriangular:{
        value: function( arr){




            var m=arr.length, n= arr[0].length,
                j,i,flag,row;

            i=m;
            while( i--){

                j=n;
                row = arr[i];
                while( j--){

                    if( i=== j || !row[j]){

                        continue;
                    }
                    if( !flag){
                        flag = ( i > j ? -1 : 1 );

                        continue;
                    }
                    if( flag === ( i > j ? -1 : 1 )){

                        continue;
                    }
                    return 0;
                }
            }



            return flag || 2;
        },
        enumerable: false,
        configurable: true,
        writable: true
    },
    identity: {
        value: function( n){

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


            var ret= 0,
                m=arr.length, n= arr[0].length,
                i=n, firstrow;
            if( m === 1){

                return arr[0][0];
            }
            if( m === 2){

                return arr[0][0] * arr[1][1] - arr[0][1] * arr[1][0];
            }
            if( !!Matrix.isTriangular( arr)){


                ret= 1;
                while( i--){
                    ret *= arr[i][i];
                }
                return ret;
            } else {


                firstrow = arr[0];
                while( i--){
                    if( firstrow[i]){

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

    add: {
        value: function( other){


            if( !Matrix.sameDimensions( this, other)){
                throw new TypeError("this.add( other): Only Matrices of the same Dimensions kann be added. this: "+this.toString()+" other: "+Matrix.prototype.toString.call(other));
            }
            return Matrix.wrap( MatrixBase.prototype.add.call( this, other));
        },
        enumerable: false,
        configurable: true,
        writable: true
    },
    multWMatrix: {
        value: function( other){


            if( this[0].length !== other.length){
                throw new TypeError("this.mult( other): The matrices dimensions mismatch! this: "+ this.toString()+ " other: "+other);
            }
            return Matrix.wrap( MatrixBase.prototype.mult.call(this,other));
        },
        enumerable: false,
        configurable: true,
        writable: true
    },
    mult: {
        value: function( other){

            if( typeof other === "number"){
                return this.scale( number);
            } else if( Matrix.is( other) || Matrix.like( other)){
                return this.multWMatrix( other);
            } else if( other.toMatrix ){
                return this.multWMatrix( other.toMatrix());
            }
        },
        enumerable: false,
        configurable: true,
        writable: true
    },
    adjugate: {
        value: function(){

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

            return this[i];
        },
        enumerable: false,
        configurable: true,
        writable: true
    },
    col: {
        value: function( j){

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
                            }
                            break;
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

            if( !Matrix.sameDimensions( this, other)){
                return false;
            }
            return MatrixBase.prototype.equals.call(this,other);
        },
        enumerable: false,
        configurable: true,
        writable: true
    }
};

Matrix = Class.create({
    "static": staticDescriptor,
    instance: instanceDescriptor,
    parent: MatrixBase
});

return Matrix;

})(window);






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
                    return this.constructor.sameDimensions.apply( this.constructor, arguments.push( this));
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
                return Math.pow( ret, .5);
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



var binom = function( n, k){
    var ret = 1;
    if ( k > (n/2) ){
        k = n - k;
    }
    while( k){
        ret *= n+1-k;
        ret /= k;
        k--;
    }
    return ret;
};
var fibonacci = (function( Math){
    var phi = (1+ Math.sqrt( 5)) /2,
        psi = (1- Math.sqrt( 5)) /2;

    return function( n){

        return n <= 2 ? n && 1 : Math.round( (Math.pow( phi, n) - Math.pow( psi, n)) / Math.sqrt( 5) );
    };
})( Math);

var factorial = function( n){
    if( n < 2){
        return 1;
    }

    var ret = 1;
    while( n){
        ret *= n--;
    }

    return ret;
};

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
                return this.constructor.create( this.r * other.r - this.i * other.i,
                    this.r * other.i + this.i * other.r);
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
