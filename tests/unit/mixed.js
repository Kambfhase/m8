YUI({
    gallery: 'gallery-2010.05.19-19-08'
}).use('gallery-button','test','node','Matrix-Assertions',function(Y){

    var factorialTC = new Y.Test.Case({
        name: "Factorial",
        
        testFactorial: function(){
            Y.Assert.isFunction( factorial);
            
            Y.Assert.isNumber( factorial( 0));
            Y.Assert.areSame( 1,factorial( 1));
            Y.Assert.areSame( 120,factorial( 5));
            Y.Assert.areSame( 3628800, factorial( 10));
            Y.Assert.areSame( 2432902008176640000, factorial( 20));
        }
    });

    var fibonacciTC = new Y.Test.Case({
        name: "Fibonacci",
        
        testFibonacci: function(){
            Y.Assert.isFunction( fibonacci);
            
            Y.Assert.isNumber( fibonacci( 0));
            Y.Assert.areSame( 0, fibonacci( 0));
            Y.Assert.areSame( 1, fibonacci( 1));
            Y.Assert.areSame( 1, fibonacci( 2));
            Y.Assert.areSame( 5, fibonacci( 5));
            Y.Assert.areSame( 144, fibonacci( 12));
            Y.Assert.areSame( 28657, fibonacci( 23));
            Y.Assert.areSame( 53316291173, fibonacci( 53));
        }
    });

    var complexTC = new Y.Test.Case({
        name: "Complex",
        
        testBasic: function(){
            Y.Assert.areEqual( -1, Complex(0,1).mult( Complex(0,1)));
            Y.Assert.areEqual( -1, Complex(1,0).mult( Complex(-1,0)));
            Y.Assert.areEqual( -1, Complex(1,1).mult( Complex(1,2)));
            Y.Assert.areEqual( -2, Complex(-1,1).mult( Complex(1,1)));
            Y.Assert.areEqual( 0, Complex( -5,-5).add( Complex(5,5)));
            Y.Assert.isTrue( Complex( 1,2).add(Complex(3,4)).equals( Complex(4,6)));
            Y.Assert.isTrue( Complex( 4,2).mult( .5).equals( Complex(2,1)));
        }
    });
    
    new Y.Button({
        label: "run mixed tests",
        callback: function(){

            //Y.FireUnit.attach( Y.Test.Runner);

            Y.Test.Runner.add(factorialTC);
            Y.Test.Runner.add(fibonacciTC);
            Y.Test.Runner.add(complexTC);
            Y.Test.Runner.run( );
            
    }}).render(document.body);
});