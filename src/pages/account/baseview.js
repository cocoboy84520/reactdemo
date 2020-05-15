import React, {Component} from 'react';
import {Form,Input} from 'antd'
@Form.create()
class Baseview extends Component {
    render() {
        const {getFieldDecorator}=this.props.form
        return (
            <div style={{display:"flex",padding:20}}>
               <Form layout={"horizontal"}>
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
               </Form>
            </div>
        );
    }
}

export default Baseview;
