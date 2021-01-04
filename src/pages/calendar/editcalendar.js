import React, {Component} from 'react'
import {Form, Select, Input, message, Button, DatePicker, TimePicker, Checkbox, Radio, Transfer, Modal} from 'antd'
import './editcalendar.less'
import PageHead from '../../components/pageheader'
import moment from "moment";
import {connect} from "react-redux";
import WrapedCheckBox from "../../components/wrapedcheckbox";
import {calendardel, calendaredit, getcalendardetail, getrslist, getuserlist} from '../../api'
import Loading from "../../components/loading";

const {Option, OptGroup} = Select;

class Editcalendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            istime: false,
            ismsg: false,
            userlist: [],
            loading:true,
            detaildata:{},
            selectedKeys: [],
            sheshisource:[],
            targetKeys: []
        }
    }


   async componentDidMount() {
        console.log(this.props)
        const {data}=this.props.location.state
        const userlist = await getuserlist()
        if (userlist.ret === 200) {
            this.setState({userlist: userlist.data})
        }
        const detaildata=await getcalendardetail(data)
        if(detaildata.ret===200)
        {
            console.log('kkk',detaildata)
            this.setState({targetKeys:detaildata.data.rlist,detaildata:detaildata.data.detail,cc:detaildata.data.cc,loading:false})
        }
       const rslist=await getrslist();
       if(rslist.ret===200){
           this.setState({sheshisource:rslist.data})
       }
    }

    onUseableCheckedChange = () => {
        this.setState({ismsg: !this.state.ismsg})
    }

    appointtime = (e) => {
        this.props.form.setFieldsValue({'starttime': moment('00:00', 'HH:mm')})
        this.props.form.setFieldsValue({'endtime': moment('00:00', 'HH:mm')})
        this.setState({istime: e.target.checked})
    }

    handleDel=event=>{
        Modal.confirm({
            title: 'Confirm',
            content: '确定要删除日程?',
            okText: '确认',
            cancelText: '取消',
            onOk:async  ()=> {
                try {
                    const result=await calendardel(event)
                    if(result.ret===200)
                        this.props.history.goBack()
                }catch (e) {
                    message.error(e.message)
                }
            }
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const {name, startdate, starttime, enddate, endtime, title, titlecolor, content, remarks, cc, ismsg} = values
                try {
                    const result = await calendaredit(this.state.detaildata.id,this.props.user.id, name, startdate.format('YYYY-MM-DD'), starttime.format('HH:mm'), enddate.format('YYYY-MM-DD'), endtime.format('HH:mm'), title, titlecolor, content, remarks, cc, ismsg,this.state.targetKeys)
                    if (result.ret==200) {
                        message.success('日程修改成功');
                        this.props.history.goBack()
                    }
                } catch (e) {
                    message.error(e.message)
                }

            }
            console.log(values)
        })
    }
    handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });

        console.log('sourceSelectedKeys: ', sourceSelectedKeys);
        console.log('targetSelectedKeys: ', targetSelectedKeys);
    };
//
    handleChange = (nextTargetKeys, direction, moveKeys) => {
        this.setState({ targetKeys: nextTargetKeys });

        console.log('targetKeys: ', nextTargetKeys);
        console.log('direction: ', direction);
        console.log('moveKeys: ', moveKeys);
    };
//
    render() {
        console.log('cocoboy',this.state.targetKeys)
        const {getFieldDecorator} = this.props.form;
        if(this.state.loading)
        {
            return (<Loading />)
        }else{
            let cc=[]
            this.state.cc.map((item,index)=>{
                cc.push(item.userid.toString())
            })
            console.log(cc)
            return (
                <div className='editcalendar'>
                    <PageHead/>
                    <div className='editformdiv'>

                        <Form labelCol={{span: 8}} wrapperCol={{span: 8,}} onSubmit={this.handleSubmit}>
                            <Form.Item wrapperCol={{span: 2,}} label="姓名">
                                {getFieldDecorator('name', {
                                    rules: [{required: true, message: '请填写姓名'}],
                                    initialValue: this.state.detaildata.name
                                })(<Input disabled={true}/>)}
                            </Form.Item>
                            <Form.Item label="开始时间">
                                {getFieldDecorator('startdate', {
                                    rules: [{required: true, message: '请选择开始时间'}],
                                    initialValue:moment(this.state.detaildata.startdate, 'YYYY-MM-DD')
                                })(
                                    <DatePicker/>,
                                )}
                                {getFieldDecorator('starttime', {
                                    initialValue: moment(this.state.detaildata.starttime, 'HH:mm'),
                                })(
                                    <TimePicker style={{marginLeft: '10px'}} format='HH:mm' disabled={this.state.istime}/>,
                                )}
                                <Checkbox onChange={this.appointtime} style={{marginLeft: '10px'}}>不指定时间</Checkbox>
                            </Form.Item>
                            <Form.Item label="结束时间">
                                {getFieldDecorator('enddate', {
                                    rules: [{required: true, message: '请选择结束时间'}],
                                    initialValue:moment(this.state.detaildata.enddate, 'YYYY-MM-DD')
                                })(
                                    <DatePicker/>,
                                )}
                                {getFieldDecorator('endtime', {
                                    initialValue: moment(this.state.detaildata.endtime, 'HH:mm')
                                })(
                                    <TimePicker style={{marginLeft: '10px'}} format='HH:mm' disabled={this.state.istime}/>,
                                )}
                            </Form.Item>
                            <Form.Item label="标题">
                                {getFieldDecorator('title', {
                                    rules: [{required: true, message: '请填写标题'}],
                                    initialValue:this.state.detaildata.title
                                })(<Input/>)}
                            </Form.Item>
                            <Form.Item label="颜色">
                                {getFieldDecorator('titlecolor', {
                                    initialValue: this.state.detaildata.titlecolor
                                })(<Radio.Group>
                                    <Radio value={'#0000FF'}><span style={{color: '#0000FF'}}>蓝色</span></Radio>
                                    <Radio value={'#FF0000'}><span style={{color: '#FF0000'}}>红色</span></Radio>
                                    <Radio value={'#009900'}><span style={{color: '#009900'}}>绿色</span></Radio>
                                    <Radio value={'#ff9900'}><span style={{color: '#ff9900'}}>黄色</span></Radio>
                                    <Radio value={'#000000'}><span style={{color: '#000000'}}>黑色</span></Radio>
                                </Radio.Group>)}
                            </Form.Item>
                            <Form.Item label="内容">
                                {getFieldDecorator('content', {
                                    rules: [{required: true, message: '请填写内容'}],
                                    initialValue: this.state.detaildata.content
                                })(<Input.TextArea rows={4}/>)}
                            </Form.Item>
                            <Form.Item label="备注">
                                {getFieldDecorator('remarks', {
                                    initialValue: this.state.detaildata.remarks
                                })(<Input.TextArea rows={4}/>)}
                            </Form.Item>
                            <Form.Item label="抄送">
                                {getFieldDecorator('cc', {
                                     initialValue:cc
                                })(<Select mode='multiple'>
                                    {this.state.userlist.map((item, index) => {
                                            return (
                                                <OptGroup key={index} label={item.DepartName}>
                                                    {item.users.map((user, uindex) => {
                                                        return (
                                                            <Option key={user.id} value={user.id.toString()}>{user.name}</Option>
                                                        )
                                                    })}

                                                </OptGroup>
                                            )
                                        }
                                    )}
                                </Select>)}
                            </Form.Item>
                            <Form.Item label="通知">
                                {getFieldDecorator('ismsg', {
                                    initialValue: this.state.detaildata.ismsg
                                })(<WrapedCheckBox text='发送通知' onChange={this.onUseableCheckedChange}/>)}
                            </Form.Item>
                            <Form.Item  label={("设施预约")}>
                                {getFieldDecorator('sheshi', {
                                })(
                                    <Transfer
                                        dataSource={this.state.sheshisource}
                                        titles={['可预约设施', '已选择']}
                                        targetKeys={this.state.targetKeys}
                                        selectedKeys={this.state.selectedKeys}
                                        onChange={this.handleChange}
                                        onSelectChange={this.handleSelectChange}
                                        // onScroll={this.handleScroll}
                                        render={item => item.name}
                                        disabled={this.state.istime}
                                        listStyle={{
                                            width: 150,
                                            height: 200,
                                        }}
                                    />
                                )}
                            </Form.Item>
                            <Form.Item wrapperCol={{span: 8, offset: 11}}>
                                <Button htmlType="submit" type="primary" htmlType="submit">
                                    提交
                                </Button>
                                <Button style={{marginLeft:20}}  onClick={()=>this.props.history.goBack()}>返回</Button>
                                <Button style={{marginLeft:20}} type="danger" onClick={()=>this.handleDel(this.state.detaildata.id)}>删除</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            );
        }

    }
}

const WarpEditcalendar = Form.create()(Editcalendar)
export default connect(
    status => ({user: status.user}), {}
)(WarpEditcalendar)
