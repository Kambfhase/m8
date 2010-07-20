// Metafile

#ifdef DOCUMENTATION
    #define DOC( ...) doc: (__VA_ARGS__)
#else
    #define DOC( ...)
#endif

#include "vice-versa-mod.js"

#ifdef NAMESPACE
(function(){
if( ! NAMESPACE){
    this.NAMESPACE = {};
}
#endif

#include "matrix.js"
#include "vector.js"
#include "binom.js"
#include "fibonacci.js"

#if NAMESPACE

//NAMESPACE.

})();
#endif