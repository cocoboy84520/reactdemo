import React, {Component} from 'react'
import {Form, Row, Col, Button, Icon, Select, Input, Table, DatePicker, Modal, Tag, message} from "antd";
import {Link} from "react-router-dom";

import PageHead from "../../components/pageheader";
import {connect} from "react-redux";
import {calendardel, getmyflow, getuserlist, noticedel, noticelist} from "../../api";
import moment from 'moment';

const ButtonGroup = Button.Group;
const {Option, OptGroup} = Select;
const columns = [
    {
        title: '申请时间',
        dataIndex: 'add_time',
        width: 100,
        render: (text, record, index) => {
            return moment(parseInt(text) * 1000).format("YYYY-MM-DD HH:mm");
        }
    }, {
        title: '申请号',
        dataIndex: 'No',
        width: 100,
        render:(text,record,index)=>{
            return <Link to={{pathname: '/myflow/flowview', state: {flowid: text}}}>{text}</Link>
        }

    },
    {
        title: '标题',
        dataIndex: 'new_title',
        width: 200,
        render:(text,record,index)=>{
            return <Link to={{pathname: '/myflow/flowview', state: {flowid: text}}}>{text}</Link>
        }
    },
    {
        title: '申请人',
        dataIndex: 'uid',
        width: 100
    },
    {
        title: '审批人',
        dataIndex: 'name',
        width: 100
    },
    {
        title: '状态',
        dataIndex: 'status',
        width: 100,
        render: (text, record, index) => {

            switch (text) {
                case 0:
                    return <Tag color="#808080">保存中</Tag>
                    break;
                case 1:
                    return <Tag color="#FF8C00">待审批</Tag>;
                    ;
                    break;
                case 2:
                    return <Tag color="#008000">审批通过</Tag>;
                    break;
                case -1:
                    return <Tag color="#FF0000">驳回</Tag>;
                    break;

            }
        }
    },

];


class Myflowlist extends Component {


    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            data: [],
            loading: true,
            rangdate: [],
            userlist: [],
        }
    }


    loaduser = async () => {
        const userlist = await getuserlist()
        if (userlist.ret === 200) {
            this.setState({userlist: userlist.data})
        }
    }

    async componentDidMount() {
        this.loaduser()
        this.loaddata()
    }

    loaddata = async () => {
        try {
            const myflow = await getmyflow()
            console.log(myflow)
            this.setState({data: myflow.data, loading: false})
        } catch (e) {
            message.error(e.message)
        }
    }


    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    };


    onDateChange = (date, datestring) => {
        this.setState({rangdate: datestring})
    }

    

    handleSearch = e => {
        e.preventDefault();
        console.log(this.props.form.getFieldsValue());
    };

    handleReset = () => {
        this.props.form.resetFields();
    };

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
                            <Form.Item label='申请日期'>
                                {getFieldDecorator('add_time', {})(<DatePicker.RangePicker format='YYYY-MM-DD'
                                                                                           onChange={this.onDateChange}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label='状态'>
                                {getFieldDecorator('status', {})(<Select>
                                    <Option value="0">保存中</Option>
                                    <Option value="1">待审批</Option>
                                    <Option value="2">已批准</Option>
                                    <Option value="-1">已驳回</Option>
                                </Select>)}
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label={("创建者")}>
                                {getFieldDecorator('uid', {})(<Select>
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
                                </Select>)}
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label='申请号码'>
                                {getFieldDecorator('No', {})(<Input/>)}
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label='批准号码'>
                                {getFieldDecorator('No2', {})(<Input/>)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={10}>
                            <Form.Item label='标题'>
                                {getFieldDecorator('new_title', {})(<Input/>)}
                            </Form.Item>
                        </Col>
                        <Col span={4}>
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
                    <div style={{paddingLeft: 20, paddingRight: 20}}>
                        <Table rowKey={'id'} style={{backgroundColor: '#FFF'}} size='middle '
                               rowSelection={rowSelection}
                               loading={this.state.loading} columns={columns} dataSource={this.state.data}/>
                    </div>

                </div>
            </div>
        )
    }
}

const MyflowForm = Form.create()(Myflowlist)

export default connect(
    status => ({user: status.user}), {}
)(MyflowForm)
