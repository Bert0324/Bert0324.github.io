/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var findKthNumber = function (n, k) {
  const getCount = prefix => {
    let cur = prefix;
    let next = prefix + 1; //下一个前缀
    let count = 0;
    //当前的前缀当然不能大于上界
    while (cur <= n) {
      count += Math.min(n + 1, next) - cur; //下一个前缀的起点减去当前前缀的起点
      cur *= 10;
      next *= 10;
      // 如果说刚刚prefix是1，next是2，那么现在分别变成10和20
      // 1为前缀的子节点增加10个，十叉树增加一层, 变成了两层

      // 如果说现在prefix是10，next是20，那么现在分别变成100和200，
      // 1为前缀的子节点增加100个，十叉树又增加了一层，变成了三层
    }
    return count; //把当前前缀下的子节点和返回去。
  };

  let p = 1; //作为一个指针，指向当前所在位置，当p==k时，也就是到了排位第k的数
  let prefix = 1; //前缀
  while (p < k) {
    let count = getCount(prefix); //获得当前前缀下所有子节点的和
    if (p + count > k) {
      //第k个数在当前前缀下
      prefix *= 10;
      p++; //把指针指向了第一个子节点的位置，比如11乘10后变成110，指针从11指向了110
    } else if (p + count <= k) {
      //第k个数不在当前前缀下
      prefix++;
      p += count; //注意这里的操作，把指针指向了下一前缀的起点
    }
  }
  return prefix;
};
