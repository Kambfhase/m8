var testCandidate = function( _this, other){
    var that = [], i=_this.length,n=_this[0].length,
    j,row, rowA, rowB;
    while( i--){
        row=[];
        rowA=_this[i];
        rowB=other[i];
        j=n;
        while(j--){
            row[j]=rowA[j]+rowB[j];
        }
        that[i]=row;
    }
    return that;
};