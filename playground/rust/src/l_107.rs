use super::l_102::level_order_bfs;
use super::tree_builder::*;

pub fn level_order_bottom(root: Option<Rc<RefCell<TreeNode<i32>>>>) -> Vec<Vec<i32>> {
  let mut v = level_order_bfs(root);
  v.reverse();
  v
}

pub fn run() -> Vec<Vec<i32>> {
  let data = TreeNode::<i32>::deserialize("3,9,20,x,x,15,7".to_string());
  level_order_bottom(data)
}
