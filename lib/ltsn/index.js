// 暴露 lib 下的模块，供 bin 目录下脚本调用
// 遍历 node_modules 下所有 js 文件名，写入一个 txt 文件

exports.query = require('./query')
exports.update = require('./update')

const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const unlink = promisify(fs.unlink)
const appendFile = promisify(fs.appendFile)

const files = []

function walk (path) {
  fs
    .readdirSync(path)
    .forEach(function(file) {
      const newPath = path + '/' + file
      const stat = fs.statSync(newPath)

      if (stat.isFile()) {
        if (/\.js/.test(file)) {
          files.push(file)
        }
      } else if (stat.isDirectory()) {
        walk(newPath)
      }
    })
}


(async function () {
  try {    
    const modulesPath = path.join(__dirname, '../../node_modules') 
    const filePath = path.join(__dirname, '../../files/c.txt') 

    walk(modulesPath)

    files.unshift('')
    files.unshift(new Date())
    // console.log(files.join('\r\n'))
    
    if (fs.existsSync(filePath)) {      
      // await unlink(filePath, (err) => console.log('unlink', err))
      await unlink(filePath)
      console.log('文件删除成功')
    }
    
    // await appendFile(
    //   filePath, 
    //   files.join('\r\n'), 
    //   {
    //     encoding: 'utf8'
    //   }, 
    //   (err) => console.log('appendFile', err)
    // )
    await appendFile(
      filePath, 
      files.join('\r\n'), 
      { encoding: 'utf8' }
    )
    console.log('文件追加成功')
  } catch (error) {
    console.error(error)
  }
})()
