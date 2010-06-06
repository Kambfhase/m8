/*!
 * m8 - JavaScript Math Library - v0.1pre
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
            if( hasOwnProperty.call(O,P)){
                 return {value: O[P] };
            }
        }
    }

})(Object, Object.prototype.hasOwnProperty);


(function(){
"use strict";

var Object = this.Object,
    Class;

Class = function( obj){
    var klass = function(){
        return klass.create.apply( klass, arguments);
    }, props, i;

    if( obj.parent){
        props = Object.keys( obj.parent);
        for(i=0; i< props.length; ++i){
            klass = Object.defineProperty( klass, props[i], Object.getOwnPropertyDescriptor( obj.parent, props[i]));
        }
    }

    klass = Object.defineProperties( klass, obj["static"] || {});
    klass.prototype = Object.create( obj.parent && obj.parent.prototype || {}, obj.instance || {});

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
            value: Class
        }
    }
});


window.Class = Class;
})();





var MatrixBase = (function(){
var klass = Class.create({
    "parent": Array,
    "static": {
        create : { value: function( arr){
                return this.wrap( arguments.length > 1 ? this.rectangle.apply( this, arguments): arr);
            },
            enumerable: false
        },
        wrap: { value: function( arr){
                var that = Object.create( this.prototype),
                    i=arr.length;
                while( i--){
                    that[i] = arr[i].slice();
                }
                return that;
            },
            enumerable: false
        },
        rectangle: { value: function( m, n, initial){
                var row, i=m, j=n, arr=[];
                if( initial){

                    while( i--){
                        row=[];
                        j=n;
                        while( j--){
                            row[j] = initial;
                        }
                        arr[i]=row;
                    }
                } else {

                    while( i--){
                        row=[];
                        row.length = n;
                        arr[i]=row;
                    }
                }
                return arr;
            },
            enumerable: false
        },
        deepArrayCopy: { value: function( arr){
            if( Array.prototype.isPrototypeOf( arr) || arr.map){
                return arr.map( this.deepArrayCopy, this);
            } else {
                return arr;
            }
        }},
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
        }},
        precision: { value: 1e-6 },
    },
    "instance":{
        copy: { value: function(){
                return MatrixBase.create( MatrixBase.deepArrayCopy( this));
            },
            enumerable: false,
        },
        toArray: { value: function(){
                return this.slice();
            },
            enumerable: false
        },
        toString: { value: function(){
                return JSON.stringify( this.toArray());
            },
            enumerable: false
        },
        length: {
            value: 0
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
                return that;
            },
            enumerable: false
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
                return that;
            },
            enumerable: false
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
                return that;
            },
            enumerable: false
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
                return that;
            },
            enumerable: false
        },
        equals: { value: function( other){
                var i= this.length; j;
                if( i !== other.length){
                    return false;
                }
                while( i--){
                    j= this[i].length;
                    if( j !== other.length){
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
            enumerable: false
        }

    }
});

klass.prototype = (function( obj){
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
})(klass.prototype);

return klass;
})();




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
MatrixFn = function(){
return function(){

    if( arguments.length > 1) {
        return Matrix.create.apply( this, arguments);
    } else {
        return Matrix.wrap.apply( this, arguments);
    }
};};

staticDescriptor = {

    create:{ value: function( arr){

        return this.wrap( arguments.length > 1 ? this.rectangle.apply( this, arguments) : arr);
    }},
    isRectangular:{value: function( arr){

        var i=1, n= arr[0].length;
        for(; i<arr.length; ++i){
            if( arr[i].length !== n){
                return false;
            }
        }
        return true;
    }},
    isSquare:{value: function( arr){

        return arr.length === arr[0].length && this.isRectangular( arr);
    }},
    identity: { value: function( n){

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


        var ret= 0,
            i=0;
        if( !Matrix.isSquare(arr)){
            return 0;
        }
        if( arr.length === 1){

            return arr[0][0];
        }
        if( arr.length === 2){

            return arr[0][0] * arr[1][1] - arr[0][1] * arr[1][0];
        }
        for(; i< arr[0].length; ++i){
            if( arr[0][i] !== 0){

                ret += arr[0][i] * Math.pow( -1, i) * Matrix.det( Matrix.cut( arr, 0, i));
            }
        }
        return ret;
    }},
    isMatrix: { value: function( that){
        return this.prototype.isPrototypeOf( that);
    }},
    cut:{value: function( arr, i, j){

        var ret = arr.slice(0,i).concat( arr.slice(i+1));
        ret = ret.map( function( row){
            return row.slice(0, j).concat( row.slice( j+1));
        });
        return ret;
    }},
    prototype:{ value: {}}
};

instanceDescriptor = {

    copy: {value: function(){

        return Matrix.wrap( Matrix.deepArrayCopy( this.toArray()));
    }},
    add: {value: function( other){


        if( !Matrix.sameDimensions( this, other)){
            throw new TypeError("this.add( other): Only Matrices of the same Dimensions kann be added. this: "+this.toString()+" other: "+Matrix.prototype.toString.call(other));
        }
        return Matrix.wrap( MatrixBase.prototype.add.call( this, other));
    }},
    scale: {value: function( lambda){


        return Matrix.wrap( MatrixBase.prototype.scale.call(this, lambda));
    }},
    mult: {value: function( other){


        if( this[0].length !== other.length){
            throw new TypeError("this.mult( other): The matrices dimensions mismatch! this: "+ this.toString()+ " other: "+other);
        }
        return Matrix.wrap( MatrixBase.prototype.mult.call(this,other));
    }},
    transpose: {value: function(){

        return Matrix.wrap( MatrixBase.prototype.transpose.call(this));
    }},
    adjugate: {value: function(){

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

        if( !Matrix.isSquare( this)){
            throw new TypeError("this.invert(): there is no inverted matrix for non square matrixes. this:"+this.toString());
        }
        if( this.length === 1){
            return Matrix([[1/this[0][0]]]);
        }
        return this.adjugate().scale( 1/this.det());
    }},
    row: {value: function( i){

        return this[i];
    }},
    col: {value: function( j){

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

        if( !Matrix.sameDimensions( this, other)){
            return false;
        }
        return MatrixBase.prototype.equals.call(this,other);
    }},

};


Matrix = Class.create({
    "static": staticDescriptor,
    instance: instanceDescriptor,
    parent: MatrixBase
});




namespace.Matrix = Matrix;

})(window,'en');






var Vector = Class.create({
    parent: MatrixBase,
    "static":{
        create: { value: function( arr, inital){
                return this.wrap( arguments.length > 1 || typeof arr === "number" ? this.rectangle( arr, 1, initial) : arr);
            },
            enumerable: false,
           





        }
    },
    "instance":{
        "scale": { value: function( lambda){
                return Vector.wrap( MatrixBase.prototype.scale.call( this, lambda));
            },
            enumerable: false,
           





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
           





        },
        "mult":{ value: function( other){
                return MatrixBase.wrap( MatrixBase.prototype.mult.call(this,other));
            },
            enumerable: false
        },
        "magnitude":{ value:function(){

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
