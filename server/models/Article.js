const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    // 文章标题
    title: {
        type: String
    },
    categories: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Category'
        }
    ],
    // 文章主体内容
    body: {
        type: String
    }
}) 

module.exports = mongoose.model('Article',schema) 