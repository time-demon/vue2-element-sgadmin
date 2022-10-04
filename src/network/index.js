import axios from "axios"; // 网络请求文件的封装
import { MessageBox } from 'element-ui';

const network = axios.create({
    baseURL: "",
    timeout: 3000 // 超时时间
})

// 拦截器---请求前
network.interceptors.request.use(config => {
    // localStorage.clear()
    // 将token放到headers中，每次网络请求时携带
    config.headers.Authorization = localStorage.getItem("token");

    return config
})

// 请求拦截器---请求后
network.interceptors.response.use(res => {

    // 判断token是否过期
    if (window.location.pathname != '/login') {// 排除页面
        if (res.data.loginStatus == false) {// 如果token已过期
            localStorage.clear();
            MessageBox.alert('登录状态已失效，是否访问登录页？', '温馨提示', {
                confirmButtonText: '确定',
                showClose: false,
                closeOnClickModal: false,
                callback: action => {
                    window.location.href = "/login"
                }
            });
        }
    }

    return res.data
})

export default function (option) {
    return new Promise((resolve, reject) => {
        return network(option).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}