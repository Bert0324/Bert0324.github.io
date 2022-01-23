use super::tree_builder::*;

pub fn lowest_common_ancestor(
    root: Option<Rc<RefCell<TreeNode<i32>>>>,
    p: Option<Rc<RefCell<TreeNode<i32>>>>,
    q: Option<Rc<RefCell<TreeNode<i32>>>>,
) -> Option<Rc<RefCell<TreeNode<i32>>>> {
    fn dfs(
        node: Option<Rc<RefCell<TreeNode<i32>>>>,
        p_val: i32,
        q_val: i32,
    ) -> Option<Rc<RefCell<TreeNode<i32>>>> {
        if let Some(x) = node {
            if x.borrow().val == p_val || x.borrow().val == q_val {
                return Some(Rc::clone(&x));
            }
            let left = dfs(x.borrow_mut().left.take(), p_val, q_val);
            let right = dfs(x.borrow_mut().right.take(), p_val, q_val);
            if left.is_none() {
                right
            } else if right.is_none() {
                left
            } else {
                Some(Rc::clone(&x))
            }
        } else {
            None
        }
    }
    dfs(root, p.unwrap().borrow().val, q.unwrap().borrow().val)
}

pub fn run() -> i32 {
    let data = TreeNode::<i32>::deserialize("3,5,1,6,2,0,8,x,x,7,4".to_string());
    let p = TreeNode::<i32>::deserialize("5".to_string());
    let q = TreeNode::<i32>::deserialize("1".to_string());
    lowest_common_ancestor(data, p, q).unwrap().borrow().val
}
