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
import Notice from "../notice/notice";
import Book from "../book/book";
import {connect} from "react-redux";

const { Header, Footer, Sider, Content } = Layout;
 class Admin extends Component {
    render() {
        const user=this.props.user
        if(!user||!user.id)
        {
            return <Redirect to='/login' />
        }
        return (
                <Layout style={{height:'100%'}}>
                    <Sider className='sider'><LeftNav /></Sider>
                    <Layout className='layoutbody'>
                        <Header className='header'><HeaderNav /></Header>
                        <Content className='content'>
                            <Switch>
                                <Route path='/home' component={Home}></Route>
                                <Route path='/calendar' component={Calendars}></Route>
                                <Route path='/facilities' component={Facilities}></Route>
                                <Route path='/file' component={File}></Route>
                                <Route path='/flow' component={Flow}></Route>
                                <Route path='/notice' component={Notice}></Route>
                                <Route path='/book' component={Book}></Route>
                                {/*<Route path='/editcalendar' component={Editcalendar}></Route>*/}
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
export default connect(
    status=>({user:status.user}),{}
)(Admin)