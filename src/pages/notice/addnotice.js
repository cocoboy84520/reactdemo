import React, {Component} from 'react'
import PageHead from '../../components/pageheader'
import './addnotice.less'
import {Form, Input, Select, Upload, Button, Icon, message} from "antd";
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import {CirclePicker} from 'react-color'
import {addnotice} from "../../api";

const {Option} = Select;

class Addnotice extends Component {

    state = {
        fileList: [],
    };
    // 提交保存
    handleSubmit = (event) => {
        // 阻止默認提交
        event.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            console.log(values)
            if(!err)
            {
                const {title, titlecolor,type,content,files}=values
                try{
                    const ret =await addnotice(title,titlecolor.hex,type,content.toHTML(),JSON.stringify(files))
                    if(ret.ret===200)
                    {
                        this.props.history.push('/notice')
                    }
                }catch (e) {

                }
            }
        })
    }

    normFile = e => {
        console.log(e)
        return this.state.fileList
    };


    onChange = (e) => {
        let fileList = e.fileList;
        let aaa = fileList.filter(file => {
            console.log(file)
            if(file.response)
            {
                if(file.response.ret==200)
                {
                    return true
                }else {
                    message.error(`文件上传错误:${file.response.msg}`)
                    return false
                }
            }else{
                return true
            }
        })

        this.setState({fileList:aaa});
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const props = {
            name: 'upfile',
            action: '/?s=File.upload',
            onChange: this.onChange,
            multiple: true
        };
        const {fileList} = this.state
        return (
            <div className={'addnotice'}>
                <PageHead/>
                <div className='addformdiv'>
                    <Form labelCol={{span: 2, offset: 4}} wrapperCol={{span: 12, offset: 0}}
                          onSubmit={this.handleSubmit}>
                        <Form.Item label={("标题")}>
                            {getFieldDecorator('title', {
                                rules: [{required: true, message: '请填写公告标题'}]
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item label={("标题颜色")}>
                            {getFieldDecorator('titlecolor', {
                                rules: [{required: true, message: '请填写公告标题'}]
                            })(<CirclePicker
                                colors={["#000000", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3"]}/>)}
                        </Form.Item>
                        <Form.Item label={("类型")}>
                            {getFieldDecorator('type', {
                                rules: [{required: true, message: '请选择公告类型'}]
                            })(<Select style={{width: 120}}>
                                <Option value="通知">通知</Option>
                                <Option value="公告">公告</Option>
                                <Option value="规定">规定</Option>
                            </Select>)}
                        </Form.Item>
                        <Form.Item label={("正文内容")}>
                            {getFieldDecorator('content', {
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: true,
                                    validator: (_, value, callback) => {
                                        if (value.isEmpty()) {
                                            callback('请输入正文内容')
                                        } else {
                                            callback()
                                        }
                                    }
                                }],
                            })(
                                <BraftEditor
                                    className="my-editor"
                                    placeholder="请输入正文内容"
                                />
                            )}
                        </Form.Item>
                        <Form.Item label={("相关附件")}>
                            {getFieldDecorator('files', {
                                valuePropName:'fileList',
                                getValueFromEvent: this.normFile
                            })(<Upload {...props} fileList={this.state.fileList}
                            >
                                <Button>
                                    <Icon type="upload"/> 上传
                                </Button>
                            </Upload>)}
                        </Form.Item>
                        <Form.Item wrapperCol={{span: 8, offset: 11}}>
                            <Button htmlType="submit" type="primary" htmlType="submit">
                                {('提交')}
                            </Button>
                            <Button style={{marginLeft: 20}} onClick={() => this.props.history.goBack()}>返回</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

const AddnoticeForm = Form.create()(Addnotice)
export default AddnoticeForm
