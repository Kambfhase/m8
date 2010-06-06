YUI({
    gallery: 'gallery-2010.05.19-19-08'
}).use('gallery-button','test','node','test-fireunit',function(Y){

    var assert = Y.Assert,
        similar = function( a, b){
        // returns true if a and b are similar matrix-like arrays
        if( !a || !b ){
            return false;
        }
        var i=0, j=0;
        for(; i< a.length; ++i){
            for(j=0; j< a[i].length; ++j){
                if( a[i][j] !== b[i][j]){
                    return false;
                }
            }
        }
        return true;
    };



    var basics = new Y.Test.Case({
        name: "Vector: Basics",
        
        testCreation: function(){
            assert.isFunction( Vector);
            assert.isFunction( Vector.create);
            assert.isFunction( Vector.is);
            
            assert.isNotUndefined( Vector( [[ 1]]));
            
            
            assert.isTrue( Vector.is( Vector( [[ 1]])));
            assert.isTrue( Vector.is( Vector( 3, 2)));
            assert.isFalse( Vector.is( [[ 1]]));
            assert.isTrue( similar( Vector([[ 1]]), [[ 1]]));
            assert.isTrue( similar( Vector( 5, 2), [[2],[2],[2],[2],[2]]));
            // Vector.create()
            assert.isTrue( Vector.is( Vector.create( [[ 1]])));
            assert.isTrue( Vector.is( Vector.create( 3, 2)));
            assert.isTrue( similar( Vector.create([[ 1]]), [[ 1]]));
            assert.isTrue( similar( Vector.create( 5, 2), [[2],[2],[2],[2],[2]]));
            assert.isTrue( similar( Vector(8,8), Vector.create(8,8)));
            assert.isTrue( similar( Vector(7, 20), Vector.create( 7, 20)));
        },
        
        testEquality: function(){
            assert.isFunction( Vector.prototype.equals);
            assert.isNumber( Vector.precision);
            
            assert.isTrue( Vector( [[ 1]]).equals( [[ 1]]));
            assert.isTrue( Vector( 7, 20).equals( Vector( 7,20)));
            assert.isFalse( Vector( 35, 78).equals( Vector( 378, 2)));
            
        }
    });
    
    var maths = new Y.Test.Case({
        name: "Vector: Arithmetic",
        
        testScale: function(){
            assert.isFunction( Vector.prototype.scale);
            
            assert.isTrue( Vector( 3, 2).scale(1/2).equals(Vector(3,1)));
            assert.isTrue( Vector([[1],[2],[3]]).scale(5).scale(1/5).equals([[1],[2],[3]]));
        },
        
        testAdd: function(){
            assert.isFunction( Vector.prototype.add);
            
            assert.isTrue( Vector.is( Vector([[1]]).add([[1]])));
            assert.isTrue( Vector([[2]]).add([[-1]]).equals([[1]]));
        },
        
        testDot: function(){
            assert.isFunction( Vector.prototype.dot);
            
            assert.isNumber( Vector([[1]]).dot([[1]]));
            assert.areEqual( Vector([[1]]).dot([[1]]), 1);
            assert.areEqual( Vector( 20, 1).dot( Vector( 20,1)), 20);
            assert.areEqual( Vector([[1],[2],[3]]).dot([[6],[3],[2]]), 18);
        }
    });
    
    new Y.Button({
        label: "run Vector tests",
        callback: function(){
            Y.FireUnit.attach( Y.Test.Runner);

            Y.Test.Runner.add(basics);
            Y.Test.Runner.add(maths);
            Y.Test.Runner.run( );
            
    }}).render(document.body);
});