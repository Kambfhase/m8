var testCase = function( testCandidate, assert){
    return {
        name: "Example test Case",
        
        testExistence: function(){
            assert.isTrue( !!testCandidate);
        },
        
        moretesting: function(){
            assert.isTrue( !!testCandidate);
        },
        
        fail: function(){
            assert.isTrue( false, "My Error message");
        },
        
        alsoFails: function(){
            assert.isTrue( true);
            assert.isTrue( 1); // i am too lazy to write a message
        }
    }
};
