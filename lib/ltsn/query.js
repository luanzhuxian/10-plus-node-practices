// 对数据的二次加工格式化之类

const Table = require('cli-table')

function query(dists) {
  const keys = Object.keys(dists[0])
  // 建立表头
  const table = new Table({
    head: keys
  })

  // 拼接出表格的每一行
  return dists
    .reduce((result, item) => {
      table.push(
        Object.values(item)
      )
      return result
    }, table)
    .toString()
}

module.exports = query
