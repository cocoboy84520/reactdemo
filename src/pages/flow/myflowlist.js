import React, {Component} from 'react'
import {Form, Row, Col, Button, Icon, Select, Input, Table, DatePicker, Modal, Tag, message} from "antd";
import {Link} from "react-router-dom";

import PageHead from "../../components/pageheader";
import {connect} from "react-redux";
import {calendardel, getmyflow, getuserlist, noticedel, noticelist} from "../../api";
import moment from 'moment';
import {withTranslation} from "react-i18next";

const ButtonGroup = Button.Group;
const {Option, OptGroup} = Select;


@withTranslation()
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
            this.setState({data: myflow.data.list, loading: false})
        } catch (e) {
            message.error(e.message)
        }
    }


    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    };


    onDateChange = (date, datestring) => {
        console.log(datestring)
        this.setState({rangdate: datestring})
    }



    handleSearch =async e => {
        e.preventDefault();
        this.setState({loading:true})
        const {rangdate}=this.state
        const values=this.props.form.getFieldsValue();
        const {status,No,No2,new_title}=values
        try {
            const myflow = await getmyflow(rangdate,status,No,No2,new_title)
            this.setState({data: myflow.data.list, loading: false})
        } catch (e) {
            message.error(e.message)
        }
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
        const {t} =this.props
        const columns = [
            {
                title: t('申请时间'),
                dataIndex: 'add_time',
                width: 100,
                render: (text, record, index) => {
                    return moment(parseInt(text) * 1000).format("YYYY-MM-DD HH:mm");
                }
            }, {
                title: t('申请号'),
                dataIndex: 'No',
                width: 100,
                render:(text,record,index)=>{
                    if(record.status===0)
                    {
                        return <Link to={{pathname: '/myflow/editflow', state: {wf_id: record.id}}}>{text}</Link>
                    }else {
                        return <Link to={{pathname: '/myflow/flowview', state: {wf_id: record.id}}}>{text}</Link>
                    }
                }
            },
            {
                title: t('标题'),
                dataIndex: 'new_title',
                width: 200,
                render:(text,record,index)=>{
                    if(record.status===0)
                    {
                        return <Link to={{pathname: '/myflow/editflow', state: {wf_id: record.id}}}>{text}</Link>
                    }else {
                        return <Link to={{pathname: '/myflow/flowview', state: {wf_id: record.id}}}>{text}</Link>
                    }
                }
            },
            {
                title: t('申请人'),
                dataIndex: 'username',
                width: 100
            },
            {
                title: t('审批人'),
                dataIndex: 'name',
                width: 100
            },
            {
                title:t('状态'),
                dataIndex: 'status',
                width: 100,
                render: (text, record, index) => {

                    switch (text) {
                        case 0:
                            return <Tag color="#808080">{t('保存中')}</Tag>
                            break;
                        case 1:
                            return <Tag color="#FF8C00">{t('待审批')}</Tag>;
                            ;
                            break;
                        case 2:
                            return <Tag color="#008000">{t('审批通过')}</Tag>;
                            break;
                        case -1:
                            return <Tag color="#FF0000">{t('驳回')}</Tag>;
                            break;

                    }
                }
            },

        ];
        return (
            <div>
                <PageHead/>
                <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
                    <Row gutter={24}>
                        <Col span={6}>
                            <Form.Item label={t('申请时间')}>
                                {getFieldDecorator('add_time', {})(<DatePicker.RangePicker format='YYYY-MM-DD'
                                                                                           onChange={this.onDateChange}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label={t('状态')}>
                                {getFieldDecorator('status', {})(<Select allowClear={true}>
                                    <Option value="0">{t('保存中')}</Option>
                                    <Option value="1">{t('待审批')}</Option>
                                    <Option value="2">{t('已批准')}</Option>
                                    <Option value="-1">{t('已驳回')}</Option>
                                </Select>)}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label={t('申请号')}>
                                {getFieldDecorator('No', {})(<Input/>)}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label={t('批准号码')}>
                                {getFieldDecorator('No2', {})(<Input/>)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={10}>
                            <Form.Item label={t('标题')}>
                                {getFieldDecorator('new_title', {})(<Input/>)}
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Button type="primary" htmlType="submit">
                                {t('查找')}
                            </Button>
                            <Button style={{marginLeft: 8}} onClick={this.handleReset}>
                                {t('清除')}
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
