var testCandidate = function( other){
// EXAMPLE!
    var that = [], i=this.length,j,row;
    while( i--){
        row=[];
        j=this[i].length;
        while(j--){
            row[j]=this[i][j]+other[i][j];
        }
        that[i]=row;
    }
    return that;
};

