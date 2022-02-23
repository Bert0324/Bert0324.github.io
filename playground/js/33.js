/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  if (!nums.length) return -1;
  let left = 0, right = nums.length - 1, mid = -1;
  while (left <= right) {
    mid = left + ((right - left) >> 1);
    // 找到目标
    if (nums[mid] === target) return mid;
    // 数组左侧是升序
    if (nums[mid] >= nums[left]) {
      // 目标在数组左侧, 缩小右边界
      if (target >= nums[left] && target <= nums[mid]) {
        right = mid - 1;
      } 
      // 目标不在数组左侧, 缩小左边界
      else {
        left = mid + 1;
      }
    }
    // 数组右侧是升序
    else {
      // 目标在数组右侧，缩小左边界
      if (target <= nums[right] && target >= nums[mid]) {
        left = mid + 1;
      }
      // 目标在数组左侧，缩小右边界
      else {
        right = mid - 1;
      }
    }
  }
  // 未找到
  return -1;
};
