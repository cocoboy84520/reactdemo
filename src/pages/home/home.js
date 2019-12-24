import React, { Component } from 'react'
import { Card, Col, Row,List,Skeleton  } from 'antd';
import './home.less'
import {withTranslation} from 'react-i18next'

const data=['Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',];
@withTranslation()
class Home extends Component {
    render() {
        const {t} =this.props
        return (
            <div className='home'>
                <Row gutter={16}>
                    <Col span={4}>
                        <Card title="今日日程" bordered={false}>
                            {t('今日日程')}
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card title="今日会议" bordered={false}>
                            今日会议
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card title="Card title" bordered={false}>
                            Card content
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card title="Card title" bordered={false}>
                            Card content
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card title="Card title" bordered={false}>
                            Card content
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card title="Card title" bordered={false}>
                            Card content
                        </Card>
                    </Col>
                </Row>
                <Row style={{marginTop:'20px'}} className='notice' gutter={16}>
                    <Col span={12}>
                        <Card style={{paddingTop:'0px'}} title="通知公告" extra={<a href="#">更多</a>} bordered={false}>
                            <List
                                size="large"
                                dataSource={data}
                                renderItem={item => <List.Item>{item}</List.Item>}
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