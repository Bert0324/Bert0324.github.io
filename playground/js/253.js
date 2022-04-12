/**
 * @param {number[][]} intervals
 * @return {number}
 */
var minMeetingRooms = function (intervals) {
    let ret = 0;
    // 对会议开始的时间排序
    intervals.sort((a, b) => a[0] - b[0]);
    while (intervals.length) {
        // 分配一个新的会议室
        ret += 1;
        let p1 = 0;
        let p2 = 1;
        // 新会议室第一个肯定可以分配
        const remove = [p1];
        while (p2 < intervals.length) {
            const [start] = intervals[p2];
            // 下一次会议开始的时间要大于上一次会议结束的时间
            if (start >= intervals[p1][1]) {
                p1 = p2;
                remove.push(p1);
            }
            p2 += 1;
        }
        intervals = intervals.filter((_, index) => !remove.includes(index));
    }
    return ret;
};