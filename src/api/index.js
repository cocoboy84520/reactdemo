/*
api请求模块
 */
import ajax from "./ajax";

const BASE='http://127.0.0.1:1065/';

//登录接口
export const reqlogin=(username,password)=>ajax('/?s=User.login',{username,password},'POST')

export const reqgetcalendar=(begindate)=>ajax('/?s=Calendar.getlist',{begindate},'POST')

export const calendaradd=(userid,name,startdate,starttime,enddate,endtime,title,titlecolor,content,remarks,cc,ismsg)=>ajax('/?s=Calendar.add',{userid,name,startdate,starttime,enddate,endtime,title,titlecolor,content,remarks,cc,ismsg},'POST')

//编辑日程
export const calendaredit=(id,userid,name,startdate,starttime,enddate,endtime,title,titlecolor,content,remarks,cc,ismsg)=>ajax('/?s=Calendar.edit',{id,userid,name,startdate,starttime,enddate,endtime,title,titlecolor,content,remarks,cc,ismsg},'POST')

//删除日程
export const calendardel=(id)=>ajax('/?s=Calendar.del',{id},'POST')

//
export const getcalendardetail=(id)=>ajax('/?s=Calendar.getdetail',{id},'POST')


export const getuserlist=()=>ajax('/?s=User.getuser',{},'POST')

//添加公告
export const addnotice=(title,titlecolor,type,content,files)=>ajax('/?s=Notice.add',{title,titlecolor,type,content,files},'POST')

//显示公告
export const noticelist=()=>ajax('/?s=Notice.querylist',{},'POST')

//删除公告
export const noticedel=(id)=>ajax('/?s=Notice.del',{id},'POST')

//获取流程列表
export const workflowlist=()=>ajax('/?s=Workflow.querylist',{},'POST')
