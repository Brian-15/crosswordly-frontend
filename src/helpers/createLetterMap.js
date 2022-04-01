function createLetterMap(word) {
  const map = {};
  word.split("").forEach(letter => {
    if (map[letter] !== undefined) {
      map[letter].total++;
    } else {
      map[letter] = { total: 1, count: 0 };
    }
  });
  return map;
}

export default createLetterMap;