use super::tree_builder::*;

#[allow(dead_code)]
pub fn preorder_traversal_recursive(root: Option<Rc<RefCell<TreeNode<i32>>>>) -> Vec<i32> {
  fn dfs<F: FnMut(i32)>(_root: Option<Rc<RefCell<TreeNode<i32>>>>, cb: &mut F) {
    if let Some(n) = _root {
      let node = n.borrow();
      cb(node.val);
      dfs(node.left.clone(), cb);
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
pub fn preorder_traversal_traverse(root: Option<Rc<RefCell<TreeNode<i32>>>>) -> Vec<i32> {
  let mut ret = vec![];
  let mut stack = vec![root];
  while let Some(node) = stack.pop() {
    if let Some(node) = node {
      let mut node = node.borrow_mut();
      ret.push(node.val);
      stack.push(node.right.take());
      stack.push(node.left.take());
    }
  }
  ret
}

pub fn run() -> Vec<i32> {
  let data = TreeNode::<i32>::deserialize("3,9,20,x,x,15,7".to_string());
  preorder_traversal_recursive(data)
}
