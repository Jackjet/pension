import axios from 'axios';
import { Message } from 'element-ui';
import { tokenStr } from "@/api/file.js";

const service = axios.create({
    baseURL: process.env.VUE_APP_URL,
    timeout: 100000 // request timeout
})

service.interceptors.request.use(
    config => {
        if (tokenStr()) {
            config.headers['Authorization'] = tokenStr()
        }
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        return response
    },
    error => {
        const res = error.response.data
        const status = error.response.status
        if (status >= 500) {
            Message.error('服务繁忙请稍后再试')
        } else if (status >= 400) {
            if (res.status === 401) {
                Message.warning("您的账号登录已失效, 请重新登录")
                bus.$emit('logout')
            } else {
                Message.error("未知错误")
                console.error(error)
            }
        }
        return Promise.resolve(error)
    }
)
export default service
