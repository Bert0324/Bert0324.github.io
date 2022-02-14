use super::tree_builder::*;

#[allow(dead_code)]
pub fn inorder_traversal_recursive(root: Option<Rc<RefCell<TreeNode<i32>>>>) -> Vec<i32> {
    fn dfs<F: FnMut(i32)>(_root: Option<Rc<RefCell<TreeNode<i32>>>>, cb: &mut F) {
        if let Some(n) = _root {
            let node = n.borrow();
            dfs(node.left.clone(), cb);
            cb(node.val);
            dfs(node.right.clone(), cb);
        }
    }
    let mut ret = vec![];
    dfs(root, &mut |v| {
        ret.push(v);
    });
    ret
}

#[allow(dead_code)]
pub fn inorder_traversal_traverse(root: Option<Rc<RefCell<TreeNode<i32>>>>) -> Vec<i32> {
    let mut ret = vec![];
    let mut stack = vec![];
    let mut current_root_wrap = root;

    while current_root_wrap.is_some() || !stack.is_empty() {
        while let Some(node) = current_root_wrap {
            current_root_wrap = node.borrow().left.clone();
            stack.push(node);
        }
        if let Some(node) = stack.pop() {
            ret.push(node.borrow().val);
            current_root_wrap = node.borrow().right.clone();
        }
    }

    ret
}

pub fn run() -> Vec<i32> {
    let data = TreeNode::<i32>::deserialize("3,9,20,x,x,15,7".to_string());
    inorder_traversal_traverse(data)
}
