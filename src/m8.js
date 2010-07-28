// Metafile

#include "vice-versa-mod.js"

#ifdef NAMESPACE

(function( namespace){

if( typeof namespace === "string"){
    namespace = this[ namespace];
}

#endif

#include "matrix.js"
#include "vector.js"
#include "binom.js"
#include "fibonacci.js"
#include "factorial.js"
#include "complex.js"

#if NAMESPACE

})( NAMESPACE || this);

#endif