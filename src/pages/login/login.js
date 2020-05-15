import React, {Component, Text} from 'react'
import {Redirect} from 'react-router-dom'
import {Form, Icon, Input, Button, Checkbox, Select, Spin, Modal, message} from 'antd';
import './login.less'
import logo from '../../assets/images/logo.png'
import wechat from '../../assets/images/wechat.png'
import {withTranslation} from 'react-i18next'
import {connect} from 'react-redux'
import {userlogin,wxlogin} from '../../redux/actions'
import queryString from 'query-string'
import {loginwithwx} from "../../api";
const {Option} = Select;
// require('@babel/plugin-proposal-decorators').default,
//     { "legacy":true, },
@withTranslation()
class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            isloading:false,
            ModelVisible:false,
        }
    }

    handleSubmit = (event) => {
        const {t} = this.props;
        event.preventDefault();
        console.log('提交表单');
        const form = this.props.form;
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                this.setState({isloading:true})
                const {username, password} = values;
                this.props.userlogin(username,password)
            }
        });
    }

   async componentWillMount() {
        //引入“微信内嵌二维码”脚本
       console.log(this.props)
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = false;
        script.src = 'http://rescdn.qqmail.com/node/ww/wwopenmng/js/sso/wwLogin-1.0.0.js';
        document.head.appendChild(script);
        const parsed = queryString.parse(this.props.location.search);
        if(parsed.code)
        {
            this.setState({isloading:true})
            this.props.wxlogin(parsed.code)
        }
    }

    showqrcode=()=>{
        this.setState({ModelVisible:true})
        window.WwLogin({
            "id" : "qrcode",
            "appid" : "ww18011af482c08ca9",
            "agentid" : "1000003",
            "redirect_uri" :"http://122.225.145.62/login",
            "state" : "123456",
            "href" : "",
        });
    }

    //切换语言
    changelang = (lang) => {
        this.props.i18n.changeLanguage(lang);
    }

    handleOk=()=>{
        this.setState({ModelVisible:false})
    }

    handleCancel=()=>{
        this.setState({ModelVisible:false})
    }

    render() {
        const {t} = this.props;
        const {getFieldDecorator} = this.props.form;
        const user=this.props.user
        if(user &&user.id) {
            return <Redirect to='/home'/>
        }
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
                    <div style={{marginTop:20, alignSelf:'flex-start'}}>
                        <span style={{fontSize:10}}>其他方式登录:</span><a onClick={()=>this.showqrcode()}><img src={wechat} style={{width:25, marginLeft:20}}/></a>
                    </div>
                    {this.state.isloading&&<Spin size="large" />}
                </div>
                <Modal
                    title={null}
                    visible={this.state.ModelVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    closable={false}
                >
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}} id={'qrcode'}>
                        <iframe  src="https://open.work.weixin.qq.com/wwopen/sso/qrConnect?appid=ww18011af482c08ca9&agentid=1000003&redirect_uri=http://122.225.145.62/login&state=123456&login_type=jssdk" frameBorder="0" scrolling="no" width="300px" height="400px"></iframe>
                    </div>
                </Modal>
            </div>
        )
    }
}

const WarpLogin = Form.create()(Login)
export default connect(
    status=>({
        user:status.user
    }),{
        userlogin,
        wxlogin
    }
)(WarpLogin)
