import {RECEIVE_USER, SET_HEAD_TITLE,LOGOUT} from "./action-type";
import {loginwithwx, reqlogin} from '../api'
import {errormodal} from "../utils/msg";

import axios from "axios"
export const setHeadTitle=(headTitle)=>({type:SET_HEAD_TITLE,data:headTitle})

export const receiveUser=(user)=>({type:RECEIVE_USER,user})

export const userlogin=(username,password)=>{
    return async dispatch=>{
       const result=await reqlogin(username,password)
        if(result.ret===200)
        {
            const user=result.data
            //设置默认的header，用于验证用户登录信息
            //axios.defaults.headers.common['Token']=user.id
            window.sessionStorage.setItem('token',user.id)
            dispatch(receiveUser(user))
        }else{
            errormodal(result.msg)
        }
    }
}

export const wxlogin=(code)=>{
    return async  dispatch=>{
        const  result=await loginwithwx(code)
        if(result.ret===200)
        {
            const user=result.data
            window.sessionStorage.setItem('token',user.id)
            dispatch(receiveUser(user))
        }else{
            errormodal(result.msg)
        }
    }
}


export const logout=()=>({
    type:LOGOUT
})
