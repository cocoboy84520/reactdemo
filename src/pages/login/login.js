import React, { Component, Text } from 'react'
import { Form, Icon, Input, Button, Checkbox, Select } from 'antd';
import './login.less'
import logo from './image/logo.png'

const { Option } = Select;
class Login extends Component {

    handleSubmit=(event)=>{
        event.preventDefault();
        const form=this.props.form;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <div className="login-frm">
                    <div className="logo">
                        <img src={logo} className="logoimg" />
                        <h1>Kanken OA System</h1>
                    </div>
                    <p>康肯环保设备有限公司办公OA系统</p>
                    <div className="frm">
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true,whitespace:true, message: '请输入用户名!' }],
                                })(
                                    <Input
                                        size="large"
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="用户名"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入密码' }],
                                })(
                                <Input
                                    size="large"
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="密码"
                                />,
                                )}
                            </Form.Item>
                            <div className="forgetpass">
                                <div>
                                    <Checkbox>记住密码</Checkbox>
                                </div>
                                <div>
                                    <a>忘记密码</a>
                                </div>

                            </div>
                            <Button size="large" htmlType="submit" className="login-frm-btn" type="primary">登录</Button>
                        </Form>
                    </div>

                    <div className="lang">
                        <a style={{ margin: '0 20px' }}>简体中文(CN)</a>
                        <a>日本语(JP)</a>
                    </div>
                </div>

            </div>
        )
    }
}

const WarpLogin = Form.create()(Login)
export default WarpLogin