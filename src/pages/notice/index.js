import React, {Component} from 'react'
import {Form, Row, Col, Button, Icon, Input, Table, DatePicker, Modal, message} from "antd";
import {Link} from "react-router-dom";
import './notice.less'
import PageHead from "../../components/pageheader";
import {connect} from "react-redux";
import {calendardel, noticedel, noticelist} from "../../api";
import {withTranslation} from "react-i18next";

const ButtonGroup = Button.Group;



@withTranslation()
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

    loaddata=async()=>
    {
        const {title,content,createuser}=this.props.form.getFieldsValue()
        let createtime=this.state.rangdate
        try {
            const ret = await noticelist(title,content,createuser,createtime)
            this.setState({data: ret.data.list, loading: false})
        }catch (e) {
            message.error(e.message)
        }
    }


    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    };


    onDateChange=(date,datestring)=>{
        console.log(datestring)
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
        this.loaddata()
    };

    handleReset = () => {
        this.props.form.resetFields();
    };


    add = () => {
        this.props.history.push('/notice/add')
    }

    edit=()=>{
        if (this.state.selectedRowKeys.length > 0){
            this.props.history.push({pathname:'/notice/edit',state:{data:this.state.selectedRowKeys[0]}})
        }else{
            message.error('请先选中要编辑的行')
        }
    }

    del = () => {
        if (this.state.selectedRowKeys.length > 0) {
            Modal.confirm({
                title: 'Confirm',
                content: '确定要删除这个通知?',
                okText: '确认',
                cancelText: '取消',
                onOk: async () => {
                    try {
                        const result = await noticedel(this.state.selectedRowKeys)
                        this.loaddata()
                    } catch (e) {
                        message.error(e.message)
                    }
                }
            });
        } else {
            message.error('请先选中要删除的行')
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
        const {t}=this.props

        const columns = [
            {
                title: t('编号'),
                dataIndex: 'id',
                width: 100,

            },{
                title: t('发布时间'),
                dataIndex: 'addtime',
                width: 200
            },
            {
                title: t('发布者'),
                dataIndex: 'publisher',
                width: 200
            },
            {
                title: t('类型'),
                dataIndex: 'type',
                width: 200
            },
            {
                title: t('标题'),
                dataIndex: 'title',
                render: (text, record, index) => {
                    return <Link to={{pathname: '/notice/show', state: {noticeid: record.id}}}>{text}</Link>
                }
            },
        ];

        return (
            <div>
                <PageHead/>
                <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
                    <Row gutter={24}>
                        <Col span={6}>
                            <Form.Item label={t('公告标题')}>
                                {getFieldDecorator('title', {})(<Input placeholder={t("请输入")}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label={t("公告内容")}>
                                {getFieldDecorator('content', {})(<Input placeholder={t("请输入")}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label={t("创建者")}>
                                {getFieldDecorator('createuser', {})(<Input placeholder={t("请输入")}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item label={t("创建时间")}>
                                {getFieldDecorator('startdate', {})(<DatePicker.RangePicker format='YYYY-MM-DD' onChange={this.onDateChange}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={3} style={{textAlign: 'right'}}>
                            <Button type="primary" htmlType="submit">
                                {t("查找")}
                            </Button>
                            <Button style={{marginLeft: 8}} onClick={this.handleReset}>
                                {t("清除")}
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <div className='tablehead'>
                    <div className='headright'>
                        <ButtonGroup>
                            <Button type="primary" icon={'plus'} onClick={this.add}>{t("添加")}</Button>
                            <Button type="primary" onClick={this.edit} icon={'edit'}>{t("编辑")}</Button>
                            <Button type='danger' icon={'delete'} onClick={this.del}>{t("删除")}</Button>
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
