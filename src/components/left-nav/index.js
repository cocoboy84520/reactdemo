import React,{Component} from 'react'
import {Link} from "react-router-dom"
import { Menu, Icon } from 'antd'


import logo from '../../assets/images/logo.png'
import './index.less'
const { SubMenu } = Menu
export default class Index extends Component{
    render() {
        return(
            <div className="left-nav">
                <Link to="/" className="left-nav-header">
                    <img src={logo}/>
                    <h1>康肯环保</h1>
                </Link>

            </div>
        )
    }
}