// 数据库存放位置
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/node-vue-game', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

var promise = new Promise((resolve,reject)=>{
    mongoose.connection.on('open',(err)=>{
        if(!err) {
            resolve('数据库连接成功！');
        } else {
            reject('数据库连接失败！');
        }
    })
})

module.exports = promise