/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
	let ret = 0;
	const sink = (x, y) => {
		// y轴越界
		if (y < 0 || y >= grid.length) return;
		// x轴越界
		if (x < 0 || x >= grid[y].length) return;
		// 已经是非岛屿地区
		if (grid[y][x] === '0') return;
		// 沉没此点
		grid[y][x] = '0';
		// dfs上下左右四个点
		sink(x + 1, y);
		sink(x - 1, y);
		sink(x, y + 1);
		sink(x, y - 1);
	};
	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[y].length; x++) {
			if (grid[y][x] === '1') {
				ret += 1;
				sink(x, y);
			}
		}
	}
	return ret;
};
