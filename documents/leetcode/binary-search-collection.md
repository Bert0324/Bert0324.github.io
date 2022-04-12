# Binary Search

## Scenario

对于是有序数组，且时间复杂度要求为O(logn)，且要求是找出某个数的位置/边界的问题，可以优先想到BS的解法。

同时有些题目可能没有那么直观，如果是要求计算最大值/最小值(相当于去计算边界)，也可以考虑到BS。

## Basic

对于一个基本的BS，有以下这么一个框架，不同的题目可以去微调。

```js
const binarySearch = (nums, target) => {
    if (!nums.length) return -1;
    let left = 0;
    let right = nums.length - 1;
    // <= 保证 [n, n]这个区间是被考虑进去的
    while (left <= right) {
        const mid = ~~((left + right) / 2);
        if (nums[mid] === target) return ...
        else if (nums[mid] < target) ...
        else right = ...
    }
    return ...
};
```

## Search A Target

这是最简单的一种情况, 当找到了target就直接返回。

```js
const binarySearchTarget = (nums, target) => {
    if (!nums.length) return -1;
    let left = 0;
    let right = nums.length - 1;
    // <= 保证 [n, n]这个区间是被考虑进去的
    while (left <= right) {
        const mid = ~~((left + right) / 2);
        if (nums[mid] === target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
};
```

## Search Left Boundary

这是去寻找左侧边界，与直接找到target不同的是，当找到了target的位置时，仍然要继续去寻找其可能的左边界。

对于`left`的含义，可以直观的理解为: `nums`中小于`target`的值有多少个，有以下两种不存在的可能：

- 存在0个，此时`left`为0，既可能nums[0]是结果，也可能结果不存在
- 存在nums.length个，结果不存在

```js
const binarySearchLeftBoundary = (nums, target) => {
    if (!nums.length) return -1;
    let left = 0;
    let right = nums.length - 1;
    // <= 保证 [n, n]这个区间是被考虑进去的
    while (left <= right) {
        const mid = ~~((left + right) / 2);
        // 如果找到target，继续寻找其可能的左边界
        if (nums[mid] === target) right = mid - 1;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    if (nums[left] !== target) return -1;
    return left;
};
```

## Search Right Boundary

与寻找左边界类似。

```js
const binarySearchRightBoundary = (nums, target) => {
    if (!nums.length) return -1;
    let left = 0;
    let right = nums.length - 1;
    // <= 保证 [n, n]这个区间是被考虑进去的
    while (left <= right) {
        const mid = ~~((left + right) / 2);
        // 如果找到target，继续寻找其可能的右边界
        if (nums[mid] === target) left = mid + 1;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    if (nums[right] !== target) return -1;
    return right;
};
```

## Reference

- <https://mp.weixin.qq.com/s/M1KfTfNlu4OCK8i9PSAmug>
- <https://mp.weixin.qq.com/s/EjL65QmfX20xhhd-wKlgSg>