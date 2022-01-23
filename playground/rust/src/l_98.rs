use super::tree_builder::*;

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
        is_min: bool,
        is_max: bool,
    ) -> bool {
        if valid == false {
            return valid;
        }
        if let Some(unwrapped_node) = node {
            let left = unwrapped_node.borrow_mut().left.take();
            let right = unwrapped_node.borrow_mut().right.take();
            let value = unwrapped_node.borrow().val;
            if !is_root && (!is_min && value <= min_val || !is_max && value >= max_val)
                || !dfs(left, min_val, value, valid, false, is_min, false)
                || !dfs(right, value, max_val, valid, false, false, is_max)
            {
                return false;
            }
        }
        return true;
    }
    return dfs(root, i32::MIN, i32::MAX, true, true, true, true);
}

pub fn run() -> bool {
    // 5,1,4,x,x,3,6
    // 2,1,3
    // 5,4,6,null,null,3,7
    let data = TreeNode::<i32>::deserialize("2,1,3".to_string());
    vertical_traversal(data)
}
