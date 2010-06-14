var testCase = function( testCandidate, assert){
    return {
        name : "Matrix Adding",
        
        testExistence: function(){
            assert.isNotUndefined( testCandidate);
            assert.isNotUndefined( testCandidate([[1]],[[1]]));
            assert.isNotUndefined( testCandidate( MatrixBase([[2]]), MatrixBase([[2]])));
            assert.isNotUndefined( testCandidate( Matrix([[3]]), Matrix([[3]])));
            assert.isNotUndefined( testCandidate( Vector([[4]]), Vector([[4]])));
        },
        
        testSmall: function(){
            var a= [[1,2,3],[4,5,6],[7,8,9]],
                b= [[0,0,1],[0,0,1],[0,0,1]],
                c= [[0,0,0],[0,0,0],[0,0,0]],
                d,e;
            
            d= testCandidate( a, c);
            assert.areNotEqual( a, d);
            assert.areNotEqual( c, d);
            assert.areSimilar( d, a);
            assert.areSimilar( d, testCandidate( c, a));
            
            d= testCandidate( c, c);
            assert.areNotEqual( c, d);
            assert.areSimilar( c, d);
            
            d= testCandidate( b, c);
            assert.areNotEqual( c, d);
            assert.areNotEqual( b, d);
            assert.areSimilar( b, d);
            assert.areSimilar( d, testCandidate( c, b));
            
            a=Matrix([[1,2,3],[4,5,6],[7,8,9]]),
            b=Matrix([[1,0,1],[0,1,0],[1,0,1]]);
            e=Matrix(3,3,0);
            
            d= testCandidate( a, b);
            assert.areSimilar([[2,2,4],[4,6,6],[8,8,10]], d);
            assert.areSimilar([[2,2,4],[4,6,6],[8,8,10]], testCandidate( b, a));
            
            d=testCandidate( a, c);
            assert.areSimilar( d, a);
            e= testCandidate( a, e);
            assert.areNotEqual( d, e);
            assert.areSimilar( d, a);
            assert.areSimilar( d, e);
            
            a=[[-1,0,1],[-2,2,-2],[0,0,5]];
            b=[[-.5,0,.5],[-1,1,-1],[0,0,5/2]];
            
            d=testCandidate( a, c);
            assert.areSimilar( d, a);
            d=testCandidate( b, c);
            assert.areSimilar( d, b);
            d=testCandidate( b, b);
            assert.areSimilar( d, a);
        },
        
        profileSmall: function(){
            var start = new Date(),
            count = 0, time, runss;
            do {
                ++count;
                assert.areSimilar( testCandidate([[1,0,3],[-1,0,0],[.5,6,18]], [[0,0,7],[7,-3,2],[2.5,6,32]]), [[1,0,10],[6,-3,2],[3,12,50]]);
            } while( ((time = new Date()- start)) < 100)
            
            runss = count/time*1000;
            assert.log( runss + " runs per second.");
            
            assert.isTrue( runss < 100000 , "too slow.");
        }
    };
}