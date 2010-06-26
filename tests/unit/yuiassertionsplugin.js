/*!
 * Matrix-Assertions plugin for YUI3
 * by Kambfhase
 * github.com/Kambfhase
 * MIT-License
 */

YUI.add('Matrix-Assertions', function( Y){

var sim = function( a,b){
    if( !a || !b || a.length !== b.length){
        return false;
    }
    var i= a.length;
    
    while( i--){
        if( a[i] !== b[i]){
            return false;
        }
    }
    return true;
};

Y.ArrayAssert.itemsAreEqual2D = function( expected, actual, message){
    Y.ArrayAssert.itemsAreEquivalent( expected, actual, sim, message);
};


},'0.1',{requires: ['test']});