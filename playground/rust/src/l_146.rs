use std::collections::HashMap;
use std::rc::Rc;
use std::cell::RefCell;

#[derive(Debug)]
struct LinkedNode {
  key: i32,
  value: i32,
  prev: Option<Rc<RefCell<LinkedNode>>>,
  next: Option<Rc<RefCell<LinkedNode>>>
}

#[derive(Debug)]
struct LinkedList {
  size: i32,
  head: LinkedNode,
  tail: LinkedNode
}

impl LinkedList {
  fn new(&self) -> Self {
    self.size = 0;
    self.head = LinkedNode {
      key: -1,
      value: -1,
      prev: None,
      next: None
    };
    self.tail = LinkedNode {
      key: -1,
      value: -1,
      prev: None,
      next: None
    };
    self.head.next = Some(Rc::from(RefCell::from(self.tail)));
    self.tail.prev = Some(Rc::from(RefCell::from(self.head)));
    *self
  }

  fn add_to_head(&self, node: Rc<RefCell<LinkedNode>>) {
    
  }

  fn remove_node(&self, node: Rc<RefCell<LinkedNode>>) {
    let unwrap = node.borrow().next.unwrap().borrow().prev;
  }

  fn move_to_head(&self, node: Rc<RefCell<LinkedNode>>) {
    self.add_to_head(node);
    self.remove_node(node);
  }

  fn remove_tail(&self, node: Rc<RefCell<LinkedNode>>) -> Rc<RefCell<LinkedNode>> {
    let last = self.tail.prev.unwrap();
    self.remove_node(last);
    last
  }
}

#[derive(Debug)]
struct LRUCache {

}

/**
 * `&self` means the method takes an immutable reference.
 * If you need a mutable reference, change it to `&mut self` instead.
 */
impl LRUCache {

    fn new(capacity: i32) -> Self {

    }
    
    fn get(&self, key: i32) -> i32 {

    }
    
    fn put(&self, key: i32, value: i32) {

    }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * let obj = LRUCache::new(capacity);
 * let ret_1: i32 = obj.get(key);
 * obj.put(key, value);
 */

pub fn run() -> LRUCache {
  let capacity = 10;
  let mut obj = LRUCache::new(capacity);
  obj.put(1, 1);
  obj.get(2);
  return obj;
}