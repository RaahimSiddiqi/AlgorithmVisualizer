
function BucketSort(array) {
    let max = Math.max(...array);
    const n = array.length;
    var buckets = new Array(n);

    for (var i = 0; i < n; ++i) {
        buckets[i] = []
    }

    for(let i = 0 ; i < n; i++){
        const index = Math.floor(n * array[i] / max);
        if (index != n) 
            buckets[index].push(array[i]);
        else 
            buckets[index - 1].push(array[i]);
    }
    
    for (let i = 0, k = 0; i < n; i++) {
        buckets[i].sort();
    }

    for (let i = 0, k = 0; i < n; i++) {
        for (let j = 0; j < buckets[i].length; j++, k++) {
            array[k] = buckets[i][j]
        }
    }
}
