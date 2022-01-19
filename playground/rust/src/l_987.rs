use super::tree_builder::*;

#[allow(dead_code)]
pub fn vertical_traversal(root: Option<Rc<RefCell<TreeNode<i32>>>>) -> Vec<Vec<i32>> {
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
}

pub fn run() -> Vec<Vec<i32>> {
    let data = TreeNode::<i32>::deserialize("3,9,20,x,x,15,7".to_string());
    vertical_traversal(data)
}
