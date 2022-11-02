

export default function *CountingSort(v, exp) {  
  let array = v.state.array;

  // Creates 2D list of size max number in the array
  let counts = Array(Math.max(...array) + 1).fill(0)  
  console.log(counts)

  // Finds the "counts" for each individual number
  array.forEach((value) => counts[value]  += 1)
  console.log(counts)  

  // Find the cumulative sum counts
  for (let i = 1; i < counts.length; i++) 
      counts[i] = counts[i-1] + counts[i]
  console.log(counts) 

  // Sorting Phase
  let arr = Array(array.length).fill(0)  
  yield {numbers: arr}
  for (let i = 0; i < arr.length; i++) {
    let index = counts[array[i]] - 1
    arr[index] = array[i]
    counts[array[i]] -= 1 
    yield {numbers: arr}
  }
}
