use super::tree_builder::*;

pub fn build_tree(preorder: Vec<i32>, inorder: Vec<i32>) -> Option<Rc<RefCell<TreeNode<i32>>>> {
    None
}

pub fn run() -> Option<Rc<RefCell<TreeNode<i32>>>> {
    build_tree(vec![3, 9, 20, 15, 7], vec![9, 3, 15, 20, 7])
}
