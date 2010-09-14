#ifndef CLASS_JS
#define CLASS_JS
#include "vice-versa-mod.js"


#define PARENT "parent"
#define STATIC  "static"
#define INSTANCE "instance"



var Class = (function( Object){
"use strict";

var Class,
    skip = Object.getOwnPropertyNames(function(){});

Class = function( obj){
    var klass = function(){
            return klass.create.apply( klass, arguments);
        }, props, i, prop,
        par = obj[ PARENT ],
        stat = obj[ STATIC],
        inst = obj[INSTANCE];
      
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
        klass.create =  function(){ return Object.create( this.prototype);};
    }
    if( !klass.is ){
        klass.is = function( obj){ return this.prototype.isPrototypeOf( obj);};
    }
    
    
    return klass;
};

Class = Class({
    STATIC: { 
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
#endif 
