use super::tree_builder::*;

#[allow(dead_code)]
pub fn vertical_traversal(root: Option<Rc<RefCell<TreeNode<i32>>>>) -> bool {
    if root.is_none() {
        return true;
    }
    fn dfs(
        node: Option<Rc<RefCell<TreeNode<i32>>>>,
        min_val: i32,
        max_val: i32,
        valid: bool,
        is_root: bool,
    ) -> bool {
        if valid == false {
            return valid;
        }
        if let Some(unwrapped_node) = node {
            let left = unwrapped_node.borrow_mut().left.take();
            let right = unwrapped_node.borrow_mut().right.take();
            let value = unwrapped_node.borrow().val;
            if !is_root && (value <= min_val || value >= max_val) {
                return false;
            }
            let left_valid = dfs(left, min_val, value, valid, false);
            if !left_valid {
                return left_valid;
            }
            let right_valid = dfs(right, value, max_val, valid, false);
            if !right_valid {
                return right_valid;
            }
        }
        return true;
    }
    return dfs(root, 0, 0, true, true);
}

pub fn run() -> bool {
    // 5,1,4,x,x,3,6
    // 2,1,3
    // 5,4,6,null,null,3,7
    let data = TreeNode::<i32>::deserialize("32,26,47,19,x,x,56,x,27".to_string());
    vertical_traversal(data)
}
