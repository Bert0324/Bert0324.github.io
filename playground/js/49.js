/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
    const cache = {};
    strs.forEach(str => {
        const key = Array.from(str).sort().join('');
        if (!cache[key]) cache[key] = [];
        cache[key].push(str);
    });
    return Object.keys(cache).reduce((acc, key) => {
        acc.push(cache[key]);
        return acc;
    }, []);
};