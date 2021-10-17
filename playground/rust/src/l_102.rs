use super::tree_builder::*;

#[allow(dead_code)]
pub fn level_order_dfs(root: Option<Rc<RefCell<TreeNode<i32>>>>) -> Vec<Vec<i32>> {
    let mut ret = vec![];
    if root.is_none() {
        return ret;
    }
    fn dfs(node: Option<Rc<RefCell<TreeNode<i32>>>>, current_level: i32, arr: &mut Vec<Vec<i32>>) {
        if let Some(unwrapped_node) = node {
            if !arr.get_mut(current_level as usize).is_some() {
                arr.push(vec![]);
            }
            let current_level_arr = arr.get_mut(current_level as usize).unwrap();

            let borrow_unwrapped_node = unwrapped_node.borrow();

            current_level_arr.push(borrow_unwrapped_node.val);
            dfs(borrow_unwrapped_node.left.clone(), current_level + 1, arr);
            dfs(borrow_unwrapped_node.right.clone(), current_level + 1, arr);
        }
    }
    dfs(root, 0, &mut ret);
    ret
}

#[allow(dead_code)]
pub fn level_order_bfs(root: Option<Rc<RefCell<TreeNode<i32>>>>) -> Vec<Vec<i32>> {
    use std::collections::VecDeque;

    let mut ret = vec![];
    if root.is_none() {
        return ret;
    }
    let mut queue = VecDeque::<Option<Rc<RefCell<TreeNode<i32>>>>>::new();
    queue.push_front(root);
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
            ret.push(level_arr);
        }
    }
    ret
}

pub fn run() -> Vec<Vec<i32>> {
    let data = TreeNode::<i32>::deserialize("1,2,3,x,x,4,5".to_string());
    level_order_dfs(data)
}
