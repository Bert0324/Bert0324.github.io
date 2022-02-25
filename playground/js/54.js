/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  const m = matrix.length,
    n = matrix[0].length,
    ret = [],
    // 已遍历的x轴
    passX = [],
    // 已遍历的y轴
    passY = [];
  let order = 0,
    x = 0,
    y = 0;
  while (ret.length !== m * n) {
    if (matrix[y]?.[x] !== undefined) ret.push(matrix[y][x]);
    // 下一个点
    switch (order) {
      // right
      case 0:
        if (x === n - 1 || passX.includes(x + 1)) {
          passY.push(y);
          order = (order + 1) % 4;
          y += 1;
        } else {
          x += 1;
        }
        break;
      // down
      case 1:
        if (y === m - 1 || passY.includes(y + 1)) {
          passX.push(x);
          order = (order + 1) % 4;
          x -= 1;
        } else {
          y += 1;
        }
        break;
      // left
      case 2:
        if (x === 0 || passX.includes(x - 1)) {
          passY.push(y);
          order = (order + 1) % 4;
          y -= 1;
        } else {
          x -= 1;
        }
        break;
      // up
      case 3:
        if (y === 0 || passY.includes(y - 1)) {
          passX.push(x);
          order = (order + 1) % 4;
          x += 1;
        } else {
          y -= 1;
        }
        break;
      default:
        break;
    }
  }
  return ret;
};
