#ifndef MATRXBASE_JS
#define MATRIXBASE_JS

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
                    // n^2 complexity
                    while( i--){
                        row=[];
                        j=n;
                        while( j--){
                            row[j] = initial;
                        }
                        arr[i]=row;
                    }
                } else {
                    // linear complexity
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
            // returns true if all given matrices have the same dimensions
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
            // TODO: make this faster!
                var that = [],
                    i=0,j,k, sum,
                    cols = other[0].length;
                for(;i< this.length; ++i){ 
                    // for all this-rows
                    that[i] = [];
                    for(j=0;j< cols; ++j){ 
                        // for each other-cols
                        sum = 0;
                        // walk through the col-row pair multiply the values and sum them up
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


#endif
