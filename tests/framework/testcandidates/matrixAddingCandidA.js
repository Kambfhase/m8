var testCandidate = function( a, b){
    var that = [], i=a.length, j, row;
    while( i--){
        row=[];
        j=a[i].length;
        while(j--){
            row[j]=a[i][j]+b[i][j];
        }
        that[i]=row;
    }
    return that;
};

