import React, {Component} from 'react'
import moment from 'moment'
//import 'moment/locale/zh-cn';
import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT, DemoData} from 'react-big-scheduler'
import withDragDropContext from '../../components/withDnDContext'
import 'react-big-scheduler/lib/css/style.css'
import {addFacilities, delFacilities, getresourcelist} from "../../api";
import Loading from "../../components/loading";
import {Modal, Form, DatePicker, Row, Col, Checkbox, Input, message,Button} from "antd";
import zh from 'antd/es/date-picker/locale/zh_CN';
import ja from 'antd/es/date-picker/locale/ja_JP'
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";

let schedulerData
@withTranslation()
@Form.create()
class Facilities extends Component{
    constructor(props){
        super(props);
        this.state={
            isloading:true,
            visible: false,
            confirmLoading: false,
        }
        schedulerData = new SchedulerData(new moment().format(DATE_FORMAT), ViewTypes.Week, false, false, {}, {
            getSummaryFunc: this.getSummary,
        });

    }

     async componentDidMount() {
         const contentWidth=document.getElementById('contents').clientWidth
         console.log(contentWidth)
         const windowwidth=document.body.clientWidth
         if(windowwidth==(contentWidth+40))
             schedulerData.config.schedulerWidth=contentWidth-200
         else
            schedulerData.config.schedulerWidth=contentWidth
         this.loadevent()
     }



    render(){
        console.log(this.props)
        if(this.state.isloading)
        {
            return (<div id={'contents'} style={{flex:1}}><Loading /></div>)
        }
        const {viewModel} = this.state;
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <div id={'contents'} style={{flex:1, overflow:"auto",backgroundColor:"white"}}>
                    <Modal
                        title="添加预约"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        confirmLoading={this.state.confirmLoading}
                        onCancel={this.handleCancel}
                        centered={true}
                    >
                        <Row type="flex" justify="center" align="middle">
                            <Col span={20}>
                                <Form labelCol={{span:5}}>
                                    <Form.Item label='开始时间'>
                                        {getFieldDecorator('start', {rules: [{required: true, message: '请选择开始时间'}]})(<DatePicker showTime={{format:'YYYY-MM-DD HH:mm'}} locale={this.props.i18n.language=='zh'?zh:ja}  format='YYYY-MM-DD HH:mm'
                                                                                                   onChange={this.onDateChange}/>)}
                                    </Form.Item>
                                    <Form.Item label='结束时间'>
                                        {getFieldDecorator('end', {rules: [{required: true, message: '请选择结束时间'}]})(<DatePicker showTime={{format:'YYYY-MM-DD HH:mm'}} locale={this.props.i18n.language=='zh'?zh:ja}   format='YYYY-MM-DD HH:mm'
                                                                                                   onChange={this.onDateChange}/>)}
                                    </Form.Item>
                                    <Form.Item label='主题内容'>
                                        {getFieldDecorator('title', {rules: [{required: true, message: '请输入主题内容'}]})(<Input.TextArea rows={4} />)}
                                    </Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator('insertcalendar', {})(<Checkbox>写入到我的日程</Checkbox>)}
                                    </Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator('resourceId', {})(<input type={'hidden'}></input>)}{getFieldDecorator('id', {})(<input type={'hidden'}></input>)}
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>
                    </Modal>
                    <Scheduler schedulerData={viewModel}
                               prevClick={this.prevClick}
                               nextClick={this.nextClick}
                               onSelectDate={this.onSelectDate}
                               onViewChange={this.onViewChange}
                               eventItemClick={this.eventClicked}
                               viewEventClick={this.ops1}
                               viewEventText="编辑"
                               viewEvent2Text="删除"
                               viewEvent2Click={this.ops2}
                               updateEventStart={this.updateEventStart}
                               updateEventEnd={this.updateEventEnd}
                               moveEvent={this.moveEvent}
                               newEvent={this.newEvent}
                               toggleExpandFunc={this.toggleExpandFunc}
                    />
                </div>
            </div>
        )
    }

    prevClick = (schedulerData)=> {
        schedulerData.prev();
        this.loadevent()
    }

    nextClick = (schedulerData)=> {
        schedulerData.next();
        this.loadevent()
    }

    onViewChange = (schedulerData, view) => {
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        this.loadevent()
    }

    onSelectDate = (schedulerData, date) => {
        schedulerData.setDate(date);
        this.loadevent()
    }

    eventClicked = (schedulerData, event) => {
        //alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);
    };

    ops1 = (schedulerData, event) => {
        //alert(`You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`);
        console.log(event)
        if(this.props.user.id==event.uid)
        {
            debugger
            this.props.form.setFieldsValue({
                start:new moment(event.start),
                end:new moment(event.end),
                title:event.title,
                resourceId:event.resourceId,
                id:event.id
            })
            this.showModal()
        }else{
            message.error('非创建者不能编辑')
        }

    };

    ops2 =async (schedulerData, event) => {
        let ret=await delFacilities({id:event.id})
        if(ret.ret===200)
        {
            this.loadevent()
        }else{
            message.error(ret.msg)
        }
    };

    newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
        // let newFreshId = 0;
        // schedulerData.events.forEach((item) => {
        //     if(item.id >= newFreshId)
        //         newFreshId = item.id + 1;
        // });
        //
        // let newEvent = {
        //     id: newFreshId,
        //     title: 'New event you just created',
        //     start: start,
        //     end: end,
        //     resourceId: slotId,
        //     bgColor: 'purple'
        // }
        // schedulerData.addEvent(newEvent);
        // this.setState({
        //     viewModel: schedulerData
        // })
        this.props.form.setFieldsValue({resourceId:slotId})
        this.setState({currresourceid:slotId,visible:true})
    }

    updateEventStart = (schedulerData, event, newStart) => {
        schedulerData.updateEventStart(event, newStart);
        this.setState({
            viewModel: schedulerData
        })
    }

    updateEventEnd = (schedulerData, event, newEnd) => {
        schedulerData.updateEventEnd(event, newEnd);
        this.setState({
            viewModel: schedulerData
        })
    }

    moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
        schedulerData.moveEvent(event, slotId, slotName, start, end);
        this.setState({
            viewModel: schedulerData
        })
    }

    getSummary = (schedulerData, headerEvents, slotId, slotName, headerStart, headerEnd) => {
        let text = headerEvents.length.toString();
        let color = '#d9d9d9';
        if(headerEvents.length > 0)
            color = headerEvents.length <= 1  ? 'green': 'red';
        return {text: text, color: color, fontSize: '12px'};
    }

    toggleExpandFunc = (schedulerData, slotId) => {
        schedulerData.toggleExpandStatus(slotId);
        this.setState({
            viewModel: schedulerData
        });
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.props.form.validateFields(async (err, values) =>{
            if(!err)
            {
                //values.resourceId=this.state.currresourceid
                debugger
                values.start=moment(values.start).format('YYYY-MM-DD HH:mm:ss')
                values.end=moment(values.end).format('YYYY-MM-DD HH:mm:ss')
                console.log(values)
                let ret= await addFacilities(values)
                if(ret.ret===200)
                {
                    this.loadevent()
                    this.props.form.resetFields()
                    this.setState({
                        visible: false,
                        confirmLoading: false,
                    })
                }else{
                    message.error(ret.msg)
                    this.setState({
                        confirmLoading: false,
                    })
                }
            }
        })
    };

    handleCancel = () => {
        this.props.form.resetFields()
        this.setState({
            visible: false,
        });
    };

    loadevent=async()=>{
        let list = await getresourcelist(schedulerData.startDate,schedulerData.endDate)
        schedulerData.setResources(list.data.resources)
        schedulerData.setEvents(list.data.events);
        this.setState( {
            viewModel: schedulerData,
            isloading:false,
        })
    }
}

export default connect(
    status => ({user: status.user}), {}
)(withDragDropContext(Facilities))
