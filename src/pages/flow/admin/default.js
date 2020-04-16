import React, {Component} from 'react'
import PageHead from '../../../components/pageheader/index'
import {Button, Col, DatePicker, Form, Input, message, Modal, Row, Table} from "antd";
import {connect} from "react-redux";
import {addflow, workflowlist} from "../../../api";
import {Link} from "react-router-dom";

const ButtonGroup = Button.Group;

const columns = [
    {
        title: '流程ID',
        dataIndex: 'id',
        width: 100,

    },
    {
        title: '流程分类',
        dataIndex: 'type',
        width: 100
    },
    {
        title: '流程名称',
        dataIndex: 'flow_name',
        width: 100
    },
    {
        title: '流程描述',
        dataIndex: 'flow_desc',
        width: 100
    },
    {
        title: '状态',
        dataIndex: 'status',
        width: 100
    },
    {
        title: '创建者',
        dataIndex: 'uid',
        width: 100
    },
    {
        title: '操作',
        width: 100,
        dataIndex: 'id',
        render: (text, record, index) => {
            return (
                <div>
                    <Link to={{pathname: '/flowadmin/flowdesign', state: {flowid: text}}}>流程设计</Link>
                    <Link style={{marginLeft:20
                    }} to={{pathname: '/flowadmin/formdesign', state: {flowid: text}}}>表单设计</Link>
                </div>

            )
        }
    }

];

// 添加流程form
const AddFlowForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    title="添加流程"
                    visible={visible}
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form>
                        <Form.Item label="流程分类">
                            {getFieldDecorator('type', {
                                rules: [{ required: true, message: '请选择流程分类' }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="流程名称">
                            {getFieldDecorator('flowname',{
                                rules: [{ required: true, message: '请输入流程名称' }],
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item label="流程描述">
                            {getFieldDecorator('flowdesc')(<Input type="textarea" />)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);
class Default extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            data: [],
            loading: true,
            rangdate: [],
            modalvisible: false,
        }
    }

    componentDidMount() {
        this.loaddata()
    }

    async loaddata() {
        try {
            const ret = await workflowlist()
            this.setState({data: ret.data.list, loading: false})
        } catch (e) {

        }
    }


    add = () => {
       this.setState({modalvisible:true})
    }

    handleCancel=()=>{
        this.setState({modalvisible:false})
    }

    handleCreate = () => {
        const { form } = this.formRef.props;
        form.validateFields(async(err, values) => {
            if (err) {
                return;
            }
            const {type,flowname,flowdesc}=values
            let ret=await addflow(type,flowname,flowdesc)
            if(ret.ret===200)
            {
                form.resetFields();
                this.setState({ modalvisible: false });
                this.loaddata()
            }else {
                message.error(ret.msg)
            }

        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
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
                <AddFlowForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.modalvisible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
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
                                {getFieldDecorator('startdate', {})(<DatePicker.RangePicker format='YYYY-MM-DD'
                                                                                            onChange={this.onDateChange}/>)}
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

const DefaultForm = Form.create()(Default)

export default connect(
    status => ({user: status.user}), {}
)(DefaultForm)
