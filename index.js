const fs = require('fs')

const path = __dirname + '/keywords'

let map = new Map();

let lineReader = require('readline').createInterface({
  input: fs.createReadStream(path, { encoding: 'UTF-8' })
});

lineReader.on('line', line => {
  if (!line) return
  addWord(line)
});


let addWord = word => {
  let parent = map

  for (let i = 0; i < word.length; i++) {
    let char = word[i]
    if (!parent.has(char)) {
      parent.set(char, new Map())
    }
    parent = parent.get(char)
  }
  parent.set('isEnd', true)
}

let getMap = async s => {
  return new Promise((res) => {
    lineReader.on('close', () => res(map))
  })
}

let filter = async s => {
  let parent = map.size > 0 ? map : await getMap()
  // 敏感词收集
  let words = []

  for (let i = 0; i < s.length; i++) {
    let word = ''
    let sWord = ''

    for (let j = i; j < s.length; j++) {
      let char = s[j]
      // 一次对比敏感词结束，收集要替换的敏感词
      if (!parent.has(char)) {
        parent = map
        // 去重，去空
        if (!words.includes(word) && word.length > 0) {
          words.unshift(word)
        }
        break
      }

      sWord = sWord + char
      // 记录关键字
      if (parent.get(char).get('isEnd')) {
        word = sWord
      }
      parent = parent.get(char)
    }
  }
  // 排序，先替换长字符长
  words = words.sort((a, b) => b.length - a.length)
  console.log(words)
  // 替换敏感词
  words.forEach(word => {
    let stars = ''.padEnd(word.length, '*');
    let reg = new RegExp(word, 'g')
    s = s.replace(reg, stars)
  })

  return s
}

module.exports = {
  addWord,
  filter
}
