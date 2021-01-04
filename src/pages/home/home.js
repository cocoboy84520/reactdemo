import React, { Component } from 'react'
import { Card, Col, Row,List,Typography ,Avatar  } from 'antd';
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
                    <Col span={6}>
                        <Card title={t("今日日程")} bordered={false}>
                            <Title level={2}>{this.state.data.facilityCount}</Title>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card  title={t("申请通过")} bordered={false}>
                            <Title style={{color:"green"}} level={2}>0</Title>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title={t("申请驳回")} bordered={false}>
                            <Title  style={{color:"darkred"}} level={2}>0</Title>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title={t("待我审批")} bordered={false}>
                            <Title level={2}>0</Title>
                        </Card>
                    </Col>
                </Row>
                <Row style={{marginTop:'20px'}} className='notice' gutter={16}>
                    <Col span={12}>
                        <Card style={{paddingTop:'0px'}} title={t("通知公告")} extra={<a href="#">{t('更多')}</a>} bordered={false}>
                            <List
                                size="large"
                                dataSource={this.state.data.notice}
                                // renderItem={item => <List.Item><Link to={{pathname: '/notice/show', state: {noticeid: item.id}}}><div style={{flexDirection:'row',justifyContent:'space-around'}}><div>{item.title}</div><div>{item.title}</div></div></Link></List.Item>}
                                renderItem={item => <List.Item>
                                    <List.Item.Meta
                                        title={<Link to={{pathname: '/notice/show', state: {noticeid: item.id}}}>{item.title}</Link>}
                                    />
                                    <div>{item.addtime}</div>
                                </List.Item>}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title={t("我申请的")} extra={<a href="#">{t('更多')}</a>} bordered={false}>
                            Card content
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default Home
