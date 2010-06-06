#ifndef VICE_VERSA_MOD_JS
#define VICE_VERSA_MOD_JS

/*! vice-versa Object
 * @author      Andrea Giammarchi
 * @license     Mit Style License
 */
/*!
 * Modified by Kambfhase
 */
/**
 * @blog        http://webreflection.blogspot.com/
 * @project     http://code.google.com/p/vice-versa/
 * @version     0.20103001093700
 * @note        these method are about ECMAScript 5
 */

(function (Object, hasOwnProperty) {
    
    /**
     * Common Objects Loop Utility
     * @param {Object} generic Object to loop with
     * @param {Function} callback to execute for each enumerable property
     * @param [Object] optional context to inject during callback execution
     */
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

    /** Object.defineProperty emulation.
     * It does NOT guarantee configuration properties such writable, enumerable, etc.
     * It does not guarantee get/set compatibility (mainly IE problem)
     * 
     * @param {Object} the object to extend via a descriptor one
     * @param {Object} the descriptor object
     * @return {Object} the first param, extended.
     */
    if (!Object.defineProperty) {
        Object.defineProperty = (function () {
            /**
             * Simple Object.defineProperty internal emulator
             * Not fully compatible with IE (get/set not supported)
             * There is NO WAY to make this function consistent cross browser.
             * Any redundant/superfluous check will mean simply performances bottleneck.
             * @param {Object} definition object for current property
             * @param {Object} definition name
             */
            function $defineProperty(value, key) {
                if (hasOwnProperty.call(value, "value")) {
                    this[key] = value.value;
                } else {
                    if (hasOwnProperty.call(value, "get")) {
                        // it must throw an error if called via IE
                        this.__defineGetter__(key, value.get);
                    }
                    if (hasOwnProperty.call(value, "set")) {
                        // it must throw an error if called via IE
                        this.__defineSetter__(key, value.set);
                    }
                }
            };
           /* function defineProperty(o, key, desc) {
                forIn(desc, $defineProperty, o);
                return o;
            }; */
            function defineProperty(o, key, desc){
                if (hasOwnProperty.call(desc, "value")) {
                    o[key] = desc.value;
                } else {
                    if (hasOwnProperty.call(desc, "get")) {
                        // it must throw an error if called via IE
                        o.__defineGetter__(key, desc.get);
                    }
                    if (hasOwnProperty.call(desc, "set")) {
                        // it must throw an error if called via IE
                        o.__defineSetter__(key, desc.set);
                    }
                }
                return o;
            };
            return defineProperty;
        })();
    }

    /** Object.defineProperties emulation.
     * It does NOT guarantee configuration properties such writable, enumerable, etc.
     * It does not guarantee get/set compatibility (mainly IE problem)
     * 
     * @param {Object} the object to extend via a descriptor one
     * @param {Object} the descriptor object
     * @return {Object} the first param, extended.
     */
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

    /** Object.create emulation.
     * It does NOT guarantee configuration properties such writable, enumerable, etc.
     * It does not guarantee get/set compatibility (mainly IE problem)
     * 
     * @param {Object} the inherited prototype or null
     * @param [Object] definition object
     * @return {Object} new instanceof first param or a generic Object
     */
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
    
    /** Object.keys emulation.
     * @param {Object} the object with zero, one, or more keys
     * @return {Array} Object keys
     */
 /*   if (!Object.keys) {
        Object.keys = (function () {
            function $keys(value, key) {
                this.push(key);
            };
            function keys(o) {
                var keys = [];
                forIn(o, $keys, keys);
                return keys;
            };
            return keys;
        })();
    } */
    
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
    
    /** Object.getPrototypeOf emulation.
     * It does not guarantee consistency cross browser (mainly IE problem)
     * @param {Object} the object to check
     * @return {Object} chained prototype
     */
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
#endif
