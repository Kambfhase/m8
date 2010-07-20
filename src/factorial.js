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