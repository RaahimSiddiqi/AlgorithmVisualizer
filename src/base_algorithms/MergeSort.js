
function MergeSort(array) { 
    return UtilMergeSort(array, 0, array.length);
}


function UtilMergeSort(array, low, high) {
    if (array.length < 2)            
        return array
     
    let result = []                  
    let mid = Math.floor(array.length / 2)
     
    let y = UtilMergeSort(array.slice(0, mid), 0, mid-1)      
    let z = UtilMergeSort(array.slice(mid, array.length), mid, high)   
    let i = 0
    let j = 0

    while (i < y.length && j < z.length) {  
        if (y[i] > z[j]) {
            result.push(z[j])
            j += 1
            low += 1
        }
        else {
            result.push(y[i])
            i += 1
            low += 1
        }
    }
    result = result.concat(y.slice(i, y.length))         
    result = result.concat(z.slice(j, z.length))   
    return result;
}

