import React, {Component} from 'react'
import {Link,withRouter} from "react-router-dom"
import {Menu, Icon} from 'antd'
import menuList from "../../config/menuConfig";
import {withTranslation} from 'react-i18next'

import logo from '../../assets/images/logo.png'
import './index.less'

const {SubMenu} = Menu
@withTranslation()
@withRouter
class Index extends Component {

    getMenuNodes = (menuList) => {
        const path=this.props.location.pathname;
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
                const cItem=item.children.find(cItem=>cItem.key===path)

                if(cItem){
                    this.openKey=item.key
                }
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

    componentWillMount() {
        this.menuNodes=this.getMenuNodes(menuList)
    }

    render() {
        const path=this.props.location.pathname;
        return (
            <div className="left-nav">
                <Link to="/" className="left-nav-header">
                    <img src={logo} alt="logo"/>
                    <h1>康肯环保</h1>
                </Link>
                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={[this.openKey]}
                    mode="inline"
                    theme="dark"
                    // inlineCollapsed={this.state.collapsed}
                >
                    {this.menuNodes}
                </Menu>
            </div>
        )
    }
}

export default Index