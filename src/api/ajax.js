/*
发送异步ajax请求
 */
import axios from 'axios'
import {message} from "antd";


export default function ajax(url,data={},type='GET') {
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