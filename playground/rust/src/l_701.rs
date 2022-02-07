use super::tree_builder::*;

pub fn insert_into_bst(root: Option<Rc<RefCell<TreeNode<i32>>>>, val: i32) -> Option<Rc<RefCell<TreeNode<i32>>>> {
  if let Some(n) = root.clone() {
    let mut n = n.borrow_mut();
    // 比当前节点的值大
    if val > n.val {
      n.right = insert_into_bst(n.right.take(), val);
    // 比当前节点的值小
    } else {
      n.left = insert_into_bst(n.left.take(), val);
    }
    // 返回当前节点
    return root;
  }
  return TreeNode::new_node(val);
}

pub fn run() -> String {
    let data = TreeNode::<i32>::deserialize("4,2,7,1,3".to_string());
    TreeNode::<i32>::serialize(insert_into_bst(data, 5))
}
