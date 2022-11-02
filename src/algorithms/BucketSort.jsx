

export default function *BucketSort(v) {
    let array = v.state.array;
    
    yield { numbers: array }
}