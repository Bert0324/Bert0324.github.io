/**
 * @param {number} num
 * @return {string}
 */
var numberToWords = function (num) {
    if (num === 0) return 'Zero';
    // 2**31- 1, 最多到2 Billion +
    const units = ['Thousand', 'Million', 'Billion'];
    // 数字对应规则
    const numUnits = {
        '0': '',
        '1': 'One',
        '2': 'Two',
        '3': 'Three',
        '4': 'Four',
        '5': 'Five',
        '6': 'Six',
        '7': 'Seven',
        '8': 'Eight',
        '9': 'Nine',
        '10': 'Ten',
        '11': 'Eleven',
        '12': 'Twelve',
        '13': 'Thirteen',
        '14': 'Fourteen',
        '15': 'Fifteen',
        '16': 'Sixteen',
        '17': 'Seventeen',
        '18': 'Eighteen',
        '19': 'Nineteen',
        '20': 'Twenty',
        '30': 'Thirty',
        '40': 'Forty',
        '50': 'Fifty',
        '60': 'Sixty',
        '70': 'Seventy',
        '80': 'Eighty',
        '90': 'Ninety',
        '100': 'Hundred',
    };
    // 解析两位数字
    const doubleDigitToText = (doubleDigit) => {
        const n = `${Number(doubleDigit)}`;
        if (numUnits[n] !== undefined) return numUnits[n];
        return `${numUnits[`${n[0]}0`]} ${numUnits[`${n[1]}`]}`;
    };
    // 解析三位数字
    const threeDigitToText = (threeDigit) => {
        const n = `${Number(threeDigit)}`;
        if (n.length !== 3) return doubleDigitToText(n);
        return `${numUnits[n[0]]} ${numUnits['100']} ${doubleDigitToText(`${n[1]}${n[2]}`)}`
    };
    // 将数字按3位拆分
    const groups = `${num}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,").split(',');
    return groups.reverse().reduce((acc, crr, index) => {
        const ret = threeDigitToText(crr);
        // 如果是有效数字，才能带上单位
        const unit = ret ? units[index - 1] || '' : '';
        return `${ret} ${unit} ${acc}`;
    }, '').split(' ').filter(Boolean).join(' ');
};

/**
 * @param {number} num
 * @return {string}
 */
var numberToWords = function (num) {
    if (num === 0) return '零';
    const units = ['', '万', '亿'];
    const innerUnits = ['', '十', '百', '千'];
    const numUnits = {
        '0': '',
        '1': '一',
        '2': '二',
        '3': '三',
        '4': '四',
        '5': '五',
        '6': '六',
        '7': '七',
        '8': '八',
        '9': '九',
    };
    const fourDigitToText = (digit) => {
        const text = `${Number(digit)}`;
        return Array.from(text).reverse().map((n, index) => {
            const v = numUnits[n];
            return `${v}${v ? innerUnits[index] : ''}`;
        }).reverse().join('');
    };
    const groups = `${num}`.replace(/(\d)(?=(\d{4})+(?!\d))/g, "$1,").split(',');
    return groups.reverse().reduce((acc, crr, index) => {
        const text = fourDigitToText(crr);
        const unit = text ? units[index] || '' : '';
        return `${text}${unit}${acc}`;
    }, '').split(' ').filter(Boolean).join(' ');
};