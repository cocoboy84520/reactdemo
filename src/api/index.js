/*
api请求模块
 */
import ajax from "./ajax";

const BASE='http://127.0.0.1:1065/?s=';
//登录接口
export const reqlogin=(username,password)=>ajax(BASE+'User.login',{username,password},'POST')

export const reqgetcalendar=(startdate,enddate)=>ajax(BASE+'/calendars',{startdate,enddate},'POST')
