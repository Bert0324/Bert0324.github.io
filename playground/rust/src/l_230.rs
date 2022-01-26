use super::tree_builder::*;

pub fn kth_smallest(root: Option<Rc<RefCell<TreeNode<i32>>>>, k: i32) -> i32 {
    if root.is_none() {
        return k;
    }
    fn dfs(root: Option<Rc<RefCell<TreeNode<i32>>>>, ret: &mut Vec<i32>) {
        if let Some(root) = root {
            let left = root.borrow_mut().left.take();
            let right = root.borrow_mut().right.take();
            dfs(left, ret);
            ret.push(root.borrow().val);
            dfs(right, ret);
        }
    }
    let mut list = vec![];
    dfs(root, &mut list);
    *list.get(k as usize - 1).unwrap()
}

pub fn run() -> i32 {
    let data = TreeNode::<i32>::deserialize("3,1,4,x,2".to_string());
    kth_smallest(data, 1)
}
