use super::tree_builder::*;

static NULL: &str = "x";
static SEPARATOR: &str = ",";
use std::collections::VecDeque;
struct Codec {}
/** 
 * `&self` means the method takes an immutable reference.
 * If you need a mutable reference, change it to `&mut self` instead.
 */
impl Codec {
    
    fn new() -> Self {
        Self {}
    }

    fn serialize(&self, root: Option<Rc<RefCell<TreeNode<i32>>>>) -> String {
        let mut ret = vec![];
        let mut queue = VecDeque::<Option<Rc<RefCell<TreeNode<i32>>>>>::new();
        queue.push_front(root);

        while !queue.is_empty() {
            if let Some(node) = queue.pop_front() {
                if let Some(unwrapped_node) = node {
                    let borrow_unwrapped_node = unwrapped_node.borrow();
                    ret.push(borrow_unwrapped_node.val.to_string());
                    queue.push_back(borrow_unwrapped_node.left.clone());
                    queue.push_back(borrow_unwrapped_node.right.clone());
                } else {
                    ret.push(NULL.to_string());
                }
            }
        }

        let mut finished = false;
        while !finished {
            if let Some(v) = ret.pop() {
                if v != NULL {
                    finished = true;
                    ret.push(v);
                }
            } else {
                finished = true;
            }
        }

        return ret.join(SEPARATOR);
    }
	
    fn deserialize(&self, data: String) -> Option<Rc<RefCell<TreeNode<i32>>>> {
        if data == "" {
            return None;
        }

        let list: Vec<&str> = data.split(SEPARATOR).collect();
        let nodes: Vec<Option<Rc<RefCell<TreeNode<i32>>>>> = list.iter().map(|item| {
            if *item == NULL {
                return None;
            }
            return TreeNode::new_node(item.parse::<i32>().unwrap());
        }).collect();
        let mut queue = VecDeque::<usize>::new();
        queue.push_back(0);

        let mut cursor = 1;
        while !queue.is_empty() {
            if let Some(index) = queue.pop_front() {
                if let Some(unwrapped_node) = nodes[index].clone() {
                    let mut borrow_unwrapped_node = unwrapped_node.borrow_mut();
                    if nodes.get(cursor).is_some() {
                        borrow_unwrapped_node.left = nodes[cursor].clone();
                        queue.push_back(cursor);
                    }
                    if nodes.get(cursor + 1).is_some() {
                        borrow_unwrapped_node.right = nodes[cursor + 1].clone();
                        queue.push_back(cursor + 1);
                    }
                 }
            }
            cursor += 2;
        }
        return nodes[0].clone();
    }
}

impl<T> TreeNode<T> {
    #[allow(dead_code)]
    pub fn serialize(root: Option<Rc<RefCell<TreeNode<i32>>>>) -> String {
        let obj = Codec::new();
        return obj.serialize(root);
    }

    #[allow(dead_code)]
    pub fn deserialize(data: String) -> Option<Rc<RefCell<TreeNode<i32>>>> {
        let obj = Codec::new();
        return obj.deserialize(data);
    }
}

pub fn run() -> String {
    let source = String::from("1,2,3,x,x,4,5,x,x,x,x,1,2,2,3");
    let obj = Codec::new();
    let data = obj.deserialize(source);
    println!("{:?}", data);
    return obj.serialize(data);
}
