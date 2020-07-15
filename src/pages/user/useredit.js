import React, {Component} from 'react'
import PageHead from '../../components/pageheader'
import {Form, Input, Select, Upload, Button, Icon, message} from "antd";
import {adduser, edituser, getaccountdetail, getDartMentList} from "../../api";
const {Option} = Select;
@Form.create()
class Useredit extends Component{
//
    constructor(props, context) {
        super(props, context);
        this.state = {
            DepartmentList:[],
        };
    }

    componentDidMount() {
        console.log(this.props)
       this.LoadDartMent()
        this.loadAccountDetail()
    }

    loadAccountDetail=async ()=>{
        try{
            const ret=await getaccountdetail(this.props.location.state)
            const account=ret.data
            for(let key  in ret.data){
                console.log(key);
                console.log(ret.data[key])
                this.props.form.setFieldsValue(ret.data)
            }
        }catch (e) {

        }
    }

    LoadDartMent=async ()=>{
        try{
            const ret=await getDartMentList()
            this.setState({DepartmentList:ret.data})
        }catch (e) {
            message.error('部门数据获取错误')
        }
    }

    handleSubmit=(event)=>{
        event.preventDefault()
        this.props.form.validateFields(async (err, values) => {
            if(!err)
            {
                try{
                    const ret =await edituser(this.props.location.state,values.username,values.name,values.email,values.mobile,values.departmentid,values.backupmobile,values.password)
                    if(ret.ret===200)
                    {
                        this.props.history.push('/user')
                    }else{
                        message.error(ret.msg)
                    }
                }catch (e) {

                }
            }
        })
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className={'addnotice'}>
                <PageHead/>
                <div className='addformdiv'>
                    <Form labelCol={{span: 2, offset: 4}} wrapperCol={{span: 12, offset: 0}} onSubmit={this.handleSubmit}>
                        <Form.Item label={("用户名")}>
                            {getFieldDecorator('username', {
                                rules: [{required: true, message: '请填写用户名'}]
                            })(<Input style={{width:300}}/>)}
                        </Form.Item>
                        <Form.Item label={("姓名")}>
                            {getFieldDecorator('name', {
                                rules: [{required: true, message: '请填写姓名'}]
                            })(<Input style={{width:300}}/>)}
                        </Form.Item>
                        <Form.Item label={("部门")}>
                            {getFieldDecorator('departmentid', {
                                rules: [{required: true, message: '请选择部门'}]
                            })(<Select  style={{ width: 120 }} >
                                {this.state.DepartmentList.map((item,index)=>
                                    <Option key={index} value={item.id}>{item.DepartName}</Option>
                                )}
                            </Select>)}
                        </Form.Item>
                        <Form.Item label={("Email")}>
                            {getFieldDecorator('email', {
                                rules: [{required: true, message: '请填写电子邮件'}]
                            })(<Input  style={{width:500}}/>)}
                        </Form.Item>
                        <Form.Item label={("密码")}>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: '请填写密码'}]
                            })(<Input.Password  style={{width:500}}/>)}
                        </Form.Item>
                        <Form.Item label={("电话")}>
                            {getFieldDecorator('mobile', {
                                rules: [{required: true, message: '请填写电话'}]
                            })(<Input  style={{width:500}}/>)}
                        </Form.Item>
                        <Form.Item label={("备用电话")}>
                            {getFieldDecorator('backupmobile', {
                                rules: [{ message: '请填写备用电话'}]
                            })(<Input  style={{width:500}}/>)}
                        </Form.Item>
                        <div style={{flex:1, justifyContent:'center', alignItems:'center', marginTop:20,textAlign:'center'}}>
                            <Button  type={'primary'}  htmlType="submit">保存</Button>
                            <Button style={{marginLeft:20}} onClick={() => this.props.history.goBack()}>返回</Button>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Useredit
