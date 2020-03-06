import React, { Component } from 'react'
import PageHead from '../../../components/pageheader/index'
import {Button, Col, DatePicker, Form, Input, Row, Table} from "antd";
import {connect} from "react-redux";
import {workflowlist} from "../../../api";
import {Link} from "react-router-dom";
const ButtonGroup = Button.Group;

const columns = [
    {
        title: '流程ID',
        dataIndex: 'wf_uid',
        width: 100,

    },
    {
        title: '流程名称',
        dataIndex: 'wf_name',
        width: 100
    },
    {
        title: '创建时间',
        dataIndex: 'wf_createtime',
        width: 100
    },
    {
        title: '创建人',
        dataIndex: 'wf_createuser',
        width: 100
    },
    {
        title:'操作',
        width:100,
        dataIndex:'wf_uid',
        render: (text, record, index) => {
            return <Link to={{pathname:'/flowadmin/flowdesign',state:{wf_uid:1}}} >流程设计</Link>
        }
    }

];

 class Default extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            data: [],
            loading: true,
            rangdate:[],
        }
    }

     componentDidMount() {
        this.loaddata()
     }

     async loaddata(){
        try{
            const ret=await workflowlist()
            this.setState({data:ret.data.list,loading:false})
        }catch (e) {

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
                            <Form.Item label='公告标题'>
                                {getFieldDecorator('title', {})(<Input placeholder="请输入"/>)}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label='公告内容'>
                                {getFieldDecorator('content', {})(<Input placeholder="请输入"/>)}
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label='创建者'>
                                {getFieldDecorator('createuser', {})(<Input placeholder="请输入"/>)}
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item label='创建时间'>
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
                            <Button type="primary" icon={'edit'}>编辑</Button>
                            <Button type='danger' icon={'delete'} onClick={this.del}>删除</Button>
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
const DefaultForm = Form.create()(Default)

export default connect(
    status => ({user: status.user}), {}
)(DefaultForm)
