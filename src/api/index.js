/*
api请求模块
 */
import ajax from "./ajax";

const BASE='http://127.0.0.1:1065/?s=';

//登录接口
export const reqlogin=(username,password)=>ajax(BASE+'User.login',{username,password},'POST')

export const reqgetcalendar=(startdate,enddate)=>ajax('http://rap2api.taobao.org/app/mock/240301/calendars',{startdate,enddate},'POST')

export const calendaradd=(name,startdate,starttime,enddate,endtime,title,titlecolor,content,remarks,cc,ismsg)=>ajax(BASE+'User.login',{name,startdate,starttime,enddate,endtime,title,titlecolor,content,remarks,cc,ismsg},'POST')
