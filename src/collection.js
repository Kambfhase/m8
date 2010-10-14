
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
            },
            configurable: true,
            writable: true,
            enumerable: false
        }
    },
    "instance":{
         length: {
              value: 0,
              configurable: true,
            writable: true,
            enumerable: false
         },
         toArray: {
             value: function(){
                 return this.slice();
             },
            configurable: true,
            writable: true,
            enumerable: false
         },
         toString: {
             value: function(){
                 return this.slice().toString();
             },
            configurable: true,
            writable: true,
            enumerable: false
         },
         //toSource: {
         //    value: function(){
         //        return "Collection("+JSON.stringify( this.toArray())+")";
         //    }
         //}
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