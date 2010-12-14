YUI({
    gallery: 'gallery-2010.05.19-19-08'
}).use('gallery-button','test','node','test-fireunit','Matrix-Assertions',function(Y){


    var huge = [
[1,2,3,4,5,6,7,8,9],
[0,2,3,4,5,6,7,8,9],
[0,0,3,4,5,6,7,8,9],
[0,0,0,4,5,6,7,8,9],
[0,0,0,0,5,6,7,8,9],
[0,0,0,0,0,6,7,8,9],
[0,0,0,0,0,0,7,8,9],
[0,0,0,0,0,0,0,8,9],
[0,0,0,0,0,0,0,0,9]];

    var m0 = new Y.Test.Case({
        name: "Matrix: Basics",

        testCreation : function(){
            Y.Assert.isFunction( Matrix);
            Y.Assert.isFunction( Matrix.create);
            Y.Assert.isFunction( Matrix.wrap);
            Y.Assert.isFunction( Matrix.identity);
            
            var creates = [ Matrix(1,1,1), Matrix(2,2,2), Matrix( huge), Matrix(5,7,9),
                Matrix.identity(3), Matrix(2,2)],
                bases= [ [[1]], [[2,2],[2,2]], huge,
 [[9,9,9,9,9,9,9],[9,9,9,9,9,9,9],[9,9,9,9,9,9,9],[9,9,9,9,9,9,9],[9,9,9,9,9,9,9]],
 [[1,0,0],[0,1,0],[0,0,1]], [[0,0],[0,0]]];
            
            for( var i=0; i< 5; ++i){
                Y.Assert.isTrue( Matrix.is( creates[i]));
                Y.Assert.isInstanceOf( Matrix, creates[i]);
                Y.ArrayAssert.itemsAreEqual2D( bases[i], creates[i]);
            }
            
        },
        
        testEquality : function(){
            Y.Assert.isFunction( Matrix.prototype.equals );
        
            Y.Assert.isTrue( Matrix.identity(1).equals( Matrix.identity(1)));
            Y.Assert.isTrue( Matrix.identity(2).equals( Matrix.identity(2)));
            Y.Assert.isTrue( Matrix(huge).equals( huge));
            if( Matrix.precision === 1e-6){
                Y.Assert.isTrue( Matrix.identity(1).equals([[ 1-1e-7 ]]));
                Y.Assert.isFalse( Matrix.identity(1).equals([[ 1-1e-5 ]]));
            }
            Y.Assert.isTrue( Matrix([[1,2,3],[4,5,6],[7,8,9]]).equals( [[1,2,3],[4,5,6],[7,8,9]]));
            Y.Assert.isFalse( Matrix(1,2,3).equals([[1]]));
            Y.Assert.isTrue( Matrix.identity(1).equals([[1]]));
            Y.Assert.isFalse( Matrix([[1,2,3,4]]).equals([[1,2,3]]));
        },
        
        testCopying: function(){
            Y.Assert.isFunction( Matrix.deepArrayCopy);
            Y.Assert.isFunction( Matrix.prototype.copy);
            var arr = [1,2,3,5,6,7,8,9,0], b;
            
            Y.Assert.isArray( Matrix.deepArrayCopy( arr));
            Y.Assert.areNotSame( arr, Matrix.deepArrayCopy(arr));
            Y.ArrayAssert.itemsAreEqual( arr, Matrix.deepArrayCopy(arr));
            
            Y.Assert.areNotSame( huge, Matrix( huge));
            Y.ArrayAssert.itemsAreEqual2D( huge, Matrix( huge));
            Y.ArrayAssert.itemsAreEqual2D( huge, Matrix( huge).copy());
            Y.Assert.isTrue( Matrix( huge).copy().equals( huge));
            b=Matrix(9,9,9);
            Y.Assert.areNotSame( b, b.copy());
            Y.ArrayAssert.itemsAreEqual2D( b, b.copy());
        },
        
        testRectangle: function(){
            Y.Assert.isFunction( Matrix.rectangle);
        
            Y.ArrayAssert.itemsAreEqual2D( [[1]], Matrix.rectangle( 1,1,1));
            Y.ArrayAssert.itemsAreEqual2D( [[2,2],[2,2]], Matrix.rectangle( 2,2,2));
            Y.ArrayAssert.itemsAreEqual2D( [[0,0,0],[0,0,0],[0,0,0]], Matrix.rectangle( 3,3),"This shouldn't fail.");
        },
        
        testSquare: function(){
            Y.Assert.isFunction( Matrix.isRectangular);
            Y.Assert.isFunction( Matrix.isSquare);
            
            Y.Assert.isTrue( Matrix.isRectangular( Matrix(1,1)));
            Y.Assert.isFalse( Matrix.isRectangular( [[],[,]]));
            Y.Assert.isTrue( Matrix.isSquare( Matrix(2,2,2)));
            Y.Assert.isFalse( Matrix.isSquare( Matrix(1,2,3)));
        },
        
        testCut: function(){
            Y.Assert.isFunction( Matrix.cut);
            
            Y.ArrayAssert.itemsAreEqual2D( [[2]], Matrix.cut( Matrix(2,2,2), 0,0));
            Y.ArrayAssert.itemsAreEqual2D( Matrix.identity(5), Matrix.cut( Matrix.identity(6), 0, 0));
            Y.ArrayAssert.itemsAreEqual2D( [[0,1],[0,0]], Matrix.cut( Matrix.identity(3), 0, 2));
        }
    });

    var m1 = new Y.Test.Case({
        name: "Matrix Manipulation",
        
        testToArray: function(){
            Y.Assert.isFunction( Matrix.prototype.toArray);
            
            Y.Assert.isArray( Matrix( huge).toArray());
            Y.ArrayAssert.itemsAreEqual2D( huge, Matrix(huge).toArray());
            Y.Assert.areEqual( JSON.stringify(huge), JSON.stringify(Matrix( huge).toArray()));
        },
        
        testToString: function(){
            Y.Assert.isFunction( Matrix.prototype.toString);
            
            Y.Assert.isString( Matrix(3,3,3).toString());
            Y.Assert.isString( Matrix( huge).toString());
            Y.Assert.areEqual( JSON.stringify( huge), Matrix( huge).toString());
        },
        
        testRowCol: function(){
            Y.Assert.isFunction( Matrix.prototype.row);
            Y.Assert.isFunction( Matrix.prototype.col);
            
            Y.Assert.isArray( Matrix.identity(3).row(0));
            Y.Assert.isArray( Matrix.identity(3).col(0));
            Y.ArrayAssert.itemsAreEqual([0,2,3,4,5,6,7,8,9], Matrix( huge).row(1));
            Y.ArrayAssert.itemsAreEqual([9,9,9,9,9,9,9,9,9], Matrix( huge).col(8));
        },
        
        testTranspose: function(){
            Y.Assert.isFunction( Matrix.prototype.transpose);
            
            Y.Assert.isTrue( Matrix.is( Matrix(huge).transpose()));
            Y.Assert.isTrue( Matrix.identity(3).transpose().equals( Matrix.identity(3)));
            Y.Assert.isTrue( Matrix([[1,2],[3,4]]).transpose().equals([[1,3],[2,4]]));
            Y.Assert.isTrue( Matrix(1,1,1).transpose().equals(Matrix(1,1,1)));
            Y.Assert.isTrue( Matrix(huge).transpose().transpose().equals( huge));
            Y.Assert.isTrue( Matrix(huge).transpose().equals(Matrix(huge).transpose()));
        }
    });
    
    var m2 = new Y.Test.Case({
        name: "Matrix Arithmetic",
        
        _should: {
            error: {
                testAddError0: true,
                testAddError1: true,
                testMultError0: true,
                testMultError1: true
            },
            ignore: {
                testAddMultiple: true
            }
        },
        
        testScale: function(){
            Y.Assert.isFunction( Matrix.prototype.scale);
        
            Y.Assert.isTrue( Matrix.is(Matrix(1,2,3).scale(4)));
            Y.Assert.isTrue( Matrix.identity(5).scale(1).equals(Matrix.identity(5)));
            Y.Assert.isTrue( Matrix(huge).scale(0).equals( Matrix(9,9,0)));
            Y.Assert.isTrue( Matrix(1,2,3).scale(5).equals( Matrix(1,2,15)));
        },
        
        testAdd: function(){
            Y.Assert.isFunction( Matrix.prototype.add);
            
            Y.Assert.isTrue( Matrix.is( Matrix([[1]]).add([[2]])));
            Y.Assert.isTrue( Matrix.identity(3).add( Matrix.identity(3)).equals([[2,0,0],[0,2,0],[0,0,2]]));
            Y.Assert.isTrue( Matrix( huge).add( huge).scale( .5).equals( huge));
            Y.Assert.isTrue( Matrix( huge).scale( -1).add( huge).equals( Matrix(9,9)));
            Y.Assert.isTrue( Matrix( huge).add( Matrix.identity(9)).equals( Matrix.identity(9).add( huge)));
            Y.Assert.isTrue( Matrix([[1,2,3,4]]).add([[4,3,2,1]]).equals([[5,5,5,5]]));
            Y.Assert.isTrue( Matrix([[1,2,3,4,5],[6,7,8,9,0]]).add([[3,0,0,0,0],[6,1,1,1,1]]).equals([[4,2,3,4,5],[12,8,9,10,1]]));
            
        },
        
        testAddError0: function(){
            Matrix.identity(2).add( Matrix.identity(3));
        },
        testAddError1: function(){
            Matrix.identity(3).add( Matrix.identity(2));
        },
        
        testAddMultiple: function(){
            Y.Assert.isFunction( Matrix.add);
            
            Y.Assert.isTrue( Matrix( huge).scale(4).equals(Matrix.add( huge, huge, huge, huge)),"0");
            Y.Assert.isTrue( Matrix([[3,0,0],[0,3,0],[0,0,3]]).equals(Matrix.add(Matrix.identity(3),Matrix.identity(3),Matrix.identity(3))),"1");
            Y.Assert.isTrue( Matrix([[3]]).equals( Matrix.add([[1]],[[2]],[[0]])),"2");
        },
        
        testMult: function(){
            Y.Assert.isFunction( Matrix.prototype.mult);
            
            Y.Assert.isTrue( Matrix.is(Matrix([[1]]).mult([[1]])));
            Y.Assert.isTrue( Matrix([[2]]).mult([[3]]).equals([[6]]), "1");
            Y.Assert.isTrue( Matrix.identity(3).mult( Matrix.identity(3)).equals( Matrix.identity(3)),"2");
            Y.Assert.isTrue( Matrix([[1,2],[3,4]]).mult([[5,6],[7,8]]).equals([[19,22],[43,50]]),"3");
            Y.Assert.isTrue( Matrix([[5,6],[7,8]]).mult([[1,2],[3,4]]).equals([[23,34],[31,46]]));
            Y.Assert.isTrue( Matrix.identity(9).mult(huge).equals(huge));
            Y.Assert.isTrue( Matrix([[1,2],[3,4],[0,-1]]).mult([[5,6],[7,8]]).equals([[19,22],[43,50],[-7,-8]]));
        },
        
        testMultError0: function(){
            Matrix.identity(3).mult([[1]]);
        },
        
        testMultError1: function(){
            Matrix(3,2,1).mult(3,2,1);
        }
    });
    
    var m3 = new Y.Test.Case({
        name: "Matrix Determinant, Adjugate, Invert",
        
        _should:{
            error: {
                testAdjugateError: true,
                testInvertError: true
            }
        },
        
        testDet: function(){
            Y.Assert.isFunction( Matrix.det);
            Y.Assert.isFunction( Matrix.prototype.det);
            
            Y.Assert.isNumber( Matrix(1,1,1).det());
            Y.Assert.areEqual( 1, Matrix(1,1,1).det());
            Y.Assert.areEqual( 1, Matrix.identity(7).det());
            //Y.Assert.areEqual( Matrix(5,8,7).det(), 0); // this will probably throw an error in a future version.
            Y.Assert.areEqual( 0, Matrix(7,7,0).det(), "gives NaN ?");
            Y.Assert.areEqual( Matrix.det(huge), Matrix(huge).det());
            Y.Assert.areEqual( Matrix.det(huge), Matrix(huge).transpose().det());
            Y.Assert.isTrue( Math.abs( 147- Matrix([[2,9,9,4],
                                       [2,-3,12,8],
                                       [4,8,3,-5],
                                       [1,2,6,4]]).det()) < Matrix.precision);
            Y.Assert.areEqual( 0, Matrix([[1,2,3],[4,5,6],[7,8,9]]).det());
            Y.Assert.areSame( 512, Matrix.create( 
                [[0,0,0,0,0,0,0,0,2],
                [0,0,0,0,0,0,0,2,0],
                [0,0,0,0,0,0,2,0,0],
                [0,0,0,0,0,2,0,0,0],
                [0,0,0,0,2,0,0,0,0],
                [0,0,0,2,0,0,0,0,0],
                [0,0,2,0,0,0,0,0,0],
                [0,2,0,0,0,0,0,0,0],
                [2,0,0,0,0,0,0,0,0]]).det());
        },
        
        testAdjugate: function(){
            Y.Assert.isFunction( Matrix.prototype.adjugate);
            
            Y.Assert.isTrue( Matrix.is( Matrix.identity(3).adjugate()),"first");
            Y.Assert.areEqual( Matrix(2,2,2).det(), Matrix(2,2,2).adjugate().mult(Matrix(2,2,2))[0][0]);
            Y.Assert.isTrue( Matrix(huge).adjugate().mult( huge).scale( 1/Matrix(huge).det()).equals( Matrix.identity(9)),"second");
        },
        
        testAdjugateError: function(){
            Matrix(1,2,3).adjugate();
        },
        
        testInvert: function(){
            Y.Assert.isFunction( Matrix.prototype.invert);
            Y.Assert.isTrue( Matrix.is( Matrix.identity(3).invert()));
            Y.Assert.isTrue( Matrix.identity(3).invert().equals( Matrix.identity(3)));
            //Y.Assert.isTrue( Matrix(2,2,2).mult( Matrix(2,2,2).invert()).equals( Matrix.identity(2)));
            //Y.Assert.isTrue( Matrix(2,2,2).invert().mult( Matrix(2,2,2)).equals( Matrix.identity(2)));
            // Matrix(2,2,2) is not invertable!
            Y.ArrayAssert.itemsAreEqual2D( [[-3,2,0],[2,-1,0],[1,-2,1]], Matrix([[1,2,0],[2,3,0],[3,4,1]]).invert() );
            Y.ArrayAssert.itemsAreEqual2D( Matrix([[-2,-5,4],[5,5,-5],[1,5,-2]]).scale(.2), Matrix([[3,2,1],[1,0,2],[4,1,3]]).invert());
        },
        
        testInvertError: function(){
            Matrix(1,2,3).invert();
        }
    });

    new Y.Button({
        label: "run Matrix tests",
        callback: function(){
            //Y.FireUnit.attach( Y.Test.Runner);

            Y.Test.Runner.add(m0);
            Y.Test.Runner.add(m1);
            Y.Test.Runner.add(m2);
            Y.Test.Runner.add(m3);
            Y.Test.Runner.run( );
            
    }}).render(document.body);

});

