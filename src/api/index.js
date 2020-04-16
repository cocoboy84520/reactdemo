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

//添加流程步骤
export const addprocess=(flowid,processid)=>ajax('/?s=Workflow.addprocess',{flowid,processid},'POST')

//添加流程
export const addflow=(type,flowname,flowdesc)=>ajax('/?s=Workflow.addflow',{type,flowname,flowdesc},'POST')

//删除流程步骤
export const delprocess=(flowid,processid)=>ajax('/?s=Workflow.delprocess',{flowid,processid},'POST')

//保存流程设计图
export const save_canvas=(data,flowid)=>ajax('/?s=Workflow.savecanvas',{data,flowid},'POST')

//获取流程设计图
export const get_canvas=(flowid)=>ajax('/?s=Workflow.getcanvas',{flowid},'POST')

//保存步骤属性
export const save_processarrt=(processid,process_type,is_sing,is_back,auto_person,auto_sponsor_ids)=>ajax('/?s=Workflow.saveprocessarrt',{processid,process_type,is_sing,is_back,auto_person,auto_sponsor_ids},'POST')

//读取步骤属性值
export const get_processarrt=(processid)=>ajax('/?s=Workflow.getprocessattr',{processid},'POST')

//保存表单设计
export const save_formdesign=(flowid,designid,data)=>ajax('/?s=Workflow.saveformdesign',{flowid,designid,data},'POST')

//读取表单设计
export const get_formdesign=(flowid)=>ajax('/?s=Workflow.getformdesign',{flowid},'POST')

//获取流程列表
export const get_flowlist=()=>ajax('/?s=Workflow.getflowlist',{},'POST')

//发起流程
export const startflow=(flowdata,flowid)=>ajax('/?s=Workflow.startflow',{flowdata,flowid},'POST')

//获取我的申请
export const getmyflow=()=>ajax('/?s=Workflow.myflow',{},'POST')
