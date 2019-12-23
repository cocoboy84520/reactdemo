/*
api请求模块
 */
import ajax from "./ajax";

const BASE='http://rap2api.taobao.org/app/mock/240301';
//登录接口
export const reqlogin=(username,password)=>ajax(BASE+'/login',{username,password},'POST')

export const reqgetcalendar=(startdate,enddate)=>ajax(BASE+'/calendars',{startdate,enddate},'POST')
