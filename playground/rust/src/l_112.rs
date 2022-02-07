use super::tree_builder::*;

pub fn has_path_sum(root: Option<Rc<RefCell<TreeNode<i32>>>>, target_sum: i32) -> bool {
  fn dfs(node: Option<Rc<RefCell<TreeNode<i32>>>>, sum: i32, target: i32) -> bool {
    if let Some(node) = node {
      let mut node = node.borrow_mut();
      if node.left.is_none() && node.right.is_none() && sum + node.val == target || dfs(node.left.take(), sum + node.val, target) || dfs(node.right.take(), sum + node.val, target) {
        return true;
      }
    }
    false
  }
  dfs(root, 0, target_sum)
}

pub fn run() -> bool {
    let data = TreeNode::<i32>::deserialize("4,2,7,1,3".to_string());
    has_path_sum(data, 5)
}
