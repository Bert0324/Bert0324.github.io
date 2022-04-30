/**
 * heap sort
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
    /**
     * swap value in arr
     * @param i1 
     * @param i2 
     */
    const swap = (i1, i2) => {
        const v = nums[i1];
        nums[i1] = nums[i2];
        nums[i2] = v;
    };

    /**
     * To heapify a subtree rooted with node
     * @param {number} n size of heap
     * @param {number} i an index in arr[]
     */
    const heapify = (n, i) => {
        const l = 2 * i + 1; // left = 2*i + 1
        const r = 2 * i + 2; // right = 2*i + 2
        let largest = i; // Initialize largest as root
        // If left child is larger than root
        if (l < n && nums[l] > nums[largest]) largest = l;
        // If right child is larger than largest so far
        if (r < n && nums[r] > nums[largest]) largest = r;
        // If largest is not root
        if (largest !== i) {
            swap(i, largest);
            // Recursively heapify the affected sub-tree
            heapify(n, largest);
        }
    };

    // Build heap (rearrange array)
    for (let i = Math.floor(nums.length / 2) - 1; i >= 0; i--) heapify(nums.length, i);

    // One by one extract an element from heap
    for (let i = nums.length - 1; i >= nums.length - k; i--) {
        // Move current root to end
        swap(0, i);
        // call max heapify on the reduced heap
        heapify(i, 0);
    }
    return nums[nums.length - k];
};

/**
 * quick sort
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
    const quickSort = (arr, i) => {
        if (!arr.length) return;
        const pivot = arr.pop();
        const left = arr.filter(v => v < pivot);
        const right = arr.filter(v => v >= pivot);
        const index = i + left.length;
        if (index === nums.length - k + 1) return pivot;
        const i1 = quickSort(right, i + left.length + 1);
        if (i1 !== undefined) return i1;
        const i2 = quickSort(left, i);
        if (i2 !== undefined) return i2;
    };
    return quickSort(nums, 0);
};