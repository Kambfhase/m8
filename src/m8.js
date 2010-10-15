// Metafile

#include "vice-versa-mod.js"

#ifdef NAMESPACE

(function( namespace){

if( typeof namespace === "string"){
    namespace = this[ namespace] = {};
}

#endif
#include "class.js"

#include "collection.js"
#include "matrix.js"
#include "vector.js"
#include "binom.js"
#include "fibonacci.js"
#include "factorial.js"
#include "complex.js"

#if NAMESPACE

namespace.Matrix = Matrix;
namespace.Vector = Vector;

})( "m8" || this);

#endif