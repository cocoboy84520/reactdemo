import React, { Component } from 'react'
import {Form, Select, Input, Button} from 'antd'
import './editcalendar.less'
const { Option } = Select;
class Editcalendar extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
                <Form.Item label="Note">
                    {getFieldDecorator('note', {
                        rules: [{ required: true, message: 'Please input your note!' }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Gender">
                    {getFieldDecorator('gender', {
                        rules: [{ required: true, message: 'Please select your gender!' }],
                    })(
                        <Select
                            placeholder="Select a option and change input text above"

                        >
                            <Option value="male">male</Option>
                            <Option value="female">female</Option>
                        </Select>,
                    )}
                </Form.Item>
                <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}
const WarpEditcalendar = Form.create()(Editcalendar)
export default WarpEditcalendar