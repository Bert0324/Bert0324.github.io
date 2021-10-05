# Binary Tree Traverse Collection

树是图的一个子集，二叉树是树的一个子集。

因此相对来说，套路还是比较集中的，leetcode上的题目也很多，所以在这做一个专题集。

## Basic Traverse

绝大部分树的算法都可以基于暴力遍历来去解决，所以遍历方式即是基础中的基础。

既然是图，那么二叉树的遍历也是分为bfs和dfs这两种最基本的方式。

### DFS

DFS写出来的代码总是比BFS的短很多，这也是为什么我一直觉得DFS比BFS简单的原因。

不过其实，两者的本质都是要依托于数据结构。DFS使用了栈的数据结构，在一条树的线路上入栈到底，然后出栈计算，然后继续入栈。而刚好对于大部分的编程语言而言，

```rs
fn dfs<F: FnOnce(i32)>(root: Option<Rc<RefCell<TreeNode>>>, cb: F) {
    if let Some(n) = root {
        let node = n.borrow();
        cb(node.val);
        dfs(node.left.clone());
        dfs(node.right.clone());
    }
}
```

### BFS

BFS使用了队列的数据结构。每一次的节点都会在被遍历的同时，把自己的子节点推入队列，根据队列FIFO的特点，会在本层的节点都完成之后，再进行下一层的节点，所以可以以层的顺序去遍历。

```rs
fn bfs<F: FnOnce(i32)>(root: Option<Rc<RefCell<TreeNode>>>, cb: F) {
    use std::collections::VecDeque;
    if root.is_none() {
        return;
    }
    let mut queue = VecDeque::<Option<Rc<RefCell<TreeNode>>>>::new();
    queue.push_front(root);

    while !queue.is_empty() {
        if let Some(node) = queue.pop_front() {
            if let Some(unwrapped_node) = node {
                let borrow_unwrapped_node = unwrapped_node.borrow();
                cb(borrow_unwrapped_node.val);
                queue.push_back(borrow_unwrapped_node.left.clone());
                queue.push_back(borrow_unwrapped_node.right.clone());
            }
        }
    }
}
```

## BST Serialization

No.297, source: <https://leetcode.com/problems/serialize-and-deserialize-binary-tree/>

为方便二叉树的测试，所以先选取了二叉树的构建这一道题目。这道题目其实和二叉树的层次遍历非常相似。

序列化就是正常的bfs，只要注意把数组尾部多余的空值清空就好。

值得注意的是反序列化，如何跟着一个数组去构建树。这里是使用了一个指针，每遍历一个节点，就把他的子节点推入队列，同时根据指针从数组中获取值。完成之后，因为一个二叉树有两个节点，所以指针+2。

```rs
use std::collections::VecDeque;
static NULL_LOCAL: &str = "x";
static SEPARATOR_LOCAL: &str = ",";
struct Codec {}
impl Codec {
    
    fn new() -> Self {
        Self {}
    }

    fn serialize(&self, root: Option<Rc<RefCell<TreeNode>>>) -> String {
        let mut ret = vec![];
        let mut queue = VecDeque::<Option<Rc<RefCell<TreeNode>>>>::new();
        queue.push_front(root);

        while !queue.is_empty() {
            if let Some(node) = queue.pop_front() {
                if let Some(unwrapped_node) = node {
                    let borrow_unwrapped_node = unwrapped_node.borrow();
                    ret.push(borrow_unwrapped_node.val.to_string());
                    queue.push_back(borrow_unwrapped_node.left.clone());
                    queue.push_back(borrow_unwrapped_node.right.clone());
                } else {
                    ret.push(NULL_LOCAL.to_string());
                }
            }
        }

        let mut finished = false;
        while !finished {
            if let Some(v) = ret.pop() {
                if v != NULL_LOCAL {
                    finished = true;
                    ret.push(v);
                }
            } else {
                finished = true;
            }
        }

        return format!("[{}]", ret.join(SEPARATOR_LOCAL));
    }

    fn deserialize(&self, data: String) -> Option<Rc<RefCell<TreeNode>>> {
        if data == "[]" {
            return None;
        }
        let raw_str = data.replace("[", "").replace("]", "");
        let list: Vec<&str> = raw_str.split(SEPARATOR_LOCAL).collect();
        let nodes: Vec<Option<Rc<RefCell<TreeNode>>>> = list.iter().map(|item| {
            if item == &NULL_LOCAL {
                return None;
            }
            Some(Rc::from(RefCell::from(TreeNode {
                val: item.parse::<i32>().unwrap(),
                left: None,
                right: None,
            })))
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
                cursor += 2;
            }
        }
        return nodes[0].clone();
    }
}
```

## Traverse Order

### tree level order

source: <https://leetcode.com/problems/binary-tree-level-order-traversal/>

二叉树的层次遍历，其实和构建二叉树是一样的，而且更简单。dfs和bfs都可以，但是感觉用bfs会更加自然。

```rs
pub fn level_order(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<Vec<i32>> {
    use std::collections::VecDeque;

    let mut ret = vec![];
    if root.is_none() {
        return ret;
    }
 
    let mut queue = VecDeque::<Option<Rc<RefCell<TreeNode>>>>::new();
    queue.push_front(root);
    while !queue.is_empty() {
        let num = queue.len() as i32;
        let mut level_arr = vec![];
        let mut i = 0;
        while i < num {
            i += 1;
            if let Some(node) = queue.pop_front() {
                if let Some(unwrapped_node) = node {
                    let borrow_unwrapped_node = unwrapped_node.borrow();
                    level_arr.push(borrow_unwrapped_node.val); 
                    queue.push_back(borrow_unwrapped_node.left.clone());
                    queue.push_back(borrow_unwrapped_node.right.clone());
                }
            }
        }
        if level_arr.len() != 0 {
            ret.push(level_arr);
        }
    }
    return ret;
}
```

### tree level order from bottom

source: <https://leetcode.com/problems/binary-tree-level-order-traversal-ii/>

### preorder

source: <https://leetcode.com/problems/binary-tree-preorder-traversal/>

### inorde

source: <https://leetcode.com/problems/binary-tree-inorder-traversal/>

### postorder

source: <https://leetcode.com/problems/binary-tree-postorder-traversal/>

## 总结
