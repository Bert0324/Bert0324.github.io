use super::tree_builder::*;

/**
 * 找到本节点下的最左节点
 * - 在BST下即为最小节点
 */
fn node_min(root: &Option<Rc<RefCell<TreeNode<i32>>>>) -> Option<Rc<RefCell<TreeNode<i32>>>> {
    let mut left = root.clone();
    let mut stop = false;
    while !stop {
        // 这里有个前提，传进来的root一定不为空
        let l = left.clone().unwrap().borrow_mut().left.clone();
        if l.is_some() {
            left = l;
        } else {
            stop = true;
        }
    }
    left.clone()
}

/**
 * 找到本节点下的最右节点
 * - 在BST下即为最大节点
 */
fn node_max(root: &Option<Rc<RefCell<TreeNode<i32>>>>) -> Option<Rc<RefCell<TreeNode<i32>>>> {
    let mut right = root.clone();
    let mut stop = false;
    while !stop {
        // 这里有个前提，传进来的root一定不为空
        let r = right.clone().unwrap().borrow_mut().right.clone();
        if r.is_some() {
            right = r;
        } else {
            stop = true;
        }
    }
    right.clone()
}

pub fn delete_node(root: Option<Rc<RefCell<TreeNode<i32>>>>, key: i32) -> Option<Rc<RefCell<TreeNode<i32>>>> {
    if let Some(n) = root.clone() {
        let left = n.borrow_mut().left.clone();
        let right = n.borrow_mut().right.clone();
        let val = n.borrow().val;
        // 如果为目标节点
        if val == key {
            // 恰好是末端节点，两个子节点都为空，直接删掉就行
            if left.is_none() && right.is_none() {
                return None;
            // 有右节点，用右节点中的最小节点替换
            } else if right.is_some() {
                // 找出右节点中的最小节点值。此处右节点一定不为空
                let min_val = node_min(&right).unwrap().borrow().val;
                // 把本节点的值替换掉
                n.borrow_mut().val = min_val;
                // 删去右节点中的最小节点
                n.borrow_mut().right = delete_node(right, min_val);
            // 有左节点，用左节点中的最大节点替换
            } else {
                // 找出左节点中的最大节点值。此处左节点一定不为空
                let max_val = node_max(&left).unwrap().borrow().val;
                // 把本节点的值替换掉
                n.borrow_mut().val = max_val;
                // 删去左节点中的最大节点
                n.borrow_mut().left = delete_node(left, max_val);
            }
        // 比目标节点值大，目标节点在左节点处
        } else if val > key {
            n.borrow_mut().left = delete_node(left, key);
        // 比目标节点值小，目标节点在右节点处
        } else if val < key {
            n.borrow_mut().right = delete_node(right, key);
        }
        // 返回当前节点
        return root.clone();
    }
    return None;
}

pub fn run() -> String {
    let data = TreeNode::<i32>::deserialize("5,3,6,2,4,null,7".to_string());
    TreeNode::<i32>::serialize(delete_node(data, 3))
}
