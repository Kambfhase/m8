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