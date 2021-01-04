import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import {Table, ConfigProvider } from 'antd'; // 引入ConfigProvider全局化配置
import zhCN from 'antd/es/locale/zh_CN';
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
export default class App extends Component {

    render() {
        return (
            <ConfigProvider locale={zhCN}>
            <BrowserRouter>
                <Switch>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/' component={Admin}></Route>
                </Switch>
            </BrowserRouter>
            </ConfigProvider>
        )
    }
}
