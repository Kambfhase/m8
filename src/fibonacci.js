
// double recursion
//var fibonacci = function( n){
//    return n <= 2 ? n && 1 : fibonacci( n-1) + fibonacci( n-2);
//};

// single recursion
//var fibonacci = (function(){
//    var v = Vector([1,0]),
//        A = Matrix([[1,1],[1,0]]),
//        fib = function( n){
//            return n <= 1 ? v : A.mult( fib( n-1));
//        };
//    return function( n){
//        return n <= 2 ? n && 1 : fib( n)[0][0];
//    };
//})(); 

// Using the above method and eigenvalue theory the following method can be proven:

var fibonacci = (function( Math){
    var phi = (1+ Math.sqrt( 5)) /2,
        psi = (1- Math.sqrt( 5)) /2;
        
    return function( n){
        // there is a small rounding error here which I ignore for now.
        return n <= 2 ? n && 1 : Math.round( (Math.pow( phi, n) - Math.pow( psi, n)) / Math.sqrt( 5) );
    };
})( Math);
