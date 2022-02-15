// 导入axios
import axios from 'axios'

import Vue from 'vue'
import router from './router/index'

// 这里设置后端接口的IP和端口号
const IP = 'localhost'
const PORT = 3000

// 创建axios实例
const http = axios.create({
    baseURL: `http://${IP}:${PORT}/admin/api`
})

// axios拦截器
// 在每次请求的请求头中添加token
http.interceptors.request.use(
    (config) => {
        //  存在token才添加头部信息
        if( localStorage.token ) {
            // 添加'Bearer'是为了规范
            config.headers.Authorization = 'Bearer ' + localStorage.token
        }
        
        return config
    }
)
// 处理后台发送的message信息显示到前端
http.interceptors.response.use(
    res => {
        if( res.status === 200 && res.data.message ) {
            Vue.prototype.$message({
                type: 'success',
                message: res.data.message
            })
        }
        return res
    }, err => {
        if( err.response.status!==500 && err.response.data.message ) {
            Vue.prototype.$message({
                type: 'error',
                message: err.response.data.message
            })
            if( router.history.current.path !== '/login' ) {
                router.push('/login')
            }
        }
        
    }
)

// 暴露模块
export default http
