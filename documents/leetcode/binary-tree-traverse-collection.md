# Binary Tree Traverse Collection

树是图的一个子集，二叉树是树的一个子集。

因此相对来说，套路还是比较集中的，leetcode上的题目也很多，所以在这做一个专题集。

## Basic Traverse

绝大部分树的算法都可以基于暴力遍历来去解决，所以遍历方式即是基础中的基础。

既然是图，那么二叉树的遍历也是分为bfs和dfs这两种最基本的方式。

### DFS

DFS写出来的代码总是比BFS的短很多，这也是为什么我一直觉得DFS比BFS简单的原因。

不过其实，两者的本质都是要依托于数据结构。DFS使用了栈的数据结构，在一条树的线路上入栈到底，然后出栈计算，然后继续入栈。而刚好对于大部分的编程语言而言，函数调用即是以栈的形式。

时间复杂度O(n), 空间复杂度O(n). 首先，每个节点都要被遍历一次，内存开销主要是函数栈的开销，平均情况下为 O(log n)，最坏情况下树呈现链状，为 O(n).

```rs
fn dfs<F: FnMut(i32)>(_root: Option<Rc<RefCell<TreeNode<i32>>>>, cb: &mut F) {
    if let Some(n) = _root {
        let node = n.borrow();
        cb(node.val);
        dfs(node.left.clone(), cb);
        dfs(node.right.clone(), cb);
    }
}
```

### BFS

BFS使用了队列的数据结构。每一次的节点都会在被遍历的同时，把自己的子节点推入队列，根据队列FIFO的特点，会在本层的节点都完成之后，再进行下一层的节点，所以可以以层的顺序去遍历。

时间复杂度O(n), 空间复杂度O(n).

```rs
fn bfs<F: FnMut(i32)>(root: Option<Rc<RefCell<TreeNode>>>, cb: &mut F) {
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

### from tree level order

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

No.102, source: <https://leetcode.com/problems/binary-tree-level-order-traversal/>
No.107, source: <https://leetcode.com/problems/binary-tree-level-order-traversal-ii/>

二叉树的层次遍历，其实和构建二叉树是一样的，而且更简单。dfs和bfs都可以，但是感觉用bfs会更加自然。

如果是从bottom开始，只要reverse一下从top开始的结果就可以。

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

### preorder

No.144, source: <https://leetcode.com/problems/binary-tree-preorder-traversal/>

preorder: 根在前，从左往右，一棵树的根永远在左子树前面，左子树又永远在右子树前面 

栈符合前序遍历的要求，先进后出，深度到底。

值得一提的是，如果不用函数栈，即递归的形式，那么可以自己构造栈，把右节点先入栈，左边一口气到底, 个人感觉虽然比递归代码量大，但是更加的直观。

```rs
pub fn preorder_traversal(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<i32> {
  let mut ret = vec![];
  let mut stack = vec![root];
  while let Some(node) = stack.pop() {
    if let Some(n) = node {
      let borrow_node = n.borrow_mut();
      ret.push(borrow_node.val);
      stack.push(borrow_node.right.clone());
      stack.push(borrow_node.left.clone());
    }
  }
  return ret;
}
```

### inorde

No.94, source: <https://leetcode.com/problems/binary-tree-inorder-traversal/>

inorder: 根在中，从左往右，一棵树的左子树永远在根前面，根永远在右子树前面.

递归实现比较简单，比较难的是用自己用栈结构实现。

思路是对于**一个节点**而言，要先把所有的左节点都入栈，然后在出栈的过程中，收集值然后再把右节点入栈。

```rs
pub fn inorder_traversal(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<i32> {
  let mut ret = vec![];
  let mut stack = vec![];
  let mut current_root_wrap = root;

  while current_root_wrap.is_some() || !stack.is_empty() {
    while let Some(node) = current_root_wrap {
      current_root_wrap = node.borrow().left.clone();
      stack.push(node);
    }
    if let Some(node) = stack.pop() {
      ret.push(node.borrow().val);
      current_root_wrap = node.borrow().right.clone();
    }
  }

  return ret;
}
```

### postorder

No. 145, source: <https://leetcode.com/problems/binary-tree-postorder-traversal/>

postorder: 根在后，从左往右，一棵树的左子树永远在右子树前面，右子树永远在根前面.

值得一提的是，前序稍微改一下然后reverse，就是后序：

```txt
前序：中 -> 左 -> 右
稍微改一下前序顺序: 中 -> 右 -> 左
然后翻转: 左 -> 右 -> 中
```

用栈结构实现是前中后最难的：左节点一撸到底，然后去检查右节点，每个节点处理完就值为空，当右节点也不存在时，就可以把此时的节点值推入。

```rs
pub fn postorder_traversal(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<i32> {
    let mut ret = vec![];
    let mut stack = vec![];
    let mut current_root_wrap = root;

    while current_root_wrap.is_some() || !stack.is_empty() {
        while let Some(node) = current_root_wrap {
            current_root_wrap = node.borrow_mut().left.take();
            stack.push(node);
        }
        if let Some(node) = stack.pop() {
            if node.borrow().right.is_some() {
                current_root_wrap = node.borrow_mut().right.take();
                stack.push(node);
            } else {
                ret.push(node.borrow().val);
            }
        }
    }
    ret
}
```

### zigzag level order

No.103, source: <https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/>

其实是层序遍历的变种，只要每行reverse数组即可。

```rs
pub fn zigzag_level_order(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<Vec<i32>> {
    use std::collections::VecDeque;

    let mut ret = vec![];
    if root.is_none() {
        return ret;
    }
    let mut queue = VecDeque::<Option<Rc<RefCell<TreeNode>>>>::new();
    queue.push_front(root);
    let mut current_level = 0;
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
            if current_level % 2 == 0 {
                ret.push(level_arr);
            } else {
                level_arr.reverse();
                ret.push(level_arr);
            }
        }
        current_level = current_level + 1;
    }
    ret
}
```

### vertical order

No. 987, source: <https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/>

记录下各节点坐标，然后进行数组遍历，算出结果。这题的特性，用dfs去做会更加的简便。

```rs
    let mut node_coordinate: Vec<(i32, i32, i32)> = Vec::new();
    let mut ans: Vec<Vec<i32>> = Vec::new();
    let mut last_col = i32::MIN;

    fn dfs(
        root: Option<Rc<RefCell<TreeNode<i32>>>>,
        (row, col): (i32, i32),
        node_coordinate: &mut Vec<(i32, i32, i32)>,
    ) {
        let left = root.as_ref().unwrap().borrow_mut().left.take();
        let right = root.as_ref().unwrap().borrow_mut().right.take();
        let value = root.as_ref().unwrap().borrow().val;

        node_coordinate.push((row, col, value));
        if left.is_some() {
            dfs(left, (row + 1, col - 1), node_coordinate);
        }
        if right.is_some() {
            dfs(right, (row + 1, col + 1), node_coordinate);
        }
    }
    dfs(root, (0, 0), &mut node_coordinate);
    node_coordinate.sort_unstable_by(|a, b| {
        if a.1 != b.1 {
            a.1.cmp(&b.1)
        } else if a.0 != b.0 {
            a.0.cmp(&b.0)
        } else {
            a.2.cmp(&b.2)
        }
    });

    for (_row, col, val) in node_coordinate {
        if last_col != col {
            ans.push(Vec::new());
            last_col = col;
        }
        ans.last_mut().unwrap().push(val);
    }

    ans
```

## 总结


