// 导入express
const express = require('express')

const app = express()

// 解决跨域
app.use(require('cors')())
// 解析表单中的JSON格式的数据
app.use(express.json())
// 将uploads内的静态文件资源挂载到路由上
app.use('/uploads',express.static(__dirname + '/uploads'))

// 将app传入admin中的admin.js
require('./routes/admin/admin')(app)

// IP
const IP = 'localhost'
// 端口
const PORT = 3000

// 启动端口服务
app.listen( PORT , () => {
    console.log(`http://${IP}:${PORT} 服务正在运行...`)
} )

module.exports = {
    IP,
    PORT
}

