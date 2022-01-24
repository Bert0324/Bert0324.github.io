use super::tree_builder::*;

pub fn build_tree(preorder: Vec<i32>, inorder: Vec<i32>) -> Option<Rc<RefCell<TreeNode<i32>>>> {
    if preorder.is_empty() {
        return None;
    }
    fn build(
        i1: usize,
        i2: usize,
        i3: usize,
        i4: usize,
        preorder: &Vec<i32>,
        inorder: &Vec<i32>,
    ) -> Option<Rc<RefCell<TreeNode<i32>>>> {
        if i1 > i2 {
            return None;
        }
        let root_val = preorder[i1];
        let mut index = 0;
        for (i, v) in inorder.iter().enumerate() {
            if *v == root_val {
                index = i;
                break;
            }
        }
        let left_size = index - i3;
        let mut root = TreeNode::new(root_val);
        root.left = build(i1 + 1, i1 + left_size, i3, index - 1, preorder, inorder);
        root.right = build(i1 + left_size + 1, i2, index + 1, i4, preorder, inorder);
        return Some(Rc::new(RefCell::new(root)));
    }
    let end_index = preorder.len() - 1;
    build(0, end_index, 0, end_index, &preorder, &inorder)
}

pub fn run() -> Option<Rc<RefCell<TreeNode<i32>>>> {
    build_tree(vec![3, 9, 20, 15, 7], vec![9, 3, 15, 20, 7])
}
