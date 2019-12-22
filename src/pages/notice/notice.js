import React, {Component} from 'react'
import {Form,Row,Col,Button,Icon,Input,Table,DatePicker } from "antd";

import './notice.less'
import PageHead from "../../components/pageheader";


const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];

const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    });
}


class Notice extends Component {

    constructor(props) {
        super(props);
        this.state={
            expand: false,
            selectedRowKeys: [],
        }
    }


    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    getFields() {
        const count = this.state.expand ? 10 : 6;
        const { getFieldDecorator } = this.props.form;
        const children = [];
        for (let i = 0; i < 10; i++) {
            children.push(
                <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
                    <Form.Item label={`Field ${i}`}>
                        {getFieldDecorator(`field-${i}`, {
                            rules: [
                                {
                                    required: true,
                                    message: 'Input something!',
                                },
                            ],
                        })(<Input placeholder="placeholder" />)}
                    </Form.Item>
                </Col>,
            );
        }
        return children;
    }

    handleSearch = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
        });
    };

    handleReset = () => {
        this.props.form.resetFields();
    };

    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    };



    
    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
            selections: [
                {
                    key: 'all-data',
                    text: 'Select All Data',
                    onSelect: () => {
                        this.setState({
                            selectedRowKeys: [...Array(46).keys()], // 0...45
                        });
                    },
                },
                {
                    key: 'odd',
                    text: 'Select Odd Row',
                    onSelect: changableRowKeys => {
                        let newSelectedRowKeys = [];
                        newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                            if (index % 2 !== 0) {
                                return false;
                            }
                            return true;
                        });
                        this.setState({ selectedRowKeys: newSelectedRowKeys });
                    },
                },
                {
                    key: 'even',
                    text: 'Select Even Row',
                    onSelect: changableRowKeys => {
                        let newSelectedRowKeys = [];
                        newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                            if (index % 2 !== 0) {
                                return true;
                            }
                            return false;
                        });
                        this.setState({ selectedRowKeys: newSelectedRowKeys });
                    },
                },
            ],
        };
        return (
            <div>
                <PageHead />
                <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
                    <Row gutter={24}>
                        <Col span={8}>
                            <Form.Item label='公告标题'>
                                <Input placeholder="请输入" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label='公告内容'>
                                <Input placeholder="请输入" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label='创建者'>
                                <Input placeholder="请输入" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label='创建时间'>
                                <DatePicker.RangePicker  />
                            </Form.Item>
                        </Col>
                        <Col span={16} style={{textAlign: 'right'}}>
                        <Button type="primary" htmlType="submit">
                            查找
                        </Button>
                        <Button style={{marginLeft: 8}} onClick={this.handleReset}>
                            清除
                        </Button>
                        <a style={{marginLeft: 8, fontSize: 12}} onClick={this.toggle}>
                            展开 <Icon style={{fontSize:'14px'}} type={this.state.expand ? 'up' : 'down'}/>
                        </a>
                    </Col>
                    </Row>
                </Form>
                <div className='tablehead'>
                    <div className='headright'>
                        <Button>添加</Button>
                    </div>

                    <Table style={{backgroundColor:'#FFF'}} rowSelection={rowSelection} columns={columns} dataSource={data} />
                </div>
            </div>
        )
    }
}
const NoticeForm = Form.create()(Notice)
export default NoticeForm