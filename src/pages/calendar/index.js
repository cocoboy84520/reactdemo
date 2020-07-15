// import React, { Component } from 'react'
// import './calendars.less'
// import PageHead from '../../components/pageheader'
// import locale from '../../locale/zh'
// import { Calendar,Badge} from 'antd';
// import {reqgetcalendar, reqlogin} from "../../api";
// import {Link} from "react-router-dom";
// import addbtnimg from '../../assets/images/addcalendar.png';
// import Loading from "../../components/loading";
// import moment from "moment";
// export default class Index extends React.Component {
//
//     constructor(props) {
//         super(props);
//         var now = moment().locale('zh-cn').format('YYYY-MM-DD');
//         console.log(now)
//         this.state={
//             daydata:[],
//             loading:true,
//             date:moment(now)
//         }
//     }
//
//     async componentDidMount() {
//         const response = await reqgetcalendar('');
//         this.setState({daydata:response.data,loading:false})
//     }
//     onPanelChange= async (date,model)=>{
//         this.setState({loading:true,date:date})
//         const response = await reqgetcalendar(date.format('YYYY-MM-DD'));
//         this.setState({daydata:response.data,loading:false})
//     }
//
//     dateCellRender=(date)=>{
//         const weekday=date.format('d')
//         const finddata=date.format('YYYY-MM-DD');
//         const daydate=this.state.daydata;
//         const cItem=daydate[finddata];
//         if(cItem)
//         {
//             const vacation=cItem.vacation||date.format('d')==6||date.format('d')==0
//             return (
//                 <div style={{width:'100%',height:'100%'}}>
//                     {vacation&&<span className='vacation'>休</span>}
//                         <Link to={{pathname:'/calendar/add',state:{currdate:finddata}}} ><img src={addbtnimg} className="addbtn"/></Link>
//                     <ul className="events">
//                         {cItem.map(item => (
//                             <li key={item.id}>
//                                 <Link to={{pathname:'/calendar/edit',state:{data:item}}}><p className="title" style={{"WebkitBoxOrient": "vertical",color:item.titlecolor,marginBottom:0}}>{item.title}</p></Link>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )
//         }else{
//             const vacation=date.format('d')==6||date.format('d')==0
//             return (
//                 <div style={{width:'100%',height:'100%'}}>
//                     {vacation&&<span className='vacation'>休</span>}
//                     <Link to={{pathname:'/calendar/add',state:{currdate:finddata}}} ><img src={addbtnimg} className="addbtn"/></Link>
//                 </div>
//             )
//         }
//     }
//
//     // onAdd=(date)=>{
//     //     this.props.history.push({pathname:'',state:{currdate:date.format('YYYY-MM-DD')}})
//     // }
// //
//     render() {
//         if(this.state.loading)
//         {
//             return(<Loading />)
//         }else{
//             return (
//                 <div >
//                     <PageHead />
//                     <Calendar value={this.state.date} onSelect={this.onSelect} onPanelChange={this.onPanelChange} dateCellRender={this.dateCellRender} className='calendar' locale={locale}/>
//                 </div>
//             );
//         }
//
//     }
//
// }
//


import React, {Component} from 'react';
import './index.css'
import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import {Modal, Button, Form, Icon} from 'antd';
import moment from "moment";
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import {reqgetcalendar} from "../../api";


const ButtonGroup = Button.Group;

@Form.create()
class Index extends Component {
    calendarRef = React.createRef();
    constructor(props, context) {
        super(props, context);
        this.state = {
            visible :false,
            currentMonth:new Date().getFullYear()+'.'+(new Date().getMonth()+1),
            Schedule:[],
        };
    }


    componentDidMount() {

        this.loadSchedule()
    }

    loadSchedule=async ()=>{
        const calendarInstance = this.calendarRef.current.getInstance();
        let startdate=moment(calendarInstance.getDateRangeStart().toDate()).format('YYYY-MM-DD')
        let enddate=moment(calendarInstance.getDateRangeEnd().toDate()).format('YYYY-MM-DD')
        const ret=await reqgetcalendar(startdate,enddate)
        this.setState({Schedule:ret.data})
    }

    handleClickDayname = (ev) => {
        let key=Object.keys(ev.guide.guideElements)[0]
        // let Element=ev.guide.guideElements[key]
        // this.setState({popupcontainer:Element, visible:true });
        let startdate=moment(ev.start.toDate()).format('YYYY-MM-DD')
        this.props.history.push({pathname:'/calendar/add',state:{currdate:startdate}})
    };

    handleclickSchedule=(schedule,event)=>{
        console.log(schedule)
        this.props.history.push({pathname:'/calendar/edit',state:{data:schedule.schedule.id}})
    }

    handleNext=()=>{
        const calendarInstance = this.calendarRef.current.getInstance();
        calendarInstance.next()
        this.setState({currentMonth:moment(calendarInstance.getDate().toDate()).format('YYYY.M')})
        // this.setState({startdate:moment(calendarInstance.getDateRangeStart().toDate()).format('YYYY-MM-DD')})
        // console.log(this.state.startdate)
        this.loadSchedule()
    }

    handlePrev=()=>{
        const calendarInstance = this.calendarRef.current.getInstance();
        calendarInstance.prev()
        this.setState({currentMonth:moment(calendarInstance.getDate().toDate()).format('YYYY.M')})
        this.loadSchedule()
    }
    handleToday=()=>{
        const calendarInstance = this.calendarRef.current.getInstance();
        calendarInstance.today()
        this.setState({currentMonth:moment(calendarInstance.getDate().toDate()).format('YYYY.M')})
        this.loadSchedule()
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        let template={
            'month.daynames':  ['Suns', 'Mons', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            }
        console.log(this.state.Schedule)
        return (
            //

            <div style={{backgroundColor: 'white',flex:1, height:'100%'}}>
                <div style={{padding:20}}>
                    <Button onClick={this.handleToday} type={"primary"} style={{marginRight:30}}>今日</Button>
                    <ButtonGroup>
                        <Button onClick={this.handlePrev}>
                            <Icon type="left" />
                        </Button>
                        <Button onClick={this.handleNext}><Icon type="right" /></Button>
                    </ButtonGroup>
                    {this.state.currentMonth}
                </div>
                <Calendar
                    ref={this.calendarRef}
                   view={'month'}
                   onBeforeCreateSchedule={this.handleClickDayname}
                    onClickSchedule={this.handleclickSchedule}
                   month={{daynames:['周日', '周一', '周二', '周三', '周四', '周五', '周六'],startDayOfWeek:1}}
                   schedules={this.state.Schedule}
                />
            </div>
        );
    }
}

export default Index;
