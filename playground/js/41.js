/**
 * @param {number[]} nums
 * @return {number}
 * @description 要求时间复杂度O(n)及空间复杂度 O（1）
 * 思路：
 * 1、原地操作交换数组，使数组达到理想状态
 * 2、[3,4,-1,1] = [1,-1,3,4]
 * 3、使得num[i] = i+1,否则缺少的正数就是i+1
 */
 var firstMissingPositive = function(nums) {
    for (let i = 0; i < nums.length; i++) {
        while (
            nums[i] >= 1 && 
            nums[i] <= nums.length &&  // 仅对小于数组长度的数组进行交换
            nums[nums[i] - 1] !== nums[i] // 出现理想位置的，不需要交换
        ) {
            const temp = nums[nums[i] - 1]
            nums[nums[i] - 1] = nums[i]
            nums[i] = temp
        }
    }
    // 交换完，得到理想正数的数组，可以找到缺少的数组
    for(let i =0;i<nums.length;i++) {
        if(nums[i] != i+1) {
            return i+1
        }
    }
    return nums.length+1
};
