use super::tree_builder::*;

pub fn flatten(root: &mut Option<Rc<RefCell<TreeNode<i32>>>>) {
    if root.is_none() {
        return;
    }
    fn preorder_traversal_traverse(
        root: &mut Option<Rc<RefCell<TreeNode<i32>>>>,
    ) -> Vec<Rc<RefCell<TreeNode<i32>>>> {
        let mut ret = vec![];
        let mut stack = vec![root.clone()];
        while let Some(node) = stack.pop() {
            if let Some(node) = node {
                ret.push(node.clone());
                stack.push(node.borrow_mut().right.take());
                stack.push(node.borrow_mut().left.take());
            }
        }
        ret
    }
    let mut list = preorder_traversal_traverse(root);
    list.reverse();
    while let Some(node) = list.pop() {
        node.borrow_mut().left = None;
        if list.len() != 0 {
            node.borrow_mut().right = Some(list.get(list.len() - 1).unwrap().clone());
        }
    }
}

pub fn run() {
    let mut data = TreeNode::<i32>::deserialize("[1,x,2,x,3,x,4,x,5,x,6".to_string());
    flatten(&mut data)
}
