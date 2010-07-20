var binom = function( n, k){
    var ret = 1;
    while( k){
        ret *= n+1-k;
        ret /= k;
        k--;
    }
    return ret;
};