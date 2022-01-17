use super::tree_builder::*;

#[allow(dead_code)]
pub fn zigzag_level_order(root: Option<Rc<RefCell<TreeNode<i32>>>>) -> Vec<Vec<i32>> {
    use std::collections::VecDeque;

    let mut ret = vec![];
    if root.is_none() {
        return ret;
    }
    let mut queue = VecDeque::<Option<Rc<RefCell<TreeNode<i32>>>>>::new();
    queue.push_front(root);
    let mut current_level = 0;
    while !queue.is_empty() {
        let num = queue.len() as i32;
        let mut level_arr = vec![];
        let mut i = 0;
        while i < num {
            i += 1;
            if let Some(node) = queue.pop_front() {
                if let Some(unwrapped_node) = node {
                    let borrow_unwrapped_node = unwrapped_node.borrow();
                    level_arr.push(borrow_unwrapped_node.val);
                    queue.push_back(borrow_unwrapped_node.left.clone());
                    queue.push_back(borrow_unwrapped_node.right.clone());
                }
            }
        }
        if level_arr.len() != 0 {
            if current_level % 2 == 0 {
                ret.push(level_arr);
            } else {
                level_arr.reverse();
                ret.push(level_arr);
            }
        }
        current_level += 1;
    }
    ret
}

pub fn run() -> Vec<Vec<i32>> {
    let data = TreeNode::<i32>::deserialize("1,2,3,x,x,4,5".to_string());
    zigzag_level_order(data)
}
