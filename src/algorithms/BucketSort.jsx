
function *InsertionSort(array, v) {  // Insertion Sort
    let j;

}

export default function *BucketSort(v) {
    let array = v.state.array;
    let max = Math.max(...array);
    const n = array.length;
    var buckets = new Array(n);
    for (var i = 0; i < n; ++i) {
        buckets[i] = []
    }


    for(let i = 0 ; i < array.length ; i++){
        const index = Math.floor(n * array[i] / max);
        if (index != n) {
            buckets[index].push(array[i]);
        }
        else {
            buckets[index - 1].push(array[i]);
        }
    }
    
    for (let i = 0, k = 0; i < n; i++) {
        for (let j = 0; j < buckets[i].length; j++, k++) {
            array[k] = buckets[i][j]
            if (v.state.mode == 0) v.selected[k] = 1
            if (v.state.mode) v.selected[k] = "yellow"
        }
        if (buckets[i].length > 0) yield { numbers: array }
        k -= buckets[i].length;
        
        for (var m = 1; m < buckets[i].length; m++, k++) { 
            let key = buckets[i][m];  
            let j = m - 1;  
    
            while (j >= 0 && buckets[i][j] > key) { 
                v.selected = v.selected.fill(0, m, buckets[i].length-1);
                buckets[i][j + 1] = buckets[i][j]; 
                array[k + 1] = buckets[i][j + 1] 
                j = j - 1; 

                let temp = [...array]
                temp[k] = key

                v.selected[k] = 2;
                yield {numbers : temp}; 
                v.selected[k] = "yellow";
            }  
            buckets[i][j + 1] = key; 
            array[k + 1] = key;
        }  

        if (buckets[i].length > 1) k -= buckets[i].length - 1;
        for (let j = 0; j < buckets[i].length; j++, k++) {
            array[k] = buckets[i][j]
        }

        if (buckets[i].length > 0) yield { numbers: array }
        v.selected = v.selected.fill(0);
    }

    for (let i = 0, k = 0; i < n; i++) {
        for (let j = 0; j < buckets[i].length; j++, k++) {
            array[k] = buckets[i][j]
        }
    }
    yield { numbers: array }
}



// for (let a = 0, c = 0; a < n; a++) {
//     for (let b = 0; b < buckets[a].length; b++, c++) {
//         array[c] = buckets[a][b]
//         if (i == a) {
//             v.selected[c] = 1
//         }
//     }
//     if (i == a) {
//         yield { numbers: array }
//         break;
//     } 
// }