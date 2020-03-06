/*
发送异步ajax请求
 */
import axios from 'axios'
import {message} from "antd";
import store from "../redux/store";

export default  function ajax(url,data={},type='GET') {

    //添加一个请求拦截器
    axios.interceptors.request.use(function (config) {
        const {user}=store.getState();
        config.headers.common['Token'] = user.id;
        return config;
    }, function (error) {
        // Do something with request error
        console.info("error: ");
        console.info(error);
        return Promise.reject(error);
    });
    return new Promise((resolve, reject) => {
        let promise
        if (type==='GET')
        {
            promise= axios.get(url,{params:data});
        }else{
            promise=  axios.post(url,data);
        }
        promise.then(response=>{
            resolve(response.data)
        }).catch(error=>{
            message.error('网络请求错误：'+error.message)
        })
    });
}
