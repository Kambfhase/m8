var window = self;

onmessage = (function(self, post){ // gets invoked right away!
    var LOAD_BASEDIR = "../../build/",
        CASE_BASEDIR = "./testcases/",
        CANDIDATE_BASEDIR = "./testcandidates/",
        flag = true,
        assertcount = 0,
        assert = {
            //// HELPERS ///
            log: function( sz){
                post( sz);
            },
            //// TYPES ////
            isString: function( sz, message){
                assertcount++;
                if( !String.prototype.isPrototypeOf( sz) && typeof sz !== "string"){
                    message = "isString() assertion failed. argument wasnt a string: "+String(sz)+( message? " \nmessage: "+message : "\nassert number: "+assertcount);
                    post(message); // push the message to the Frontend
                    throw message; // throw an error to stop the current test
                }
                return true;
            },
            //// NOT TYPES ////
            //// VALUES ////
            isTrue: function( val, message){
                assertcount++;
                if( val !== true){
                    message = "isTrue() assertion failed. argument wasnt true: "+String(val)+( message? " \nmessage: "+message : "\nassert number: "+assertcount);
                    post(message);
                    throw message;
                }
                return true;
            },
            //// NOT VALUES ////
            isNotUndefined: function( val, message){
                assertcount++;
                if( val === undefined){
                    message = "isNotUndefined() assert failed. argument was undefined: "*String(val)+( message? " \nmessage: "+message : "\nassert number: "+assertcount);
                    post( message);
                    throw message;
                }
                return true;
            },
            //// COMPARISIONS ////
            areNotEqual: function( val0, val1, message){
                assertcount++;
                if( val0 == val1){
                    message = "areNotEqual() assert failed. arguments were equal, val0: "+String(val0)+" val1:"+String(val1)+( message? " \nmessage: "+message : "\nassert number: "+assertcount);
                    post( message);
                    throw message;
                }
                return true;
            },
            areSimilar: function( a, b, message){
                assertcount++;
                if( !(function(a,b){
                    var i= a.length,j, rowA, rowB;
                    if( i !== b.length){
                        return false;
                    }
                    
                    while( i--){
                        rowA= a[i];
                        rowB= b[i];
                        j= rowA.length;
                        if( j !== rowB.length){
                            return false;
                        }
                        while( j--){
                            if( rowA[j] !== rowB[j]){
                                return false;
                            }
                        }
                    }
                    return true;
                })(a,b)){
                    message = "areSimilar() assertion failed. a: "+String(a)+" b: "+String(b)+( message? " \nmessage: "+message : "\nassert number: "+assertcount);
                    post(message);
                    throw message;
                }
                return true;
            }
        };

    return function ( message){
        // data.data should have this format:
        // { cmd : "run",
        //   load: ["file1.js","path/to/file2.js"],
        //   case: "testcase1.js",
        //   candidate: "testcandidate5.js"
        // }
        // 
        var data= message.data;

        // load dependencies
        if( assert.isString( data.load)){
            importScripts( LOAD_BASEDIR+data.load);
        } else {
            importScripts.apply( self, data.load.map(function(filename){
                return LOAD_BASEDIR+filename;
            }));
        }

        importScripts( CASE_BASEDIR+ data["case"]); // load the test case
        importScripts( CANDIDATE_BASEDIR+ data.candidate ); // load the functions to test

        if( data.cmd === "run"){
            var runner = testCase( self.testCandidate, assert), // pass the candidate and assert to the testcase which then returns an object
                i=0, passed=0, subtest, keys,
                endAfterNext = function(){
                    // is called when we are done.
                    post( "finished testing.\n passed "+passed+" of "+keys.length);
                };
            
            post(runner.name); // post the test cases name
            
            keys = Object.keys( runner).filter(function( key){
                return key !== "name";// && Object.prototype.hasOwnProperty( runner, key);
            });
          
            var testNextSubtest = function(){
                assertcount=0;
                flag = true;
                
                var k = i++;
                
                // add the next test to the queue
                if( i < keys.length){
                    self.setTimeout( testNextSubtest, 0);
                } else {
                    // no more tests to run
                    self.setTimeout( endAfterNext, 0);
                }
                
                post("  running "+keys[k]); // print the current subtest
                runner[keys[k]](); // run it
                // if we reach this point, no error was thrown, so we passed.
                post("  passed ("+assertcount+" assertions)"); 
                passed++;
            };
            
            self.setTimeout(testNextSubtest, 0); // start the first one!
        }

    };

})(self, postMessage);