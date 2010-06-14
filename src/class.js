#ifndef CLASS_JS
#define CLASS_JS
#include "vice-versa-mod.js"

(function(){
"use strict";

var Object = this.Object,
    Class;

Class = function( obj){
    var klass = function(){
        return klass.create.apply( klass, arguments);
    }, props, i;
      
    if( obj.parent){
        props = Object.getOwnPropertyNames( obj.parent);
        props = props.filter(function(name){
            return !(name in klass && !Object.getOwnPropertyDescriptor( klass, name).configurable);
        }); // we cannot set read only props.
        
        for(i=0; i< props.length; ++i){
            klass = Object.defineProperty( klass, props[i], Object.getOwnPropertyDescriptor( obj.parent, props[i]));
        }
    }

    klass = Object.defineProperties( klass, obj["static"]);
    klass.prototype = Object.create( (obj.parent && obj.parent.prototype || {}), obj.instance);
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
    "static": { 
        create: {
            value: Class,
            enumerable: false,
            configurable: true,
            writable: true
        }
    }
});

#ifndef DOCUMENTATION
window.Class = Class;
#else
var _Class = Class;

Class = _Class({
    "static": {
        create: {
            value: function( obj){
                var klass = function(){}, i, arr;
                
                
                arr = Object.keys( obj["static"]);
                i = arr.length;
                while( i--){
                    klass[ arr[i]] = obj["static"][ arr[i]].doc;
                }
                
                //klass.prototype = Object.create( obj.parent.prototype);
                klass.prototype= {};
                arr = Object.keys( obj["instance"]);
                i = arr.length;
                while( i--){
                    klass.prototype[ arr[i]] = obj["instance"][ arr[i]].doc;
                }
                
                return klass;
            }
        }
    }
});
window.Class = Class;
#endif
})();
#endif 
