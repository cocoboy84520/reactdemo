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
    Input
} from 'antd';
import Loading from "../../components/loading";
import {dochecksave, getflowdetail} from "../../api";
import moment from 'moment';
import {connect} from 'react-redux'

const {Step} = Steps;
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

class FlowView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isloading: true,
            menudata: <Menu></Menu>,
        }
        this.remark = '同意'

    }

    componentDidMount() {
        let {wf_id} = this.props.location.state
        this.loaddetail(wf_id)
        this.setState({menudata: this.createMenu})
    }

    createMenu = () => {
        debugger
        const menu = (<Menu>
            {this.state.detaildata.preprocess.map((item, index) => <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
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


    dochecksave = async (status) => {
        const result = await dochecksave(this.state.detaildata.f_data.id, status, this.remark)
        if (result.ret === 200) {
            message.success('审核成功')
            window.history.back()
        }
    }

    onTextChange = (e) => {
        if (e.target.value)
            this.remark = e.target.value
        else
            this.remark = ''

    }

    render() {
        if (this.state.isloading) {
            return (
                <Loading/>
            )
        } else {
            const detaildata = this.state.detaildata
            const disabled = this.props.user.id.toString() != this.state.detaildata.process.auto_sponsor_ids
            return (
                <div>
                    <PageHeader
                        ghost={false}
                        onBack={() => window.history.back()}
                        title={'申请号:' + detaildata.f_data.No}
                        extra={[
                            <Button target={'_blank'} href={'http://127.0.0.1:1065/?s=PdfView.index&wfid='+this.state.detaildata.f_data.id} key="1" type="primary" disabled={this.state.detaildata.f_data.status!=2}>
                                下载
                            </Button>,
                        ]}
                    >
                        <Descriptions size="small" column={3}>
                            <Descriptions.Item label="申请人">{detaildata.f_data.name}</Descriptions.Item>
                            <Descriptions.Item
                                label="申请时间">{moment(parseInt(detaildata.f_data.add_time) * 1000).format("YYYY-MM-DD HH:mm")}</Descriptions.Item>
                            <Descriptions.Item label="申请人部门">{detaildata.f_data.department}</Descriptions.Item>
                            <Descriptions.Item label="批准号">

                            </Descriptions.Item>
                        </Descriptions>
                    </PageHeader>

                    <Card title="流程进度" bordered={false} style={{marginTop: 20}}>
                        <Steps size="small" progressDot current={this.state.detaildata.current}
                               style={{marginTop: 20, marginBottom: 20}}>
                            {this.state.detaildata.singlist.map((item, index) =>
                                <Step title={item.status} description={item.auto_sponsor_text}/>
                            )}
                        </Steps>
                    </Card>
                    <Card title="申请内容" bordered={false} style={{marginTop: 20}}>
                        <Descriptions title={this.state.detaildata.f_data.new_title} column={3} size={'middle '}
                                      bordered>
                            {this.state.detaildata.formdetail.map((item, index) =>
                                <Descriptions.Item label={item.title} span={3}>{item.value}</Descriptions.Item>
                            )}

                        </Descriptions>
                    </Card>
                    <Card title="附件" bordered={false} style={{marginTop: 20, display: 'flex', flexDirection: 'column'}}>
                        {this.state.detaildata.files.map((item, index) =>
                            <div style={{marginBottom: 20, justifyContent: 'center', alignItems: 'center'}}><Icon
                                type="link" style={{marginRight: 15}}/><a title={item.name} href={item.url}
                                                                          target={'_blank'}>{item.name}</a></div>
                        )}
                    </Card>
                    <Card title="审核记录" bordered={false} style={{marginTop: 20}}>
                        <Timeline>
                            {this.state.detaildata.run_log.map((item, index) =>
                                <Timeline.Item color={item.btn == 'ok' ? 'green' : 'red'}>
                                    <p style={{backgroundColor: 'white'}}>
                                        {item.name}
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
                    <Card title="审核意见" bordered={false}
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
                        <Button disabled={disabled}
                                onClick={() => this.dochecksave('ok')} style={{marginLeft: 10}}
                                type="primary">审核</Button>
                        <Button disabled={disabled} onClick={() => this.dochecksave('back')}
                                style={{marginLeft: 10}}>会签</Button>
                        <Dropdown disabled={disabled} overlay={this.state.menudata} placement="topCenter">
                            <Button style={{marginLeft: 10}} type="danger">驳回</Button>
                        </Dropdown>
                    </div>
                </div>
            )
        }

    }

}

export default connect(
    status => ({user: status.user}), {}
)(FlowView)
