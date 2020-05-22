#!/usr/bin/env node

const pkg = require('../package')
// 从顶层 index.js 里面拿到 lib 下面模块暴露的方法
const query = require('../lib/ltsn').query
const update = require('../lib/ltsn').update

function printVersion() {
  console.log('ltsnode ' + pkg.version)
  process.exit()
}

// 一些命令的帮助提示
function printHelp(code) {
  const lines = [
    '',
    '  Usage:',
    '    ltsnode [8]',
    '',
    '  Options:',
    '    -v, --version             print the version of vc',
    '    -h, --help                display this message',
    '',
    '  Examples:',
    '    $ ltsnode 8',
    ''
  ]

  console.log(lines.join('\n'))
  process.exit(code || 0)
}

// 输出结果到命令行窗口
async function printResult(v) {
  const dists = await update(v)
  // console.log('dists', dists)

  const results = query(dists, v)
  console.log('results', results)

  process.exit()
}

// 包的入口函数，里面对参数做剪裁处理，拿到入参并给予不同入参的处理逻辑
function main(argv) {

  const getArg = function() {
    let args = argv.shift()
    args = args.split('=')

    // 如果参数包含 '=' 
    if (args.length > 1) {
      argv.unshift(args.slice(1).join('='))
    }
    return args[0]
  }

  let arg

  if (!argv) {
    printHelp(1)
  }

  while (argv.length) {
    arg = getArg()
    switch(arg) {
      case '-v':
      case '-V':
      case '--version':
        printVersion()

        break
      case '-h':
      case '-H':
      case '--help':
        printHelp()

        break
      default:
        printResult(arg)

        break
    }
  }
}

console.log('process.argv', process.argv)

// 启动程序就开始执行主函数
main(process.argv.slice(2))

module.exports = main
