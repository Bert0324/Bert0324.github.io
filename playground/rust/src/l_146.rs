use std::cell::RefCell;
use std::collections::HashMap;
use std::rc::Rc;

#[derive(Debug)]
struct LinkedNode {
  key: i32,
  value: i32,
  prev: Option<Rc<RefCell<LinkedNode>>>,
  next: Option<Rc<RefCell<LinkedNode>>>,
}

#[derive(Debug)]
struct LinkedList {
  size: i32,
  head: Option<Rc<RefCell<LinkedNode>>>,
  tail: Option<Rc<RefCell<LinkedNode>>>,
}

fn wrap<T>(node: T) -> Option<Rc<RefCell<T>>> {
  return Some(Rc::from(RefCell::from(node)));
}

impl LinkedList {
  /**
   * - create dummy head and dummy tail
   * - link dummy head and dummy tail
   */
  fn new() -> Self {
    let head = wrap(LinkedNode {
      key: -1,
      value: -1,
      prev: None,
      next: None,
    });
    let tail = wrap(LinkedNode {
      key: -1,
      value: -1,
      prev: None,
      next: None,
    });
    head.clone().unwrap().borrow_mut().next = tail.clone();
    tail.clone().unwrap().borrow_mut().prev = head.clone();
    LinkedList {
      size: 0,
      head,
      tail,
    }
  }

  fn add_to_head(&mut self, node: Rc<RefCell<LinkedNode>>) {
    node.borrow_mut().prev = self.head.clone();
    node.borrow_mut().next = self.head.clone().unwrap().borrow().next.clone();
    self
      .head
      .clone()
      .unwrap()
      .borrow_mut()
      .next
      .clone()
      .unwrap()
      .borrow_mut()
      .prev = Some(node.clone());
    self.head.clone().unwrap().borrow_mut().next = Some(node.clone());
    self.size += 1;
  }

  fn remove_node(&mut self, node: Rc<RefCell<LinkedNode>>) {
    node
      .clone()
      .borrow()
      .prev
      .clone()
      .unwrap()
      .borrow_mut()
      .next = node.clone().borrow().next.clone();
    node
      .clone()
      .borrow()
      .next
      .clone()
      .unwrap()
      .borrow_mut()
      .prev = node.clone().borrow().prev.clone();
    self.size -= 1;
  }

  fn move_to_head(&mut self, node: Rc<RefCell<LinkedNode>>) {
    self.remove_node(node.clone());
    self.add_to_head(node.clone());
  }

  fn remove_tail(&mut self) -> Rc<RefCell<LinkedNode>> {
    let last = self.tail.clone().unwrap().borrow().prev.clone().unwrap();
    self.remove_node(last.clone());
    last.clone()
  }
}

#[derive(Debug)]
pub struct LRUCache {
  list: LinkedList,
  capacity: i32,
  cache: HashMap<i32, Option<Rc<RefCell<LinkedNode>>>>,
}

/**
 * `&self` means the method takes an immutable reference.
 * If you need a mutable reference, change it to `&mut self` instead.
 */
impl LRUCache {
  fn new(capacity: i32) -> Self {
    LRUCache {
      capacity: capacity,
      cache: HashMap::new(),
      list: LinkedList::new(),
    }
  }

  fn get(&mut self, key: i32) -> i32 {
    let v = self.cache.get(&key);
    if !v.is_none() {
      if let Some(node) = v.unwrap() {
        self.list.move_to_head(node.clone());
        return node.clone().borrow().value;
      }
    }
    return -1;
  }

  fn put(&mut self, key: i32, value: i32) {
    let v = self.cache.get(&key);
    if !v.is_none() {
      if let Some(node) = v.unwrap() {
        node.clone().borrow_mut().value = value;
        self.list.move_to_head(node.clone());
        return;
      }
    }
    let node = wrap(LinkedNode {
      key,
      value,
      prev: None,
      next: None,
    });
    self.list.add_to_head(node.clone().unwrap());
    self.cache.insert(key, node.clone());
    if self.list.size > self.capacity {
      let removed_node = self.list.remove_tail();
      self.cache.remove(&removed_node.clone().borrow().key);
    }
  }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * let obj = LRUCache::new(capacity);
 * let ret_1: i32 = obj.get(key);
 * obj.put(key, value);
 */

pub fn run() {
  let capacity = 10;
  let mut obj = LRUCache::new(capacity);
  obj.put(1, 1);
  obj.get(2);
  // return obj;
}
