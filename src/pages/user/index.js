import React, {Component} from 'react'
import {Form, Row, Col, Button, Icon, Input, Table, DatePicker, Modal, message, Tag} from "antd";

import './user.less'
import PageHead from "../../components/pageheader";
import {connect} from "react-redux";
import {calendardel, userlist, noticedel, noticelist, stopuser, enableduser} from "../../api";

const ButtonGroup = Button.Group;
const columns = [
    {
        title: '编号',
        dataIndex: 'id',
        // width: 100,

    },
    {
        title: '用户名',
        dataIndex: 'username',
        // width: 100
    },
    {
        title: '姓名',
        dataIndex: 'name',
    },
    {
        title: '部门',
        dataIndex: 'DepartName',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: '电话',
        dataIndex: 'mobile',
    },
    {
        title: '备用电话',
        dataIndex: 'backupmobile',
    },
    {
        title: '状态',
        dataIndex: 'status',
        render: (text, record, index) => {
            return text==1? <Tag color="#008000">正常</Tag>:<Tag color="#FF0000">禁用</Tag>;
        }
    },
];


class Index extends Component {


    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            data: [],
            loading: true,
            rangdate:[],
        }
    }

    async componentDidMount() {
        this.loaddata()
    }

    async loaddata()
    {
        // const {title,content,createtime}=this.props.form.getFieldsValue()
        try {
            const ret = await userlist()
            this.setState({data: ret.data, loading: false})
        }catch (e) {
            message.error(e.message)
        }
    }


    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    };


    onDateChange=(date,datestring)=>{
        this.setState({rangdate:datestring})
    }

    getFields() {
        const count = this.state.expand ? 10 : 6;
        const {getFieldDecorator} = this.props.form;
        const children = [];
        for (let i = 0; i < 10; i++) {
            children.push(
                <Col span={8} key={i} style={{display: i < count ? 'block' : 'none'}}>
                    <Form.Item label={`Field ${i}`}>
                        {getFieldDecorator(`field-${i}`, {
                            rules: [
                                {
                                    required: true,
                                    message: 'Input something!',
                                },
                            ],
                        })(<Input placeholder="placeholder"/>)}
                    </Form.Item>
                </Col>,
            );
        }
        return children;
    }

    handleSearch = e => {
        e.preventDefault();
        console.log(this.props.form.getFieldsValue());
    };

    handleReset = () => {
        this.props.form.resetFields();
    };


    add = () => {
        this.props.history.push('/user/add')
    }

    stop = () => {
        if (this.state.selectedRowKeys.length >0) {
            Modal.confirm({
                title: '询问',
                content: '确定要停用这个用户?',
                okText: '确认',
                cancelText: '取消',
                onOk: async () => {
                    try {
                        const result = await stopuser(this.state.selectedRowKeys)
                        this.loaddata()
                    } catch (e) {
                        message.error(e.message)
                    }
                }
            });
        } else {
            message.error('请先选中要操作的行')
        }
    }

    enableduser = () => {
        if (this.state.selectedRowKeys.length >0) {
            Modal.confirm({
                title: '询问',
                content: '确定要启用这个用户?',
                okText: '确认',
                cancelText: '取消',
                onOk: async () => {
                    try {
                        const result = await enableduser(this.state.selectedRowKeys)
                        this.loaddata()
                    } catch (e) {
                        message.error(e.message)
                    }
                }
            });
        } else {
            message.error('请先选中要操作的行')
        }
    }

    edit = (key) => {
        if (this.state.selectedRowKeys.length ==1) {
            this.props.history.push({pathname:'/user/edit',state:this.state.selectedRowKeys})
        } else {
            message.error('请先选中要操作的行')
        }
    }

    render() {
        const {selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
        };
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <PageHead/>
                <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
                    <Row gutter={24}>
                        <Col span={6}>
                            <Form.Item label='用户名'>
                                {getFieldDecorator('title', {})(<Input placeholder="请输入"/>)}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label='姓名'>
                                {getFieldDecorator('content', {})(<Input placeholder="请输入"/>)}
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label='部门'>
                                {getFieldDecorator('createuser', {})(<Input placeholder="请输入"/>)}
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item label='状态'>
                                {getFieldDecorator('startdate', {})(<DatePicker.RangePicker format='YYYY-MM-DD' onChange={this.onDateChange}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={3} style={{textAlign: 'right'}}>
                            <Button type="primary" htmlType="submit">
                                查找
                            </Button>
                            <Button style={{marginLeft: 8}} onClick={this.handleReset}>
                                清除
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <div className='tablehead'>
                    <div className='headright'>
                        <ButtonGroup>
                            <Button type="primary" icon={'plus'} onClick={this.add}>添加</Button>
                            <Button type="primary" icon={'edit'} onClick={this.edit}>编辑</Button>
                            <Button type="primary" icon={'check-circle'} onClick={this.enableduser}>启用</Button>
                            <Button type='danger' icon={'stop'} onClick={this.stop}>停用</Button>
                        </ButtonGroup>

                    </div>
                    <div style={{paddingLeft:20,paddingRight:20}}>
                        <Table rowKey={'id'} style={{backgroundColor: '#FFF'}} size='middle ' rowSelection={rowSelection}
                               loading={this.state.loading} columns={columns} dataSource={this.state.data}/>
                    </div>

                </div>
            </div>
        )
    }
}

const NoticeForm = Form.create()(Index)

export default connect(
    status => ({user: status.user}), {}
)(NoticeForm)
