
[![NPM Version][npm-image]][npm-url]

### Introduction
A simple&basic text filter that is under censor of GFW, with DFA.

为nodejs提供的简单GFW敏感词过滤器，使用DFA实现。

### Usage

    var tc = require('text-censor')
    tc.filter('Ur so sexy babe!',function(err, censored){
        console.log(censored) // 'Ur so ***y babe!'
    })

If you want to add key words of your own, simply add them to the end of 'keywords' file, one word per line.

在'keywords'文件末尾增加自定义敏感词，每行一个。

### Performance

Under 1ms for a 10-20 words sentence. Around 10ms for 1000 words.

10-20字的短句在1ms以内替换完成，1000字左右需要10ms左右


### Thanks
Keyword list from https://github.com/observerss/textfilter

### License
MIT

[npm-url]: https://npmjs.org/package/text-censor
[npm-image]: https://img.shields.io/npm/v/text-censor.svg
[NPM Version]: 1.0.0