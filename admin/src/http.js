// 导入axios
import axios from 'axios'

// 这里设置后端接口的IP和端口号
const IP = 'localhost'
const PORT = 3000

// 创建axios实例
const http = axios.create({
    baseURL: `http://${IP}:${PORT}/admin/api`
})

// 暴露模块
export default http
