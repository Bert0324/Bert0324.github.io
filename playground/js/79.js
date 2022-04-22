/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
    const visited = board.map(line => line.map(() => false));
    const check = (position, words) => {
        const [y, x] = position;
        const char = board[y][x];
        if (char !== words[0]) return false;
        const arr = Array.from(words);
        arr.shift();
        if (!arr.length) return true;
        visited[y][x] = true;
        const positions = [[y - 1, x], [y, x - 1], [y + 1, x], [y, x + 1]].filter(v => board[v[0]]?.[v[1]] !== undefined && !visited[v[0]][v[1]]);
        for (let i = 0; i < positions.length; i++) {
            const exist = check(positions[i], arr.join(''));
            if (exist) {
                visited[y][x] = false;
                return true;
            }
        }
        visited[y][x] = false;
        return false;
    };
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            const exist = check([y, x], word);
            if (exist) return true;
        }
    }
    return false;
};