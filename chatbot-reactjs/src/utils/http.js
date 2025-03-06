//axios封装处理

//1.根域名配置
//2. 超时时间
//3.请求拦截器/响应拦截器

import axios from "axios";
import { getToken, removeToken } from "./token";
import router from "../router";
import { message } from "antd";
//axios.create()用于创建一个新的 Axios 实例。为这个实例配置一些默认设置，这些设置将在调用此实例时生效，避免每次请求都需要重复配置相同的内容。
const http =axios.create({
    baseURL:"http://127.0.0.1:3000/api",
    timeout:5000000
})

//添加请求拦截器
http.interceptors.request.use((config)=>{
    const token =getToken()
    if(token){
        config.headers.Authorization=`Bearer ${token}`
    }
    return config
},(error)=>{
    return Promise.reject(error)
})

//添加响应拦截器
http.interceptors.response.use((response)=>{
    // console.log(response.data)
    switch(response.data.code){
        //token出错删除token，跳回登录页面
        case '2003':{
            message.error(response.data.msg)
            removeToken()
            setTimeout(() => {
                router.navigate('/login').then(
                    ()=>{
                        window.location.reload()
                    }
                )
            }, 500);
            return 
        }
        default:break
    }
    return response
},(error)=>{
    console.log(error)
    return Promise.reject(error)
})

export{http}