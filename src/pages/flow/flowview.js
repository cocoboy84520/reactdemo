import React, {Component} from "react";
import {
    PageHeader,
    Button,
    Descriptions,
    Card,
    Steps,
    message,
    Statistic,
    Badge,
    Menu,
    Dropdown,
    Timeline,
    Icon,
    Input,
    Spin,
    Modal, Select
} from 'antd';
import Loading from "../../components/loading";
import {backflow, dochecksave, getflowdetail, getuserlist, loginwithwx} from "../../api";
import moment from 'moment';
import {connect} from 'react-redux'
import queryString from 'query-string'
import './flowview.less'
import {withTranslation} from "react-i18next";
const {Step} = Steps;
const {Option, OptGroup} = Select;
const {TextArea} = Input;
const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                1st menu item
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                2nd menu item
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                3rd menu item
            </a>
        </Menu.Item>
    </Menu>
);
@withTranslation()
class FlowView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isloading: true,
            menudata: <Menu></Menu>,
            loading:false,
            Modalvisible:false,
        }
        this.remark = '同意'
        this.singuser=0;
    }

    loaduser = async () => {
        const userlist = await getuserlist()
        if (userlist.ret === 200) {
            this.setState({userlist: userlist.data})
        }
    }

    componentDidMount() {
        let wf_id
        const parsed = queryString.parse(this.props.location.search);
        if(parsed.flowid)
        {
            wf_id=parsed.flowid
        }else{
            wf_id=this.props.location.state.wf_id
        }
        this.loaduser()
        this.loaddetail(wf_id)
        this.setState({menudata: this.createMenu})
    }

    createMenu = () => {
        const menu = (<Menu>
            {this.state.detaildata.preprocess.map((item, index) => <Menu.Item>
                <a onClick={()=>this.dochecksave(this.state.detaildata.sing_st==1?'sback':'back',item.id)}>
                    {item.text}
                </a>
            </Menu.Item>)}
        </Menu>)
        return menu
    }

    loaddetail = async (wf_id) => {
        const result = await getflowdetail(wf_id)
        if (result.ret === 200) {
            this.setState({detaildata: result.data, isloading: false})
            console.log(result.data)
        } else {
            message.error(result.msg)
        }
    }


    dochecksave = async (status,wf_backflow) => {
        this.setState({loading:true})
        console.log(this.singuser)
        const result = await dochecksave(this.state.detaildata.f_data.id, status, this.remark,wf_backflow,this.singuser)
        this.setState({loading:false})
        if (result.ret === 200) {
            message.success('审核成功')
            window.history.back()
        }

    }

    dobackflow=async ()=>{
        this.setState({loading:true})
        const result=await backflow(this.state.detaildata.f_data.id)
        this.setState({loading:false})
        if(result.ret===200)
        {
            message.success('申请撤回成功')
            window.history.back()
        }
    }

    doedit=()=>{
        this.props.history.push({pathname:'/myflow/editflow',state:{wf_id:this.state.detaildata.f_data.id}})
    }

    onTextChange = (e) => {
        if (e.target.value)
            this.remark = e.target.value
        else
            this.remark = ''

    }

    handleOk=()=>{
        this.dochecksave('sing',0)
    }

    handleCancel=()=>{
        console.log('关闭')
        this.setState({Modalvisible:false})
    }

    selectOnChange=(value, option)=>{
        this.singuser=value
    }

    render() {
        if (this.state.isloading) {
            return (
                <Loading/>
            )
        } else {
            let btnedit=true
            let btnback=true
            const detaildata = this.state.detaildata
            let btncheck=!detaildata.st
            switch (this.state.detaildata.f_data.status)
            {
                case -1:
                    debugger
                    if(this.props.user.id.toString()==this.state.detaildata.f_data.uid)
                    {
                        btnedit=false
                    }
                    break
                case 0:
                    debugger
                    btnedit=false
                    break
                case 1:
                    debugger
                    if(this.state.detaildata.run_log.length==1)
                    {
                        //还没有审批记录且当前未申请人时允许撤回
                        if(this.props.user.id.toString()==this.state.detaildata.f_data.uid)
                        btnback=false
                    }
                    break
                case 2:
                    btnedit=true
                    btnback=true
                    btncheck=true
            }
            const disabled =this.props.user.id.toString() != this.state.detaildata.process.auto_sponsor_ids||this.state.detaildata.f_data.status==-1
            const {t}=this.props
            return (

                <Spin spinning={this.state.loading}>
                    <Modal
                        title="请选择转送人"
                        visible={this.state.Modalvisible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        maskClosable={true}
                        destroyOnClose={true}
                    ><Select  style={{ width: '100%' }} onChange={this.selectOnChange}>
                        {this.state.userlist.map((item, index) => {
                                return (
                                    <OptGroup key={index} label={item.DepartName}>
                                        {item.users.map((user, uindex) => {
                                            return (
                                                <Option key={user.id}
                                                        value={user.id.toString()}>{user.name}</Option>
                                            )
                                        })}

                                    </OptGroup>
                                )
                            }
                        )}
                    </Select>
                    </Modal>
                <div>
                    <PageHeader
                        ghost={false}
                        onBack={() => window.history.back()}
                        title={t('申请号')+':' + detaildata.f_data.No}
                        extra={[
                            <Button target={'_blank'} href={'/index.php?s=PdfView.pdf&wfid='+this.state.detaildata.f_data.id} key="1" type="primary" disabled={this.state.detaildata.f_data.status!=2}>
                                {t('下载')}
                            </Button>,
                        ]}
                    >
                        <Descriptions size="small" column={3}>
                            <Descriptions.Item label={t("申请人")}>{detaildata.f_data.name}</Descriptions.Item>
                            <Descriptions.Item
                                label={t("申请时间")}>{moment(parseInt(detaildata.f_data.add_time) * 1000).format("YYYY-MM-DD HH:mm")}</Descriptions.Item>
                            <Descriptions.Item label={t("申请人部门")}>{detaildata.f_data.department}</Descriptions.Item>
                            <Descriptions.Item label={t("批准号")}>

                            </Descriptions.Item>
                        </Descriptions>
                    </PageHeader>

                    <Card title={t("流程进度")} bordered={false} style={{marginTop: 20}}>
                        {this.state.detaildata.f_data.status!=-1&&<Steps size="small" progressDot current={this.state.detaildata.current}
                                                                         style={{marginTop: 20, marginBottom: 20}}>
                            {this.state.detaildata.singlist.map((item, index) =>
                                <Step title={item.status} description={item.auto_sponsor_text}/>
                            )}
                        </Steps>}
                    </Card>
                    <Card title={t("申请内容")} bordered={false} style={{marginTop: 20}}>
                        <Descriptions title={this.state.detaildata.f_data.new_title}  size={'middle '}
                                      bordered>
                            {this.state.detaildata.formdetail.map((item, index) =>
                                item.map((input,idx)=>
                                    <Descriptions.Item span={parseInt(3/item.length)} label={input.title} >{input.value}</Descriptions.Item>
                                )

                            )}
                        </Descriptions>
                    </Card>
                    <Card title={t("附件")} bordered={false} style={{marginTop: 20, display: 'flex', flexDirection: 'column'}}>
                        {this.state.detaildata.files.map((item, index) =>
                            <div style={{marginBottom: 20, justifyContent: 'center', alignItems: 'center'}}><Icon
                                type="link" style={{marginRight: 15}}/><a title={item.name} href={item.url}
                                                                          target={'_blank'}>{item.name}</a></div>
                        )}
                    </Card>
                    <Card title={t("审核记录")} bordered={false} style={{marginTop: 20}}>
                        <Timeline>

                            {this.state.detaildata.run_log.map((item, index) =>
                                <Timeline.Item color={item.btn == 'ok'||item.btn=='sok'||item.btn=='Sing' ? 'green' : 'red'}>
                                    <p style={{backgroundColor: 'white'}}>
                                        {item.btn=='Send'?item.name+'(提交申请)':item.btn=='ok'?item.name+'(审核确认)':item.btn=='back'?item.name+'(驳回申请)':item.btn=='SingBack'?item.name+'(转送驳回)':item.btn=='Back'?item.name+'(审批)':item.btn=='sok'?item.name+'(转送审批)':item.name+'(转送)'}
                                    </p>
                                    <p style={{backgroundColor: 'white'}}>
                                        {moment(parseInt(item.dateline) * 1000).format("YYYY-MM-DD HH:mm:ss")}
                                    </p>
                                    <p style={{backgroundColor: 'white'}}>
                                        {item.content}
                                    </p>
                                </Timeline.Item>
                            )}
                        </Timeline>
                    </Card>
                    {!disabled &&
                    <Card title={t("审核意见")} bordered={false}
                          style={{marginTop: 20, display: 'flex', flexDirection: 'column'}}>
                        <TextArea onChange={this.onTextChange} rows={4}/>
                    </Card>}
                    <div style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        marginTop: 20
                    }}>
                        {/*this.state.detaildata.f_data.status == 2&&*/}
                        <Button disabled={btnedit}
                                onClick={() => this.doedit()} style={{marginLeft: 10}}
                                type="primary">{t("编辑")}</Button>
                        <Button disabled={btnback}
                                onClick={() => this.dobackflow()} style={{marginLeft: 10}}
                                type="danger">{t('撤回')}</Button>
                        <Button disabled={btncheck}
                                onClick={() => this.dochecksave(detaildata.sing_st==1?'sok':'ok',0)} style={{marginLeft: 10}}
                                type="primary">{t('审核')}</Button>
                        <Button disabled={btncheck} onClick={() => this.setState({Modalvisible:true})}
                                style={{marginLeft: 10}}>会签</Button>
                        <Dropdown disabled={btncheck} overlay={this.state.menudata} placement="topCenter">
                            <Button style={{marginLeft: 10}} type="danger">{t('驳回')}</Button>
                        </Dropdown>
                    </div>
                </div>
                </Spin>
            )
        }

    }

}



export default connect(
    status => ({user: status.user}), {}
)(FlowView)
