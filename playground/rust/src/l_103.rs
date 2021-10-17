use super::tree_builder::*;

#[allow(dead_code)]
pub fn zigzag_level_order(root: Option<Rc<RefCell<TreeNode<i32>>>>) -> Vec<Vec<i32>> {
    let mut ret = vec![];
    ret
}

pub fn run() -> Vec<Vec<i32>> {
    let data = TreeNode::<i32>::deserialize("1,2,3,x,x,4,5".to_string());
    zigzag_level_order(data)
}
