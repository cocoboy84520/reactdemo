import React, {Component} from 'react'
import {Form, Row, Col, Button, Icon, Input, Table, DatePicker, Modal, message,Select,Tag} from "antd";

import {withTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {addentrust, delentrust, getentrustlist, getuserlist, loginwithwx, starteditflow} from "../../api";
import moment from "moment";
const {Option, OptGroup} = Select;

@Form.create()
@withTranslation()
class Entrust extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            userlist:[]
        }
        this.columns = [
            {
                title: '编号',
                dataIndex: 'id',
                width: 100,

            },{
                title: '委托人',
                dataIndex: 'createid',
                width: 200
            },
            {
                title: '受托人',
                dataIndex: 'entrustuser',
                width: 200
            },
            {
                title: '开始时间',
                dataIndex: 'starttime',
                width: 200
            },
            {
                title: '结束时间',
                dataIndex: 'endtime',
                width: 200
            },
            {
                title: '委托形式',
                dataIndex: 'type',
                width: 200,
                render: (text, record, index) => {
                    switch (text) {
                        case 0:
                            return <Tag color="#808080">委托审批</Tag>
                            break;
                        case 1:
                            return <Tag color="#008000">自动审批</Tag>;
                            break;

                    }
                }
            },
            {
                title: '操作',
                dataIndex: 'id',
                render: (text, record, index) => {
                    return <a  onClick={() => this.del(text)}>
                        删除
                    </a>
                }
            },
        ];
    }

    del=async(id)=>{
        let ret=await delentrust(id)
        if(ret.ret=200)
        {
            this.loadentrustlist()
        }
    }

    componentDidMount() {
        this.loaduserlist()
        this.loadentrustlist()
    }

    loaduserlist=async ()=>{
        const userlist = await getuserlist()
        if (userlist.ret === 200) {
            this.setState({userlist: userlist.data})
        }
    }

    loadentrustlist=async ()=>{
        let ret=await getentrustlist();
        if(ret.ret===200)
        {
            this.setState({data:ret.data.list,loading:false})
        }
    }

    onDateChange = (date, datestring) => {
        console.log(datestring)
        this.setState({rangdate: datestring})
    }


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                let {type,entrustuser,startdate}=values
                debugger
                let starttime=this.state.rangdate[0]
                let endtime=this.state.rangdate[1]
                let ret=await addentrust(type,entrustuser,starttime,endtime)
                if(ret.ret===200)
                {
                    this.loadentrustlist()
                }
            }
        });
    };


    render() {
        const {getFieldDecorator} = this.props.form;
        const {t}=this.props
        return (
            <div style={{padding:20}}>
                <Form className="ant-advanced-search-form"  onSubmit={this.handleSubmit}>
                    <Row gutter={24}>
                        <Col span={4}>
                            <Form.Item label={t('不在处理')}>
                                {getFieldDecorator('type', {rules: [{required: true, message: t('请选择委托类型')}],})(<Select defaultValue="lucy" style={{ width: 120 }}>
                                    <Option value="0">委托审批</Option>
                                    <Option value="1">自动审批</Option>
                                </Select>)}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label={t("委托用户")}>
                                {getFieldDecorator('entrustuser', {rules: [{required: true, message: t('请选择委托用户')}],})(<Select >
                                    {this.state.userlist.map((item, index) => {
                                            return (
                                                <OptGroup key={index} label={item.DepartName}>
                                                    {item.users.map((user, uindex) => {
                                                        return (
                                                            <Option key={uindex} value={user.id}>{user.name}</Option>
                                                        )
                                                    })}

                                                </OptGroup>
                                            )
                                        }
                                    )}
                                </Select>)}
                            </Form.Item>
                        </Col>
                        <Col span={10}>
                            <Form.Item label={t("创建时间")}>
                                {getFieldDecorator('startdate', {rules: [{required: true, message: t('请选择时间段')}],})(<DatePicker.RangePicker showTime={true} format='YYYY-MM-DD HH:mm:ss' onChange={this.onDateChange}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={3} style={{textAlign: 'right'}}>
                            <Button type="primary" htmlType="submit">
                                {t("添加")}
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <div className='tablehead'>
                    <div className='headright'>
                    </div>
                    <div style={{paddingLeft:20,paddingRight:20}}>
                        <Table rowKey={'id'} style={{backgroundColor: '#FFF'}} size='middle '
                               loading={this.state.loading} columns={this.columns} dataSource={this.state.data}/>
                    </div>

                </div>
            </div>
        );
    }
}

export default Entrust;
