/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
    const groups = Array.from(s.match(/\S+/g));
    return groups.reverse().join(' ');
};

/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
    const ret = [];
    let p1 = 0, p2 = 0, word = '';
    while (p2 < s.length) {
        const char = s[p2];
        if (char !== ' ') {
            p2 += 1;
            p1 = p2;
            word += char;
        } else {
            if (p1 === p2) {
                ret.push(word);
                word = '';
            }
            p2 += 1;
        }
    }
    ret.push(word);
    return ret.filter(Boolean).reverse().join(' ');
};