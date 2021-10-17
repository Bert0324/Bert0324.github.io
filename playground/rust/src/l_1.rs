#[allow(dead_code)]
fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
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

#[allow(dead_code)]
fn two_sum_pro(nums: Vec<i32>, target: i32) -> Vec<i32> {
    let mut ret = [].to_vec();
    for (index1, v1) in nums.iter().enumerate() {
        for (index2, v2) in nums.iter().enumerate().filter(|&(i, _)| i > index1) {
            if (v1 + v2) == target {
                ret.push(index1 as i32);
                ret.push(index2 as i32);
                return ret;
            }
        }
    }
    ret
}

#[allow(dead_code)]
fn two_sum_hashmap(nums: Vec<i32>, target: i32) -> Vec<i32> {
    use std::collections::HashMap;
    let mut kv = HashMap::<i32, usize>::new();
    for (index1, value) in nums.iter().enumerate() {
        let index2 = kv.get(&(target - value));
        match index2 {
            Some(i) => return [(*i) as i32, index1 as i32].to_vec(),
            None => {
                kv.insert(*value, index1);
            }
        }
    }
    [].to_vec()
}

pub fn run() -> Vec<i32> {
    let nums = [3, 2, 4].to_vec();
    let target = 6;
    two_sum_hashmap(nums, target)
}
