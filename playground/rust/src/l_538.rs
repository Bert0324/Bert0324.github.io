use super::tree_builder::*;

pub fn convert_bst(root: Option<Rc<RefCell<TreeNode<i32>>>>) -> Option<Rc<RefCell<TreeNode<i32>>>> {
    if root.is_none() {
        return root;
    }
    fn dfs(root: &Option<Rc<RefCell<TreeNode<i32>>>>, ret: &mut Vec<Rc<RefCell<TreeNode<i32>>>>) {
        if let Some(root) = root {
            let left = root.borrow_mut().left.clone();
            let right = root.borrow_mut().right.clone();
            dfs(&left, ret);
            ret.push(root.clone());
            dfs(&right, ret);
        }
    }
    let mut list = vec![];
    dfs(&root, &mut list);
    let mut acc = 0;
    while let Some(node) = list.pop() {
        let val = node.borrow_mut().val;
        node.borrow_mut().val = acc + val;
        acc += val;
    }
    root
}

pub fn run() -> Option<Rc<RefCell<TreeNode<i32>>>> {
    let data = TreeNode::<i32>::deserialize("4,1,6,0,2,5,7,x,x,x,3,x,x,x,8".to_string());
    convert_bst(data)
}
