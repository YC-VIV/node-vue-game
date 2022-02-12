// 后台管理路由

// 将整个js文件作为函数暴露出去，形参为app，目的是获取express实例
module.exports = app => {
    // 导入express调用router并实例化
    const express = require('express')
    const router = express.Router(
        {
            // 由于子路由使用了路由的动态参数resource，所以这里需要设置合并路由
            mergeParams : true
        }
    )

    // 引入分类的数据库模型对象
    let promise = require('../../plugins/db')
    
    // 操作数据库
    function doSomething() {
        // 需要操作数据库的接口
        // 新建
        router.post('/' , async( req,res ) => {
            const info = await req.Model.create(req.body)
            res.send(info)
        })
        // 查询
        router.get('/', async( req,res ) => {
            // 若模型是Category，则可能进行二级分类编辑的操作，此时需要查询具体的parent
            const queryOptions = {}
            if( req.Model.modelName === 'Category' ) {
                // populate连表查询，查询到parent的对应数据后替换parent字段
                queryOptions.populate = 'parent'
            }
            
            const items = await req.Model.find().setOptions(queryOptions).limit(10)
            res.send(items)
        } )
        // 根据id查看详情
        router.get('/:id',async( req,res ) => {
            const info = await req.Model.findById(req.params.id)
            res.send(info)
        })
        // 修改
        router.put('/:id',async( req,res ) => {
            const info = await req.Model.findByIdAndUpdate(req.params.id,req.body)
            res.send(info)
        })
        // 删除
        router.delete('/:id',async( req,res ) => {
            const info = await req.Model.findByIdAndDelete(req.params.id)
            res.send({'seccess':true})
        })
    }

    // 用于数据库的连接操作是异步执行的，所以这里使用了promise进行操作
    promise.then((value)=>{
        console.log(value)
        doSomething()
    },(reason)=>{
        console.log(reason)
    })

    // 使用中间件预处理模型数据，并挂载路由
    app.use('/admin/api/rest/:resource', async (req,res,next) => {
        // 使用中间件inflection将路由参数转换为单数
        // 这是为了命名规范，如categories对应模型Category
        const modelName = require('inflection').classify(req.params.resource)
        // 将模型挂载到请求对象上，以便后续能使用
        req.Model = require(`../../models/${modelName}`)
        next()
    } , router)

    // 上传图片
    // 引入处理上传文件数据的模块multer
    const multer = require('multer')
    // 定义上传文件的地址，也就是图片上传到服务器后保存到服务器的路径
    const upload = multer({ dest: __dirname + '/../../uploads'})
    // upload.single表示接受单个文件的上传，file是文件上传后前端传过来的二进制数据
    app.post('/admin/api/upload',upload.single('file'),async ( req,res ) => {
        // 将二进制数据挂载到req上方便后续处理
        const file = req.file
        // 将资源的地址放入file中
        // 因为路由uploads可以访问静态图片资源，而filename是multer中间件处理的图片的新命名，所以这样可以访问图片
        file.url = `http://${require('../../index').IP}:${require('../../index').PORT}/uploads/${file.filename}`
        res.send(file)
    })
}