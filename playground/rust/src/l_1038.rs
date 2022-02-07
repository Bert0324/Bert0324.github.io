use super::tree_builder::*;

pub fn bst_to_gst(root: Option<Rc<RefCell<TreeNode<i32>>>>) -> Option<Rc<RefCell<TreeNode<i32>>>> {
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
  let mut sum = 0;
  while let Some(node) = list.pop() {
      let val = node.borrow_mut().val;
      sum += val;
      node.borrow_mut().val = sum;
  }
  root
}

pub fn run() -> Option<Rc<RefCell<TreeNode<i32>>>> {
    let data = TreeNode::<i32>::deserialize("3,1,4,x,2".to_string());
    bst_to_gst(data)
}
