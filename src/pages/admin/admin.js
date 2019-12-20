import React, { Component } from 'react'
import { Layout } from 'antd';
import {Redirect,Route,Switch} from 'react-router-dom';
import HeaderNav from '../../components/header'
import LeftNav from "../../components/left-nav";
import Home from "../home/home";
import Calendars from "../calendar/calendars";
import Facilities from "../facilities/facilities";
import File from "../file/file";
import Flow from "../flow/flow";
import './admin.less'

const { Header, Footer, Sider, Content } = Layout;
export default class Admin extends Component {
    render() {
        return (
                <Layout style={{height:'100%'}}>
                    <Sider><LeftNav /></Sider>
                    <Layout>
                        <Header style={{backgroundColor:'#FFF'}}>Header</Header>
                        <Content>
                            <Switch>
                                <Route path='/home' component={Home}></Route>
                                <Route path='/calendar' component={Calendars}></Route>
                                <Route path='/facilities' component={Facilities}></Route>
                                <Route path='/file' component={File}></Route>
                                <Route path='/flow' component={Flow}></Route>
                                <Redirect to='/home'/>
                            </Switch>
                        </Content>
                        <Footer className="footer">
                            康肯环保设备(平湖)有限公司
                        </Footer>
                    </Layout>
                </Layout>
        )
    }
}
