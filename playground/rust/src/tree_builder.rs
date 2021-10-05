pub use std::rc::Rc;
pub use std::cell::RefCell;

#[allow(dead_code)]
pub enum TreeNodeDirection {
  Left,
  Right
}

/// 二叉树
#[derive(Debug)]
pub struct TreeNode<T> {
  /// 值
  pub val: T,
  /// 左节点
  pub left: Option<Rc<RefCell<TreeNode<T>>>>,
  /// 右节点
  pub right: Option<Rc<RefCell<TreeNode<T>>>>,
}

impl<T> TreeNode<T> {
  /// 创建新节点
  pub fn new(val: T) -> Self {
    TreeNode {
      val,
      left: None,
      right: None,
    }
  }
  
  /// 创建新wrapped节点
  #[allow(dead_code)]
  pub fn new_node(val: T) -> Option<Rc<RefCell<TreeNode<T>>>> {
    Some(Rc::from(RefCell::from(Self::new(val))))
  }

  /// wrap节点
  #[allow(dead_code)]
  pub fn wrap_node(node: TreeNode<T>) -> Option<Rc<RefCell<TreeNode<T>>>> {
    Some(Rc::from(RefCell::from(node)))
  }

  /// 增加节点
  #[allow(dead_code)]
  pub fn append(&mut self, direction: TreeNodeDirection, node: TreeNode<T>) -> &mut Self {
    let wrapped = Rc::from(RefCell::from(node));
    match direction {
      TreeNodeDirection::Left => {
        self.left = Some(wrapped);
      },
      TreeNodeDirection::Right => {
        self.right = Some(wrapped);
      }
    }
    return self;
  }

  /// 删除节点
  #[allow(dead_code)]
  pub fn delete(&mut self, direction: TreeNodeDirection) -> &mut Self {
    match direction {
      TreeNodeDirection::Left => {
        self.left = None;
      },
      TreeNodeDirection::Right => {
        self.right = None;
      }
    }
    return self;
  }
}

