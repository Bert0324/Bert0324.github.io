pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
    let mut ret = [].to_vec();
    for (index1, i) in nums.iter().enumerate() {
        for (index2, j) in nums.iter().enumerate() {
            if (i + j) == target && index1 != index2 {
                ret.push(index1 as i32);
                ret.push(index2 as i32);
                return ret;
            }
        }
    }
    ret
}

pub fn run() -> Vec<i32> {
    let nums = [3, 2, 4].to_vec();
    let target = 6;
    return two_sum(nums, target);
}
