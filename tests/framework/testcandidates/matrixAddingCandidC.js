var testCandidate = function( a,b){
    var i=0, j, c=[];
    for(; i< a.length; i++){
        c[i]=[];
        for(j=0; j< a[i].length; j++){
            c[i][j]=a[i][j]+b[i][j];
        }
    }
    return c;
}