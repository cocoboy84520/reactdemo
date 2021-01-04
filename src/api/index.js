/*
api请求模块
 */
import ajax from "./ajax";

const BASE='http://127.0.0.1:1065/';

//登录接口
export const reqlogin=(username,password)=>ajax('/index.php?s=User.login',{username,password},'POST')

export const reqgetcalendar=(startdate,enddate)=>ajax('/index.php?s=Calendar.getlist',{startdate,enddate},'POST')

export const calendaradd=(userid,name,startdate,starttime,enddate,endtime,title,titlecolor,content,remarks,cc,ismsg,targetKeys)=>ajax('/index.php?s=Calendar.add',{userid,name,startdate,starttime,enddate,endtime,title,titlecolor,content,remarks,cc,ismsg,targetKeys},'POST')

//编辑日程
export const calendaredit=(id,userid,name,startdate,starttime,enddate,endtime,title,titlecolor,content,remarks,cc,ismsg,targetKeys)=>ajax('/index.php?s=Calendar.edit',{id,userid,name,startdate,starttime,enddate,endtime,title,titlecolor,content,remarks,cc,ismsg,targetKeys},'POST')

//删除日程
export const calendardel=(id)=>ajax('/index.php?s=Calendar.del',{id},'POST')

//
export const getcalendardetail=(id)=>ajax('/index.php?s=Calendar.getdetail',{id},'POST')


export const getuserlist=()=>ajax('/index.php?s=User.getuser',{},'POST')

//添加公告
export const addnotice=(title,titlecolor,type,content,files)=>ajax('/index.php?s=Notice.add',{title,titlecolor,type,content,files},'POST')

//显示公告
export const noticelist=(title,content,createuser,createtime)=>ajax('/index.php?s=Notice.querylist',{title,content,createuser,createtime},'POST')

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

//发起流程(编辑)
export const starteditflow=(flowdata)=>ajax('/index.php?s=Workflow.starteditflow',{flowdata},'POST')

//保存流程
export const saveflow=(flowdata,flowid)=>ajax('/index.php?s=Workflow.saveflow',{flowdata,flowid},'POST')

//保存流程（编辑）
export const saveeditflow=(flowdata)=>ajax('/index.php?s=Workflow.saveeditflow',{flowdata},'POST')

//获取我的申请
export const getmyflow=(rangedate,status,No,No2,new_title)=>ajax('/index.php?s=Workflow.myflow',{rangedate,status,No,No2,new_title},'POST')

//获取待我审批
export const getmycheck=(rangedate,status,No,No2,new_title)=>ajax('/index.php?s=Workflow.mycheck',{rangedate,status,No,No2,new_title},'POST')

//获取申请详情
export const getflowdetail=(wf_id)=>ajax('/index.php?s=Workflow.flowdetail',{wf_id},'POST')

//获取编辑详情
export const geteditinfo=(wf_id)=>ajax('/index.php?s=Workflow.geteditinfo',{wf_id},'POST')

//流程审批
export const dochecksave=(wf_fid,submit_to_save,remark,wf_backflow,singuser)=>ajax('/index.php?s=Workflow.do_check_save',{wf_fid,submit_to_save,remark,wf_backflow,singuser},'POST')

//添加用户
export const adduser=(username,name,email,mobile,departmentid,backupmobile,password)=>ajax('/index.php?s=User.add',{username,name,email,mobile,departmentid,backupmobile,password},'POST')

//添加用户
export const edituser=(id,username,name,email,mobile,departmentid,backupmobile,password)=>ajax('/index.php?s=User.edit',{id,username,name,email,mobile,departmentid,backupmobile,password},'POST')

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

//停用用户账号
export const stopuser=(id)=>ajax('index.php?s=User.accountstop',{id},'POST')

//启用用户账号
export const enableduser=(id)=>ajax('index.php?s=User.accountenabled',{id},'POST')

//获取部门列表
export const getDartMentList=()=>ajax('/index.php?s=Department.getlist',{},'POST')

//获取单个账号详情
export const getaccountdetail=(id)=>ajax('/index.php?s=User.getaccountdetail',{id},'POST')

//获取设施列表
export const getresourcelist=(startDate,endDate)=>ajax('/index.php?s=Resource.resourcelist',{startDate,endDate},'POST')

//添加预约
export const addFacilities=(data)=>ajax('/index.php?s=Resource.add',data,'POST')

//删除预约
export const delFacilities=(id)=>ajax('/index.php?s=Resource.del',id,'POST')

//首页信息
export const gethome=()=>ajax('/index.php?s=Home.index',{},'POST')

//获取通知详情
export const getnoticedetail=(id)=>ajax('/index.php?s=Notice.show',{id},'POST')

//编辑通知
export const editnotice=(id)=>ajax('/index.php?s=Notice.getdetail',{id},'POST')

//获取审批委托记录
export const  getentrustlist=()=>ajax('/index.php?s=Entrust.querylist',{},'POST')

//添加委托
export const  addentrust=(type,entrustuser,startdate,enddate)=>ajax('/index.php?s=Entrust.add',{type,entrustuser,startdate,enddate},'POST')

//删除委托
export const delentrust=(id)=>ajax('/index.php?s=Entrust.del',{id},'POST')

//撤回申请
export const backflow=(flowid)=>ajax('/index.php?s=Workflow.backflow',{flowid},'POST')

export const getrslist=()=>ajax('/index.php?s=resource.rslist',{},'POST')
