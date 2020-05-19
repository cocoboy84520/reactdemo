/*
api请求模块
 */
import ajax from "./ajax";

const BASE='http://127.0.0.1:1065/';

//登录接口
export const reqlogin=(username,password)=>ajax('/index.php?s=User.login',{username,password},'POST')

export const reqgetcalendar=(begindate)=>ajax('/index.php?s=Calendar.getlist',{begindate},'POST')

export const calendaradd=(userid,name,startdate,starttime,enddate,endtime,title,titlecolor,content,remarks,cc,ismsg)=>ajax('/index.php?s=Calendar.add',{userid,name,startdate,starttime,enddate,endtime,title,titlecolor,content,remarks,cc,ismsg},'POST')

//编辑日程
export const calendaredit=(id,userid,name,startdate,starttime,enddate,endtime,title,titlecolor,content,remarks,cc,ismsg)=>ajax('/index.php?s=Calendar.edit',{id,userid,name,startdate,starttime,enddate,endtime,title,titlecolor,content,remarks,cc,ismsg},'POST')

//删除日程
export const calendardel=(id)=>ajax('/index.php?s=Calendar.del',{id},'POST')

//
export const getcalendardetail=(id)=>ajax('/index.php?s=Calendar.getdetail',{id},'POST')


export const getuserlist=()=>ajax('/index.php?s=User.getuser',{},'POST')

//添加公告
export const addnotice=(title,titlecolor,type,content,files)=>ajax('/index.php?s=Notice.add',{title,titlecolor,type,content,files},'POST')

//显示公告
export const noticelist=()=>ajax('/index.php?s=Notice.querylist',{},'POST')

//删除公告
export const noticedel=(id)=>ajax('/index.php?s=Notice.del',{id},'POST')

//获取流程列表
export const workflowlist=()=>ajax('/index.php?s=Workflow.querylist',{},'POST')

//添加流程步骤
export const addprocess=(flowid,processid)=>ajax('/index.php?s=Workflow.addprocess',{flowid,processid},'POST')

//添加流程
export const addflow=(type,flowname,flowdesc)=>ajax('/index.php?s=Workflow.addflow',{type,flowname,flowdesc},'POST')

//删除流程步骤
export const delprocess=(flowid,processid)=>ajax('/index.php?s=Workflow.delprocess',{flowid,processid},'POST')

//保存流程设计图
export const save_canvas=(data,flowid)=>ajax('/index.php?s=Workflow.savecanvas',{data,flowid},'POST')

//获取流程设计图
export const get_canvas=(flowid)=>ajax('/index.php?s=Workflow.getcanvas',{flowid},'POST')

//保存步骤属性
export const save_processarrt=(processid,process_type,is_sing,is_back,auto_person,auto_sponsor_ids)=>ajax('/index.php?s=Workflow.saveprocessarrt',{processid,process_type,is_sing,is_back,auto_person,auto_sponsor_ids},'POST')

//读取步骤属性值
export const get_processarrt=(processid)=>ajax('/index.php?s=Workflow.getprocessattr',{processid},'POST')

//保存表单设计
export const save_formdesign=(flowid,designid,data)=>ajax('/index.php?s=Workflow.saveformdesign',{flowid,designid,data},'POST')

//读取表单设计
export const get_formdesign=(flowid)=>ajax('/index.php?s=Workflow.getformdesign',{flowid},'POST')

//获取流程列表
export const get_flowlist=()=>ajax('/index.php?s=Workflow.getflowlist',{},'POST')

//发起流程
export const startflow=(flowdata,flowid)=>ajax('/index.php?s=Workflow.startflow',{flowdata,flowid},'POST')

//获取我的申请
export const getmyflow=()=>ajax('/index.php?s=Workflow.myflow',{},'POST')

//获取申请详情
export const getflowdetail=(wf_id)=>ajax('/index.php?s=Workflow.flowdetail',{wf_id},'POST')

//流程审批
export const dochecksave=(wf_fid,submit_to_save,remark)=>ajax('/index.php?s=Workflow.do_check_save',{wf_fid,submit_to_save,remark},'POST')

//添加用户
export const adduser=(username,name,email,mobile,departmentid,backupmobile)=>ajax('/index.php?s=User.add',{username,name,email,mobile,departmentid,backupmobile},'POST')

//获取系统用户列表
export const userlist=()=>ajax('/index.php?s=User.getuserlist',{},'POST')

//企业微信登录
export const  loginwithwx=(code)=>ajax('/index.php?s=User.wxlogin',{code},'POST')

//绑定企业微信
export const wxbind=(code)=>ajax('/index.php?s=User.wxbind',{code},'POST')

//更新账户信息
export const updateaccount=(NO,name,email,mobile,backupmobile)=>ajax('/index.php?s=Account.update',{NO,name,email,mobile,backupmobile},'POST')

//获取物流公司
export const getexpresslist=(searchtext)=>ajax('index.php?s=Express.getexpresslist',{searchtext},'POST')

//查询物流轨迹
export const gettrack=(ShipperCode,LogisticCode)=>ajax('index.php?s=Express.tracks',{ShipperCode,LogisticCode},'POST')
