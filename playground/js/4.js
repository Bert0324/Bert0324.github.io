/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
 var findMedianSortedArrays = function (nums1, nums2) {
  /**
   * 找到两个sorted arrays的排序为k的元素
   */
  const getKthElement = (k) => {
    const len1 = nums1.length;
    const len2 = nums2.length;
    let index1 = 0;
    let index2 = 0;
    while (true) {
      if (index1 === len1) {
        // * nums1 到头了
        return nums2[index2 + k - 1];
      } else if (index2 === len2) {
        // * nums2 到头了
        return nums1[index1 + k - 1];
      } else if (k === 1) {
        // * 最后一次比较
        return Math.min(nums1[index1], nums2[index2]);
      }

      const half = k >> 1; // JS 中 k/2 不是整除，可以用parseInt(k/2)代替
      let newIndex1 = Math.min(index1 + half - 1, len1 - 1); // * 要注意index1+half-1可能会越界溢出, 所以下标最大为len1-1
      let newIndex2 = Math.min(index2 + half - 1, len2 - 1); // 同上

      if (nums1[newIndex1] <= nums2[newIndex2]) {
        // 开始抛弃部分序列，更新K值，抛弃的长度为newIndex1 - index1 + 1，对应end-start+1
        k -= newIndex1 - index1 + 1;
        // 更新抛弃过的序列的下标
        index1 = newIndex1 + 1; 
      } else {
        // 同上
        k -= newIndex2 - index2 + 1;
        index2 = newIndex2 + 1;
      }
    }
  };
  const totalLength = nums1.length + nums2.length;
  const median = totalLength >> 1;
  // * 核心思路为, 用二分找到从小到大第K个数
  if (totalLength % 2 === 1) {
    return getKthElement(median + 1);
  } else {
    return (getKthElement(median) + getKthElement(median + 1)) / 2;
  }
};
