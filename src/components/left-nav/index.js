import React, {Component} from 'react'
import {Link} from "react-router-dom"
import {Menu, Icon} from 'antd'
import menuList from "../../config/menuConfig";
import {withTranslation} from 'react-i18next'

import logo from '../../assets/images/logo.png'
import './index.less'

const {SubMenu} = Menu
@withTranslation()
class Index extends Component {

    getMenuNodes = (menuList) => {
        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon}/>
                            <span>{this.props.t(item.title)}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon}/>
                                <span>{this.props.t(item.title)}</span>
                            </span>
                                }
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }

        })
    }


    render() {
        return (
            <div className="left-nav">
                <Link to="/" className="left-nav-header">
                    <img src={logo} alt="logo"/>
                    <h1>康肯环保</h1>
                </Link>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    // inlineCollapsed={this.state.collapsed}
                >
                    {this.getMenuNodes(menuList)}
                </Menu>
            </div>
        )
    }
}

export default Index