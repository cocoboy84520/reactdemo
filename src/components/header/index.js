import React, {Component} from 'react'
import './index.less'
import {Icon, Menu, Dropdown,Modal} from 'antd'
import {connect} from 'react-redux'
import {withTranslation} from 'react-i18next'
import {logout} from "../../redux/actions";


@withTranslation()
class Index extends Component {

     langmenu=()=> {
         return (
             <Menu>
                 <Menu.Item className='menuitem'>
                     <a onClick={()=>this.changelang('zh')}>
                         中文简体(zh-cn)
                     </a>
                 </Menu.Item>
                 <Menu.Item className='menuitem'>
                     <a onClick={()=>this.changelang('jp')}>
                         日本语(jp)
                     </a>
                 </Menu.Item>
             </Menu>
         )
     }

     usermenu =()=>{
        return (
             <Menu onClick={(e)=>this.menuclick(e)}>
                 <Menu.Item className='menuitem'>
                     <Icon type="user" />
                         个人中心
                 </Menu.Item>
                 <Menu.Item className='menuitem'>
                     <Icon type="setting" />
                     个人设置
                 </Menu.Item>
                 <Menu.Divider />
                 <Menu.Item className='menuitem'>
                     <Icon type="poweroff" />
                     退出登录
                 </Menu.Item>
             </Menu>
         );
     }

    changelang=(lang)=>{
        this.props.i18n.changeLanguage(lang);
    }

    menuclick=(e)=>{
         if(e.key=='item_3')
         {
             this.logout()
         }
         if(e.key=='item_1')
         {
             this.props.history.push('/account')
         }
    }

    logout=()=>{
         Modal.confirm({
             title: '询问',
             content: '确定要退出系统吗?',
             okText:"确认",
             cancelText:'取消',
             onOk:()=> {
                 this.props.logout()
                 this.props.history.replace('login')
             }
         })
    }

    render() {
         const {t}=this.props
        return (
            <div className='header-nav'>
                <div className='header-nav-left'>
                    <Icon type="menu-fold" style={{fontSize:'20px',cursor:'pointer'}}/>
                </div>
                <div className='header-nav-right'>
                    {/*//消息*/}
                    <span>
                        <Icon type="bell"/>
                    </span>
                    {/*//头像*/}
                    <Dropdown overlay={this.usermenu}>
                        <span className="ant-dropdown-link" href="#" style={{cursor:'pointer'}}>
                            <div className='avatar-drop'>
                                <img
                                    src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
                                    alt="avatar"/>
                                <span>
                                    {this.props.user.username}
                        </span>
                            </div>
                        </span>
                    </Dropdown>
                    <Dropdown overlay={this.langmenu}>
                        <span className="ant-dropdown-link" href="#" style={{cursor:'pointer'}}>
                            <span>
                                <Icon type="global"/>
                            </span>
                        </span>
                    </Dropdown>
                </div>
            </div>

        )
    }
}
export default connect(
    status=>({user:status.user}),{logout}
)(Index)
