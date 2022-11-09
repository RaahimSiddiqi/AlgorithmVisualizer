

export default function *CountingSort(v) {  
  let array = v.state.array;

  // Creates 2D list of size max number in the array
  v.defineAuxArray(Math.max(...array) + 1);

  // Finds the "counts" for each individual number
  for (let i = 0; i < array.length; i++) {
    v.auxSupportingArray[array[i]] += 1;
    yield { numbers: array  }
  }

  // Find the cumulative sum counts
  for (let i = 1; i < v.auxSupportingArray.length; i++) {
    v.auxSupportingArray[i] = v.auxSupportingArray[i-1] + v.auxSupportingArray[i]
    yield { numbers: array, counts: [...v.auxSupportingArray]}
  }

  // Sorting Phase
  let arr = Array(array.length).fill(0)  
  for (let i = 0; i < arr.length; i++) {
    let index = v.auxSupportingArray[array[i]] - 1
    arr[index] = array[i]
    v.auxSupportingArray[array[i]] -= 1 
    yield {numbers: arr}
  }
}
