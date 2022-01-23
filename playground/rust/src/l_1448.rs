use super::tree_builder::*;

pub fn good_nodes(root: Option<Rc<RefCell<TreeNode<i32>>>>) -> i32 {
    if root.is_none() {
        return 0;
    }
    fn dfs(node: Option<Rc<RefCell<TreeNode<i32>>>>, ret: &mut Vec<bool>, max: i32) {
        if let Some(unwrapped_node) = node {
            let left = unwrapped_node.borrow_mut().left.take();
            let right = unwrapped_node.borrow_mut().right.take();
            let value = unwrapped_node.borrow().val;
            let good_node = value >= max;
            if good_node {
                ret.push(true);
            }
            dfs(left, ret, if good_node { value } else { max });
            dfs(right, ret, if good_node { value } else { max });
        }
    }
    let mut ret = vec![];
    dfs(root, &mut ret, i32::MIN);
    ret.len() as i32
}

pub fn run() -> i32 {
    let data = TreeNode::<i32>::deserialize("3,1,4,3,x,1,5".to_string());
    good_nodes(data)
}
