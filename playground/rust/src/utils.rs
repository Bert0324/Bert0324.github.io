#[allow(dead_code)]
pub fn compare<T>(a: &T, b: &T) -> bool {
    let r = a as *const _ == b as *const _;
    return r;
}
