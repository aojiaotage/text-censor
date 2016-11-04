var fs = require('fs')

var path = __dirname + '/keywords'

var map = {}

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream(path, {encoding: 'UTF-8'})
});

lineReader.on('line', function (line) {
  if(!line) return
  addWord(line)
});

function addWord(word) {

  var parent = map

  for (var i = 0; i < word.length; i++) {
    if (!parent[word[i]]) parent[word[i]] = {}
    parent = parent[word[i]]
  }
  parent.isEnd = true
}

function filter(s, cb) {
  var parent = map

  for (var i = 0; i < s.length; i++) {
    if (s[i] == '*') {
      continue
    }

    var found = false
    var skip = 0
    var sWord = ''

    for (var j = i; j < s.length; j++) {

      if (!parent[s[j]]) {
        // console.log('skip ', s[j])
        found = false
        skip = j - i
        parent = map
        break;
      }

      sWord = sWord + s[j]
      if (parent[s[j]].isEnd) {
        found = true
        skip = j - i
        break
      }
      parent = parent[s[j]]
    }

    if (skip > 1) {
      i += skip - 1
    }

    if (!found) {
      continue
    }

    var stars = '*'
    for (var k = 0; k < skip; k++) {
      stars = stars + '*'
    }

    var reg = new RegExp(sWord, 'g')
    s = s.replace(reg, stars)

  }

  if(typeof cb === 'function'){
    cb(null, s)
  }

  return s
}

module.exports = {
  filter: filter
}
