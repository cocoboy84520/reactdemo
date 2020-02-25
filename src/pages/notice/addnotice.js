import React, {Component} from 'react'
import PageHead from '../../components/pageheader'
import './addnotice.less'
import {Form, Input,Select} from "antd";
const { Option } = Select;
class Addnotice extends Component {

    // 提交保存
    handleSubmit=(event)=>{
        // 阻止默認提交
         event.preventDefault();
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className={'addnotice'}>
                <PageHead />
                <div className='addformdiv'>
                    <Form labelCol={{span: 8}} wrapperCol={{span: 8,}} onSubmit={this.handleSubmit}>
                        <Form.Item label={("标题")}>
                            {getFieldDecorator('title', {
                                rules: [{required: true, message:'请填写公告标题'}]
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item label={("类型")}>
                            {getFieldDecorator('type', {
                                rules: [{required: true, message:'请选择公告类型'}]
                            })(<Select style={{ width: 120 }}>
                                <Option value="通知">通知</Option>
                                <Option value="公告">公告</Option>
                                <Option value="规定">规定</Option>
                            </Select>)}
                        </Form.Item>

                    </Form>
                </div>
            </div>
        );
    }
}
const AddnoticeForm = Form.create()(Addnotice)
export default AddnoticeForm
