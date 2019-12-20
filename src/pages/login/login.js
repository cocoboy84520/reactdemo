import React, {Component, Text} from 'react'
import {Form, Icon, Input, Button, Checkbox, Select} from 'antd';
import './login.less'
import logo from '../../assets/images/logo.png'
import {withTranslation} from 'react-i18next'
import {reqlogin} from '../../api'
import {errormodal} from "../../utils/msg";

const {Option} = Select;
// require('@babel/plugin-proposal-decorators').default,
//     { "legacy":true, },
@withTranslation()
class Login extends Component {

    handleSubmit = (event) => {
        const {t} = this.props;
        event.preventDefault();
        console.log('提交表单');
        const form = this.props.form;
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const {username, password} = values;
                const response = await reqlogin(username, password);
                if(response.status===1)
                {
                    errormodal(t('用户名或者密码错误'));
                }else{
                    console.log('登录成功');
                }
            }
        });
    }


    //切换语言
    changelang = (lang) => {
        this.props.i18n.changeLanguage(lang);
    }


    render() {
        const {t} = this.props;
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="login">
                <div className="login-frm">
                    <div className="logo">
                        <img src={logo} className="logoimg"/>
                        <h1>KanKen OA System</h1>
                    </div>
                    <p>康肯环保设备有限公司办公OA系统</p>
                    <div className="frm">
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    rules: [{required: true, whitespace: true, message: t('请输入用户名')}],
                                })(
                                    <Input
                                        size="large"
                                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        placeholder={t('用户名')}
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{required: true, message: t('请输入密码')}],
                                })(
                                    <Input
                                        size="large"
                                        prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        type="password"
                                        placeholder={t('密码')}
                                    />,
                                )}
                            </Form.Item>
                            <div className="forgetpass">
                                <div>
                                    <Checkbox>{t('记住密码')}</Checkbox>
                                </div>
                                <div>
                                    <a>{t('忘记密码')}</a>
                                </div>

                            </div>
                            <Button size="large" htmlType="submit" className="login-frm-btn"
                                    type="primary">{t('登录')}</Button>
                        </Form>
                    </div>

                    <div className="lang">
                        <a onClick={() => this.changelang('zh')} style={{margin: '0 20px'}}>简体中文(CN)</a>
                        <a onClick={() => this.changelang('jp')}>日本语(JP)</a>
                    </div>
                </div>

            </div>
        )
    }
}

const WarpLogin = Form.create()(Login)
export default WarpLogin