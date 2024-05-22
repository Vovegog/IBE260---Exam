function quicksort(arr: number[]): number[] {
	if (arr.length <= 1) {
		return arr;
	}
	var pivot, left, right, i;

	pivot = arr[0];
	left = [];
	right = [];

	for (i = 1; i < arr.length; i++) {
		if (arr[i] < pivot) {
			left.push(arr[i]);
		} else {
			right.push(arr[i]);
		}
	}

	return quicksort(left).concat(pivot, quicksort(right));
}

const arr = [5, 2, 9, 3, 8, 6, 4, 1, 7];
const sortedArr = quicksort(arr);

console.log(sortedArr);
