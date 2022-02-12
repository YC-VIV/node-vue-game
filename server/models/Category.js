// “分类”数据库模型对象

// 引入mongoose
const mongoose = require('mongoose')

// 创建约束对象
const schema = new mongoose.Schema({
    // 分类名称
    name: {type: String},
    // 父级分类
    // 这里的类型是_id，re定义关联的模型
    parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }
})

// 暴露模型对象
module.exports = mongoose.model('Category',schema)