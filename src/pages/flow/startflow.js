import React, {Component} from 'react'
import PageHead from "../../components/pageheader";
import './startflow.less'
import {Form, Input, Row, Col, Button, Card, Select, Icon, Upload, message,Modal} from "antd";
import FormDesign from '../../components/formdesign';
import {get_formdesign, getuserlist, saveflow, startflow} from "../../api";
import {withTranslation} from 'react-i18next'
import {connect} from "react-redux";
import {randomNumber} from '../../common/common'
import locale from '../../locale/zh'
import moment from "moment";
const {TextArea} = Input;
const {FormDisplay} = FormDesign;
const FormItem = Form.Item;
const {Option, OptGroup} = Select;
const { confirm } = Modal;
@withTranslation()
class FormShow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userlist: [],
            fileList: [],
            loading:false
        }
    }

    loaduser = async () => {
        const userlist = await getuserlist()
        if (userlist.ret === 200) {
            this.setState({userlist: userlist.data})
        }
    }

    onChange = (e) => {
        let fileList = e.fileList;
        console.log(fileList)
        let aaa = fileList.filter(file => {
            console.log(file)
            if(file.response)
            {
                if(file.response.ret==200)
                {
                    file.url=file.response.data.url
                    return true
                }else {
                    message.error(`文件上传错误:${file.response.msg}`)
                    return false
                }
            }else{
                return true
            }
        })

        this.setState({fileList:aaa});
    }

    normFile = e => {
        console.log(e)
        return this.state.fileList
    };

    componentDidMount() {
        this.loaduser()
    }

    handleSubmit = e => {
        e.preventDefault();
        confirm({
            title: '询问?',
            content: '您确定要提交申请吗？',
            onOk:()=> {
                this.props.form.validateFields(async (err, values) => {
                    for(let key  in values){
                        if(key.indexOf('dateformat_')===0)
                        {
                            values[key]=moment(values[key]).format('YYYY-MM-DD HH:mm')
                        }
                    }
                    if (!err) {
                        const result=await startflow(values,this.props.location.state.item.id);
                        if(result.ret===200)
                        {
                            message.success('申请成功')
                            this.props.history.push('/myflow')
                        }else{
                            message.error(result.msg)
                        }
                    }
                });
            },
            onCancel() {},
        });

    };

    saveflow=()=>{
        this.props.form.validateFields(async (err, values) => {
            for(let key  in values){
                if(key.indexOf('dateformat_')===0)
                {
                    values[key]=moment(values[key]).format('YYYY-MM-DD HH:mm')
                }
            }
            console.log(values)
            if (!err) {
                const result=await saveflow(values,this.props.location.state.item.id);
                if(result.ret===200)
                {
                    message.success('保存成功')
                    this.props.history.push('/myflow')
                }
            }
        });
    }

    render() {
        const {t} = this.props;
        const {fieldsData, form} = this.props;
        const {getFieldDecorator} = this.props.form
        const item = this.props.location.state.item
        console.log(this.props)
        const props = {
            name: 'upfile',
            action: '/index.php?s=File.upload',
            method:'post',
            onChange: this.onChange,
            multiple: true,
            headers:{'Authorization':this.props.user.Token}
        };
        const {fileList} = this.state
        return (
            <Form
                onSubmit={this.handleSubmit}
            >
                <div style={{marginBottom:50}}>
                    <Card title={item.flow_name} headStyle={{fontSize: 24, fontWeight: '900', textAlign: 'center'}}
                          bordered={false}>
                        <Row gutter={16}>
                            <Col lg={6} md={12} sm={24}>
                                <Form.Item
                                    label={t('申请号')}
                                >
                                    {getFieldDecorator('No', {rules: [{required: true, message: t('请输入申请号')}]})(<Input placeholder="请输入申请号"/>)}

                                </Form.Item>
                            </Col>
                            <Col xl={{span: 6, offset: 2}} lg={{span: 8}} md={{span: 12}} sm={24}>
                                <Form.Item label={t('批准号')}>
                                    {getFieldDecorator('No2', {})(<Input placeholder="请输入批准号"/>)}
                                </Form.Item>
                            </Col>
                            <Col xl={{span: 6, offset: 2}} lg={{span: 8}} md={{span: 12}} sm={24}>
                                <Form.Item label={t('申请部门')}
                                >
                                    {getFieldDecorator('department', {
                                        initialValue: this.props.user.departname
                                    })(<Input disabled={true} placeholder=""/>)}
                                </Form.Item>
                            </Col>

                        </Row>
                        <Row gutter={16}>
                            <Col lg={6} md={12} sm={24}>
                                <Form.Item label={t('申请人')}>
                                    {getFieldDecorator('createuser', {
                                        initialValue: this.props.user.name
                                    })(<Input disabled={true} placeholder="请输入申请人"/>)}
                                </Form.Item>
                                <Form.Item>
                                {getFieldDecorator('flowtype', {
                                    initialValue:item.flow_name
                                })(<Input type={"hidden"}/>)}
                            </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('formid', {
                                        initialValue:this.props.location.state.item.id
                                    })(<Input type={"hidden"}/>)}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                    <Card title={t('申请内容')} bordered={false} headStyle={{fontWeight: '900'}} style={{marginTop: 20}}>
                        <FormDisplay
                            fieldsData={fieldsData}
                            form={form}
                        />
                    </Card>
                    <Card title={t('附件')} bordered={false} headStyle={{fontWeight: '900'}} style={{marginTop: 20}}>
                        <Row gutter={16}>
                            <Col lg={8} md={8} sm={24}>
                                <Form.Item label={t("附件")}>
                                    {getFieldDecorator('files', {
                                        valuePropName:'fileList',
                                        getValueFromEvent: this.normFile
                                    })(<Upload showUploadList={{showRemoveIcon:true,showDownloadIcon:false}} {...props} fileList={this.state.fileList}
                                    >
                                        <Button>
                                            <Icon type="upload"/> 上传
                                        </Button>
                                    </Upload>)}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                    <Card title={t('审批方')} bordered={false} headStyle={{fontWeight: '900'}} style={{marginTop: 20}}>
                        <Row gutter={16}>
                            <Col lg={8} md={8} sm={24}>
                                <Form.Item label={("抄送")}>
                                    {getFieldDecorator('cc', {})(<Select mode='multiple'>
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
                        </Row>
                        <Row gutter={16}>
                            <Col lg={16} md={16} sm={24}>
                                <Form.Item label={t('备注')}>
                                    {getFieldDecorator('remark', {})(<TextArea  rows={4} placeholder="备注"/>)}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </div>
                <div style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    marginTop: 20
                }}>
                    <Button onClick={this.saveflow}>
                        {t('保存')}
                    </Button>
                    <Button style={{marginLeft: 10}} type={'primary'} htmlType="submit">
                        {t('申请')}
                    </Button>
                {/*    <Button style={{marginLeft: 10}} type={'danger'} htmlType="submit">*/}
                {/*    撤回*/}
                {/*</Button>*/}
                </div>
                {/*<FormItem wrapperCol={{span: 10, offset: 11}}>*/}
                {/*    <Button htmlType="submit">*/}
                {/*        保存*/}
                {/*    </Button>*/}
                {/*    <Button type={'primary'} htmlType="submit">*/}
                {/*        申请*/}
                {/*    </Button>*/}
                {/*    <Button type={'danger'} htmlType="submit">*/}
                {/*        撤回*/}
                {/*    </Button>*/}
                {/*</FormItem>*/}
            </Form>
        );
    }
}

const WrappedFormShow = Form.create({
    mapPropsToFields(props) {
        let obj = {};
        let {initValues} = props;
        if (initValues) {
            Object.keys(initValues).forEach(key => {
                obj[key] = Form.createFormField({
                    value: initValues[key]
                });
            });
        }
        return obj;
    }
})(FormShow);


@Form.create()
class Startflow extends Component {


    constructor(props) {
        super(props);
        this.state = {
            fieldsData: [],
        }
    }

    async componentDidMount() {
        const ret = await get_formdesign(this.props.location.state.item.id)
        if (ret.ret === 200) {
            if (ret.data) {
                if (ret.data.designdata)
                    this.setState({fieldsData: JSON.parse(ret.data.designdata)})
            }
        }
    }


    render() {
        const formItemLayout = {
            labelCol: {
                span: 8
            },
            wrapperCol: {
                span: 10
            }
        }

        return (
            <div>
                <PageHead/>
                <div className={'addformdiv'}>
                    <WrappedFormShow {...this.props} fieldsData={this.state.fieldsData}/>
                </div>
            </div>
        )
    }
}

export default connect(
    status => ({user: status.user}), {}
)(Startflow)
