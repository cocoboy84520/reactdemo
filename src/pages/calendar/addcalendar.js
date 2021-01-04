import React, {Component} from 'react'
import {Form, Select, Input, message, Button, DatePicker, TimePicker, Checkbox, Radio, Transfer,Divider} from 'antd'
import './editcalendar.less'
import PageHead from '../../components/pageheader'
import moment from "moment";
import {connect} from "react-redux";
import WrapedCheckBox from "../../components/wrapedcheckbox";
import {calendaradd, getrslist, getuserlist} from '../../api'
import {withTranslation} from 'react-i18next'

const {Option, OptGroup} = Select;
@withTranslation()
class Addcalendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            istime: false,
            ismsg: true,
            userlist: [],
            sheshidisabled:false,
            selectedKeys: [],
            sheshisource:[],
            targetKeys: [],
            selectedics:[],
        }
        this.selectref=null;
    }


    async componentDidMount() {
        const userlist = await getuserlist()
        if (userlist.ret === 200) {
            this.setState({userlist: userlist.data})
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
        console.log(this.props)
        this.props.form.setFieldsValue({'starttime': moment('00:00', 'HH:mm')})
        this.props.form.setFieldsValue({'endtime': moment('00:00', 'HH:mm')})
        this.setState({istime: e.target.checked})
        if(e.target.checked)
        {
            this.setState({targetKeys:[]})
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const {name, startdate, starttime, enddate, endtime, title, titlecolor, content, remarks, cc, ismsg} = values
                try {
                    const result = await calendaradd(this.props.user.id, name, startdate.format('YYYY-MM-DD'), starttime.format('HH:mm'), enddate.format('YYYY-MM-DD'), endtime.format('HH:mm'), title, titlecolor, content, remarks, cc, ismsg,this.state.targetKeys)
                    if (result.ret==200) {
                        message.success('日程添加成功');
                        this.props.history.goBack()
                    }else{
                        message.error(result.msg)
                    }
                } catch (e) {
                    debugger
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

    selectedall=()=>{
        let users=[];
        this.state.userlist.map((item,index)=>
            item.users.map((v,i)=>
                users.push(v.id)
            )
        )
        this.setState({selectedics:users})
    }

    render() {
        const {t} = this.props;
        const {currdate}=this.props.location.state
        console.log(this.props.location.state)
        const {getFieldDecorator} = this.props.form;
        return (
            <div className='editcalendar'>
                <PageHead/>
                <div className='editformdiv'>
                    <Form labelCol={{span: 8}} wrapperCol={{span: 8,}} onSubmit={this.handleSubmit}>
                        <Form.Item wrapperCol={{span: 2,}} label={t("姓名")}>
                            {getFieldDecorator('name', {
                                rules: [{required: true, message: t('请填写姓名')}],
                                initialValue: this.props.user.name
                            })(<Input disabled={true}/>)}
                        </Form.Item>
                        <Form.Item label={t("开始时间")}>
                            {getFieldDecorator('startdate', {
                                rules: [{required: true, message: t('请选择开始时间')}],
                                initialValue:moment(currdate, 'YYYY-MM-DD')
                            })(
                                <DatePicker/>,
                            )}
                            {getFieldDecorator('starttime', {
                                initialValue: moment('08:00', 'HH:mm'),
                            })(
                                <TimePicker style={{marginLeft: '10px'}} format='HH:mm' disabled={this.state.istime}/>,
                            )}
                            <Checkbox onChange={this.appointtime} style={{marginLeft: '10px'}}>{t('不指定时间')}</Checkbox>
                        </Form.Item>
                        <Form.Item label={t("结束时间")}>
                            {getFieldDecorator('enddate', {
                                rules: [{required: true, message: t('请选择结束时间')}],
                                initialValue:moment(currdate, 'YYYY-MM-DD')
                            })(
                                <DatePicker/>,
                            )}
                            {getFieldDecorator('endtime', {
                                initialValue: moment('17:00', 'HH:mm')
                            })(
                                <TimePicker style={{marginLeft: '10px'}} format='HH:mm' disabled={this.state.istime}/>,
                            )}
                        </Form.Item>
                        <Form.Item label={t("标题")}>
                            {getFieldDecorator('title', {
                                rules: [{required: true, message: t('请填写标题')}]
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item label={t("颜色")}>
                            {getFieldDecorator('titlecolor', {
                                initialValue: '#0000FF'
                            })(<Radio.Group>
                                <Radio value={'#0000FF'}><span style={{color: '#0000FF'}}>蓝色</span></Radio>
                                <Radio value={'#FF0000'}><span style={{color: '#FF0000'}}>红色</span></Radio>
                                <Radio value={'#009900'}><span style={{color: '#009900'}}>绿色</span></Radio>
                                <Radio value={'#ff9900'}><span style={{color: '#ff9900'}}>黄色</span></Radio>
                                <Radio value={'#000000'}><span style={{color: '#000000'}}>黑色</span></Radio>
                            </Radio.Group>)}
                        </Form.Item>
                        <Form.Item label={t("内容")}>
                            {getFieldDecorator('content', {
                                rules: [{required: true, message: t('请填写内容')}]
                            })(<Input.TextArea rows={4}/>)}
                        </Form.Item>
                        <Form.Item label={t("备注")}>
                            {getFieldDecorator('remarks', {})(<Input.TextArea rows={4}/>)}
                        </Form.Item>
                        <Form.Item label={t("抄送")}>
                            {getFieldDecorator('cc', {initialValue:this.state.selectedics})(<Select ref={el=>this.selectref=el}  mode='multiple'
                            dropdownRender={menu => (<div>
                                {menu}
                                <Divider />
                                <div style={{padding:'4px 8px 8px 8px' ,cursor:'pointer'}}>
                                    <Button onMouseDown={()=>this.selectedall()}>全选</Button>
                                </div>
                            </div>)}
                            >
                                {this.state.userlist.map((item, index) => {
                                        return (
                                            <OptGroup key={index} label={item.DepartName}>
                                                {item.users.map((user, uindex) => {
                                                    return (
                                                        <Option key={uindex} value={user.id}>{user.name}</Option>
                                                    )
                                                })}

                                            </OptGroup>
                                        )
                                    }
                                )}
                            </Select>)}
                        </Form.Item>
                        <Form.Item label={t("通知")}>
                            {getFieldDecorator('ismsg', {
                                initialValue: false
                            })(<WrapedCheckBox text={t('发送通知')} onChange={this.onUseableCheckedChange}/>)}
                        </Form.Item>
                        <Form.Item  label={t("设施预约")}>
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
                                {t('提交')}
                            </Button>
                            <Button style={{marginLeft:20}}  onClick={()=>this.props.history.goBack()}>返回</Button>
                        </Form.Item>
                    </Form>

                </div>
            </div>
        );
    }
}

const WarpEditcalendar = Form.create()(Addcalendar)
export default connect(
    status => ({user: status.user}), {}
)(WarpEditcalendar)
