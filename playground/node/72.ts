function minDistance(word1: string, word2: string) {
  const characters = Array.from(new Set(Array.from(word2)));
  const operations = ['insert', 'delete', 'replace'] as const;
  const ret: number[] = [];
  const cache: string[] = [];

  function check(words: string[], times: number) {
    const word = words.join('');
    if (word === word2) return void ret.push(times);
    if (word.length > word2.length) return;
    if (!cache.includes(word)) run(word, times);
  }

  function run(current: string, times: number) {
    cache.push(current);
    const list = Array.from(current);
    [...list, ''].forEach((item, index) => {
      const currentTime = times + 1;
      operations.forEach(operation => {
        const words = [...list];
        if (operation === 'delete' && item) {
          words[index] = '';
          check(words, currentTime);
        }
        else {
          characters.forEach(char => {
            switch (operation) {
              case 'replace':
                if (item && char !== item) words[index] = char;
                break;
              case 'insert':
                words.splice(index, 0 , char);
                break;
              default:
                break;
            }
            check(words, currentTime);
          });
        }
      });
    });
  };
  run(word1, 0);
  return Math.min.apply(null, ret);
};

console.log(minDistance('w', 'wo'));