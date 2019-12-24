import React, { Component } from 'react'
import {Form, Select, Input, Button,DatePicker,TimePicker,Checkbox,Radio,Transfer} from 'antd'
import './editcalendar.less'
import PageHead from '../../components/pageheader'
import moment from "moment";
const { Option , OptGroup} = Select;
class Editcalendar extends Component {

    constructor(props) {
        super(props);
        this.state={
            istime:false,
        }
    }

    appointtime=(e)=>{
        console.log(e)
        this.setState({istime:e.target.checked})
    }

    handleSubmit=event=>{
        event.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            console.log(values)
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className='editcalendar'>
                <PageHead />
                <div className='editformdiv'>
                    <Form  labelCol={{ span: 8 }} wrapperCol={{ span: 8, }} onSubmit={this.handleSubmit} >
                        <Form.Item wrapperCol={{ span: 2, }} label="姓名">
                            {getFieldDecorator('name', {
                                rules:[{required:true,message:'请填写姓名'}]
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="开始时间">
                            {getFieldDecorator('startdate', {
                                rules:[{required:true,message:'请选择开始时间'}]
                            })(
                                <DatePicker />,
                            )}
                            {getFieldDecorator('starttime', {
                                initialValue:moment('00:00', 'HH:mm')
                            })(
                                <TimePicker style={{marginLeft:'10px'}} format='HH:mm' disabled={this.state.istime}/>,
                            )}
                            <Checkbox onChange={this.appointtime} style={{marginLeft:'10px'}}>不指定时间</Checkbox>
                        </Form.Item>
                        <Form.Item label="结束时间">
                            {getFieldDecorator('enddate', {
                                rules:[{required:true,message:'请选择结束时间'}]
                            })(
                                <DatePicker />,
                            )}
                            {getFieldDecorator('endtime', {
                                initialValue: moment('00:00', 'HH:mm')
                            })(
                                <TimePicker style={{marginLeft:'10px'}}  format='HH:mm' disabled={this.state.istime} />,
                            )}
                        </Form.Item>
                        <Form.Item label="标题">
                            {getFieldDecorator('title', {
                                rules:[{required:true,message:'请填写标题'}]
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="颜色">
                            {getFieldDecorator('titlecolor', {
                                initialValue:'#0000FF'
                            })(<Radio.Group>
                                <Radio value={'#0000FF'}><span style={{color:'#0000FF'}}>蓝色</span></Radio>
                                <Radio value={'#FF0000'}><span style={{color:'#FF0000'}}>红色</span></Radio>
                                <Radio value={'#009900'}><span style={{color:'#009900'}}>绿色</span></Radio>
                                <Radio value={'#ff9900'}><span style={{color:'#ff9900'}}>黄色</span></Radio>
                                <Radio value={'#000000'}><span style={{color:'#000000'}}>黑色</span></Radio>
                            </Radio.Group>)}
                        </Form.Item>
                        <Form.Item label="内容">
                            {getFieldDecorator('content', {
                                rules:[{required:true,message:'请填写内容'}]
                            })(<Input.TextArea rows={4} />)}
                        </Form.Item>
                        <Form.Item label="备注">
                            {getFieldDecorator('remarks', {
                            })(<Input.TextArea rows={4} />)}
                        </Form.Item>
                        <Form.Item label="抄送">
                            {getFieldDecorator('cc', {
                            })(<Select  mode='multiple'>
                                <OptGroup label="Manager">
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                </OptGroup>
                                <OptGroup label="Engineer">
                                    <Option value="Yiminghe">yiminghe</Option>
                                </OptGroup>
                            </Select>)}
                        </Form.Item>
                        <Form.Item label="通知">
                            {getFieldDecorator('ismsg', {
                            })(<Checkbox checked={false}>发送通知</Checkbox>)}
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 8, offset: 11 }}>
                            <Button htmlType="submit" type="primary" htmlType="submit">
                                提交
                            </Button>
                        </Form.Item>
                    </Form>

                </div>
                 </div>

        );
    }
}
const WarpEditcalendar = Form.create()(Editcalendar)
export default WarpEditcalendar