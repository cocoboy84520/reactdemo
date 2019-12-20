import React, { Component } from 'react'
import { Layout } from 'antd';
import HeaderNav from '../../components/header'
import LeftNav from "../../components/left-nav";

import './admin.less'

const { Header, Footer, Sider, Content } = Layout;
export default class admin extends Component {
    render() {
        return (
                <Layout style={{height:'100%'}}>
                    <Sider><LeftNav /></Sider>
                    <Layout>
                        <Header style={{backgroundColor:'#FFF'}}>Header</Header>
                        <Content>Content</Content>
                        <Footer className="footer">
                            康肯环保设备(平湖)有限公司
                        </Footer>
                    </Layout>
                </Layout>
        )
    }
}
