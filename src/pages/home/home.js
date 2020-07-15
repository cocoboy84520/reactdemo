import React, { Component } from 'react'
import { Card, Col, Row,List,Typography   } from 'antd';
import './home.less'
import {withTranslation} from 'react-i18next'
import {gethome} from "../../api";
import {Link} from "react-router-dom";
const { Title } = Typography;
const data=['Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',];
@withTranslation()
class Home extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: {
                facilityCount:0,
                waitcheck:0,
                notice:[],
            }
        };
    }


    async componentDidMount() {
        let ret=await gethome()
        this.setState({data:ret.data})
    }

    render() {
        const {t} =this.props
        return (
            <div className='home'>
                <Row gutter={16}>
                    <Col span={4}>
                        <Card title="今日日程" bordered={false}>
                            <Title level={2}>{this.state.data.facilityCount}</Title>
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card title="今日会议" bordered={false}>
                            <Title level={2}>0</Title>
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card title="未读通知" bordered={false}>
                            <Title level={2}>0</Title>
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card  title="申请通过" bordered={false}>
                            <Title style={{color:"green"}} level={2}>0</Title>
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card title="申请驳回" bordered={false}>
                            <Title  style={{color:"darkred"}} level={2}>0</Title>
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card title="待我审批" bordered={false}>
                            <Title level={2}>0</Title>
                        </Card>
                    </Col>
                </Row>
                <Row style={{marginTop:'20px'}} className='notice' gutter={16}>
                    <Col span={12}>
                        <Card style={{paddingTop:'0px'}} title="通知公告" extra={<a href="#">更多</a>} bordered={false}>
                            <List
                                size="large"
                                dataSource={this.state.data.notice}
                                renderItem={item => <List.Item><Link to={{pathname: '/flowadmin/flowdesign', state: {flowid: 1}}}>{item.title}</Link></List.Item>}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title="我申请的" extra={<a href="#">更多</a>} bordered={false}>
                            Card content
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default Home
