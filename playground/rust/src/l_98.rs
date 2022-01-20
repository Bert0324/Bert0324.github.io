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
            println!("{},{},{}", value, min_val, max_val);
            if !is_root && (value <= min_val || value >= max_val) {
                return false;
            }
            let next_max = if value > max_val {
                value
            } else {
                if max_val == i32::MAX {
                    value
                } else {
                    max_val
                }
            };
            let next_min = if value < min_val {
                value
            } else {
                if min_val == i32::MIN {
                    value
                } else {
                    min_val
                }
            };

            let left_valid = dfs(left, next_min, max_val, valid, false);
            if !left_valid {
                return left_valid;
            }
            let right_valid = dfs(right, min_val, next_max, valid, false);
            if !right_valid {
                return right_valid;
            }
        }
        return true;
    }
    return dfs(root, i32::MIN, i32::MAX, true, true);
}

pub fn run() -> bool {
    // 5,1,4,x,x,3,6
    // 2,1,3
    // 5,4,6,null,null,3,7
    let data = TreeNode::<i32>::deserialize("32,26,47,19,x,x,56,x,27".to_string());
    vertical_traversal(data)
}
