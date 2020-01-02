import React, {Component} from 'react'
import './index.less'
import {Icon, Menu, Dropdown,} from 'antd'
import {connect} from 'react-redux'
import {withTranslation} from 'react-i18next'
import {userlogin} from "../../redux/actions";
const usermenu = (
    <Menu>
        <Menu.Item className='menuitem'>
            <Icon type="user" />
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                个人中心
            </a>
        </Menu.Item>
        <Menu.Item className='menuitem'>
            <Icon type="setting" />
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                个人设置
            </a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item className='menuitem'>
            <Icon type="poweroff" />
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                退出登录
            </a>
        </Menu.Item>
    </Menu>
);


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


    changelang=(lang)=>{
        this.props.i18n.changeLanguage(lang);
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
                    <Dropdown overlay={usermenu}>
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
    status=>({user:status.user}),{}
)(Index)