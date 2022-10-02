import axios from "axios"; // 网络请求文件的封装
import { MessageBox, Alert } from 'element-ui';

const network = axios.create({
    baseURL: "/api",
    timeout: 3000 // 超时时间
})
let a = false;
// 拦截器---请求前
network.interceptors.request.use(config => {
    // localStorage.clear()
    config.headers = {
        "token": localStorage.getItem("token")
    }

    return config
})

// 请求拦截器---请求后
network.interceptors.response.use(res => {
    console.log(res);
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