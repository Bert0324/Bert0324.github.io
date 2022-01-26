use super::tree_builder::*;

pub fn build_tree(inorder: Vec<i32>, postorder: Vec<i32>) -> Option<Rc<RefCell<TreeNode<i32>>>> {
    if inorder.is_empty() {
        return None;
    }
    fn build(
        i1: i32,
        i2: i32,
        i3: i32,
        i4: i32,
        inorder: &Vec<i32>,
        postorder: &Vec<i32>,
    ) -> Option<Rc<RefCell<TreeNode<i32>>>> {
        if i1 > i2 {
            return None;
        }
        let root_val = postorder[i2 as usize];
        let mut index: i32 = 0;
        for (i, v) in inorder.iter().enumerate() {
            if *v == root_val {
                index = i as i32;
                break;
            }
        }
        let left_size = index as i32 - i3;
        let mut root = TreeNode::new(root_val);
        println!("i1:{},i2:{},left_size:{}", i1, i2, left_size);
        root.left = build(i1, i1 + left_size - 1, i3, index - 1, inorder, postorder);
        root.right = build(i1 + left_size, i2 - 1, index + 1, i4, inorder, postorder);
        return Some(Rc::new(RefCell::new(root)));
    }
    let end_index = inorder.len() as i32 - 1;
    build(0, end_index, 0, end_index, &inorder, &postorder)
}

pub fn run() -> Option<Rc<RefCell<TreeNode<i32>>>> {
    build_tree(vec![3, 9, 20, 15, 7], vec![9, 3, 15, 20, 7])
}
