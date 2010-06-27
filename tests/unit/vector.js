YUI({
    gallery: 'gallery-2010.05.19-19-08'
}).use('gallery-button','test','node','Matrix-Assertions',function(Y){



    var basics = new Y.Test.Case({
        name: "Vector: Basics",
        
        testCreation: function(){
            Y.Assert.isFunction( Vector);
            Y.Assert.isFunction( Vector.create);
            Y.Assert.isFunction( Vector.is);
            
            Y.Assert.isNotUndefined( Vector( [[ 1]]));
            
            
            Y.Assert.isTrue( Vector.is( Vector( [[ 1]])));
            Y.Assert.isTrue( Vector.is( Vector( 3, 2)));
            Y.Assert.isFalse( Vector.is( [[ 1]]));
            Y.Assert.isInstanceOf( Vector, Vector([[1],[2],[3]]));
            Y.ArrayAssert.itemsAreEqual2D( [[1]], Vector([[ 1]]));
            Y.ArrayAssert.itemsAreEqual2D( [[2],[2],[2],[2],[2]], Vector( 5, 2));
            // Vector.create()
            Y.Assert.isTrue( Vector.is( Vector.create( [[ 1]])));
            Y.Assert.isTrue( Vector.is( Vector.create( 3, 2)));
            Y.Assert.isInstanceOf( Vector, Vector.create([1,2,3,4]));
            Y.ArrayAssert.itemsAreEqual2D( [[1]], Vector.create([[ 1]]));
            Y.ArrayAssert.itemsAreEqual2D( [[1]], Vector.create([ 1]));
            Y.ArrayAssert.itemsAreEqual2D( [[1],[2],[3],[4],[5],[6],[7],[8],[9]], Vector([1,2,3,4,5,6,7,8,9]));
            
            Y.ArrayAssert.itemsAreEqual2D( [[1]], Vector.create( 1,1));
            Y.ArrayAssert.itemsAreEqual2D( [[2],[2],[2],[2],[2]], Vector.create( 5, 2));
            Y.ArrayAssert.itemsAreEqual2D( Vector(8,8), Vector.create(8,8));
            Y.ArrayAssert.itemsAreEqual2D( Vector(7, 20), Vector.create( 7, 20));
            
            
        },
        
        testEquality: function(){
            Y.Assert.isFunction( Vector.prototype.equals);
            Y.Assert.isNumber( Vector.precision);
            
            Y.Assert.isTrue( Vector( [[ 1]]).equals( [[ 1]]));
            Y.Assert.isTrue( Vector( 7, 20).equals( Vector( 7,20)));
            Y.Assert.isFalse( Vector( 35, 78).equals( Vector( 378, 2)));
            Y.Assert.isTrue( Vector([1,2,3,4]).equals([[1],[2],[3],[4]]));
            Y.Assert.isTrue( Vector([1,2,3,4]).equals( Vector([[1],[2],[3],[4]])));
            Y.Assert.isFalse( Vector([1,2,3,4]).equals([1,2,3]));
            Y.Assert.isFalse( Vector([1,2,3,4]).equals([1,2,3,4,5]));
            Y.Assert.isFalse( Vector([1,2,3,4]).equals([[1,2,3,4]]));
            Y.Assert.isFalse( Vector([1,2,3,4]).equals( Vector([[1,2,3,4]])));
            Y.Assert.isTrue( Vector([[0, .5, -5, 1e-8]]).equals( [[0, .5, -5, 0]]));
        }
    });
    
    var maths = new Y.Test.Case({
        name: "Vector: Arithmetic",
        
        testScale: function(){
            Y.Assert.isFunction( Vector.prototype.scale);
            
            Y.Assert.isTrue( Vector( 3, 2).scale(1/2).equals(Vector(3,1)));
            Y.Assert.isTrue( Vector([[1],[2],[3]]).scale(5).scale(1/5).equals([[1],[2],[3]]));
        },
        
        testAdd: function(){
            Y.Assert.isFunction( Vector.prototype.add);
            
            Y.Assert.isTrue( Vector.is( Vector([[1]]).add([[1]])));
            Y.Assert.isTrue( Vector([[2]]).add([[-1]]).equals([[1]]));
            Y.ArrayAssert.itemsAreEqual2D( [[5,5,5,5,5]], Vector([[1,2,3,4,5]]).add([[4,3,2,1,0]]));
            Y.ArrayAssert.itemsAreEqual2D( [[5],[5],[5],[5],[5]], Vector([1,2,3,4,5]).add([[4],[3],[2],[1],[0]]));
        },
        
        testDot: function(){
            Y.Assert.isFunction( Vector.prototype.dot);
            
            Y.Assert.isNumber( Vector([[1]]).dot([[1]]));
            Y.Assert.areSame( 1, Vector([[1]]).dot([[1]]));
            Y.Assert.areSame( 20, Vector( 20, 1).dot( Vector( 20,1)));
            Y.Assert.areSame( 18, Vector([[1],[2],[3]]).dot([[6],[3],[2]]));
            Y.Assert.areSame( 3, Vector([1,1,1]).dot([[1,1,1]]), "The dot product should be independent of the vectors orientation.");
            Y.Assert.areSame( 6, Vector([[1,1,1]]).dot([[1,2,3]]));
        },
        
        testMagnitude: function(){
            Y.Assert.isFunction( Vector.prototype.magnitude);
            
            Y.Assert.isNumber( Vector([1,2,3,4]).magnitude());
            Y.Assert.areSame( 0, Vector([0,0,0,0]).magnitude());
            Y.Assert.areSame( 0, Vector([[0,0,0,0]]).magnitude());
            Y.Assert.areSame( 1, Vector([0,0,0,1]).magnitude());
            Y.Assert.areSame( 1, Vector([[0,0,0,1]]).magnitude());
            Y.Assert.areSame( 5, Vector([[3],[4]]).magnitude());
            Y.Assert.areSame( 5, Vector([-3 ,-4] ).magnitude());
            Y.Assert.areSame( Math.SQRT2, Vector(2,1).magnitude());
        },
        
        testNormalize: function(){
            Y.Assert.isFunction( Vector.prototype.normalize);
            
            Y.Assert.isTrue( Vector.is( Vector(3,1).normalize()));
            Y.Assert.isTrue( Vector([[0,0,0,1]]).normalize().equals([[0,0,0,1]]));
            Y.Assert.isTrue( Vector([0,0,0,1]).normalize().equals([[0],[0],[0],[1]]));
            Y.Assert.isTrue( Vector(2,1).normalize().equals([[ Math.pow( 2,.5)/2],[Math.SQRT2/2]]));
            Y.Assert.isTrue( Math.abs( Vector([1,2,3,4]).normalize().magnitude() - 1) < Vector.precision);
            Y.Assert.isTrue( Math.abs( Vector([12,-456,486,0,234.412]).normalize().magnitude() - 1) < Vector.precision);
        },
        
        testCoords: function(){
            Y.Assert.isFunction( Vector.prototype.coords);
            
            Y.Assert.isInstanceOf( Vector, Vector([1,2,3,4]).coords());
            Y.Assert.isTrue( Vector.is( Vector([1,2,3,4]).coords()));
            var a = [[1],[2],[3],[4]];
            Y.ArrayAssert.itemsAreEqual2D( a, Vector(a).coords());
            Y.ArrayAssert.itemsAreEqual2D( a, Vector(a).coords().coords());
            a=Vector(a);
            Y.ArrayAssert.itemsAreEqual2D( a, a.coords());
            Y.Assert.areNotSame( a, a.coords());
            Y.ArrayAssert.itemsAreEqual2D( a, Vector([[1,2,3,4]]).coords());
        }
    });
    
    new Y.Button({
        label: "run Vector tests",
        callback: function(){

            //Y.FireUnit.attach( Y.Test.Runner);

            Y.Test.Runner.add(basics);
            Y.Test.Runner.add(maths);
            Y.Test.Runner.run( );
            
    }}).render(document.body);
});