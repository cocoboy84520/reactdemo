import React, {Component} from 'react';
import {Form, Input, Button, message} from 'antd'
import {updateaccount} from "../../api";
import {connect} from "react-redux";
import {updateuserinfo} from '../../redux/actions'
@Form.create()
@connect(status=>status,{updateuserinfo})
class Baseview extends Component {

    hanldsubmit=(e)=>{
        e.preventDefault();
        console.log('submit')
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                try {
                    let {NO,name,email,mobile,backupmobile}=values
                    const ret=await updateaccount(NO,name,email,mobile,backupmobile)
                    if(ret.ret===200)
                    {
                        this.props.updateuserinfo(ret.data)
                        message.success('更新资料成功')
                    }
                }catch (e) {
                        message.error(e.message)
                }
            }
        })
    }

    componentDidMount() {
        this.props.form.setFieldsValue({
            NO:this.props.user.NO,
            name:this.props.user.name,
            email:this.props.user.email,
            mobile:this.props.user.mobile,
            backupmobile:this.props.user.backupmobile
        });
    }

    render() {
        const {getFieldDecorator}=this.props.form
        return (
            <div style={{display:"flex",padding:20}}>
               <Form layout={"horizontal"} onSubmit={this.hanldsubmit}>
                   <Form.Item label="员工编号">
                       {getFieldDecorator('NO', {
                           rules: [{ required: true, message: '请输入员工编号' }],
                       })(<Input style={{width:200}} />)}
                   </Form.Item>
                   <Form.Item label="姓名">
                       {getFieldDecorator('name', {
                           rules: [{ required: true, message: '请输入姓名' }],
                       })(<Input style={{width:200}} />)}
                   </Form.Item>
                   <Form.Item label="Email">
                       {getFieldDecorator('email', {
                           rules: [{ required: true, message: '请输入邮件地址' }],
                       })(<Input style={{width:300}} />)}
                   </Form.Item>
                   <Form.Item label="手机号">
                       {getFieldDecorator('mobile', {
                           rules: [{ required: true, message: '请输入手机号' }],
                       })(<Input style={{width:300}} />)}
                   </Form.Item>
                   <Form.Item label="备用手机号">
                       {getFieldDecorator('backupmobile', {
                           rules: [{ required: false, message: '请输入手机号' }],
                       })(<Input style={{width:300}} />)}
                   </Form.Item>

                       <Button type="primary" htmlType={"submit"}>提交</Button>

               </Form>
            </div>
        );
    }
}

export default Baseview;
