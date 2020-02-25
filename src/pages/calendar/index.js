import React, { Component } from 'react'
import './calendars.less'
import PageHead from '../../components/pageheader'
import locale from '../../locale/zh'
import { Calendar,Badge} from 'antd';
import {reqgetcalendar, reqlogin} from "../../api";
import {Link} from "react-router-dom";
import addbtnimg from '../../assets/images/addcalendar.png';
import Loading from "../../components/loading";
import moment from "moment";
export default class Index extends React.Component {

    constructor(props) {
        super(props);
        var now = moment().locale('zh-cn').format('YYYY-MM-DD');
        console.log(now)
        this.state={
            daydata:[],
            loading:true,
            date:moment(now)
        }
    }

    async componentDidMount() {
        const response = await reqgetcalendar('');
        this.setState({daydata:response.data,loading:false})
    }
    onPanelChange= async (date,model)=>{
        this.setState({loading:true,date:date})
        const response = await reqgetcalendar(date.format('YYYY-MM-DD'));
        this.setState({daydata:response.data,loading:false})
    }

    dateCellRender=(date)=>{
        const weekday=date.format('d')
        const finddata=date.format('YYYY-MM-DD');
        const daydate=this.state.daydata;
        const cItem=daydate[finddata];
        if(cItem)
        {
            const vacation=cItem.vacation||date.format('d')==6||date.format('d')==0
            return (
                <div style={{width:'100%',height:'100%'}}>
                    {vacation&&<span className='vacation'>休</span>}
                        <Link to={{pathname:'/calendar/add',state:{currdate:finddata}}} ><img src={addbtnimg} className="addbtn"/></Link>
                    <ul className="events">
                        {cItem.map(item => (
                            <li key={item.id}>
                                <Link to={{pathname:'/calendar/edit',state:{data:item}}}><p className="title" style={{"WebkitBoxOrient": "vertical",color:item.titlecolor,marginBottom:0}}>{item.title}</p></Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }else{
            const vacation=date.format('d')==6||date.format('d')==0
            return (
                <div style={{width:'100%',height:'100%'}}>
                    {vacation&&<span className='vacation'>休</span>}
                    <Link to={{pathname:'/calendar/add',state:{currdate:finddata}}} ><img src={addbtnimg} className="addbtn"/></Link>
                </div>
            )
        }
    }

    // onAdd=(date)=>{
    //     this.props.history.push({pathname:'',state:{currdate:date.format('YYYY-MM-DD')}})
    // }
//
    render() {
        if(this.state.loading)
        {
            return(<Loading />)
        }else{
            return (
                <div >
                    <PageHead />
                    <Calendar value={this.state.date} onSelect={this.onSelect} onPanelChange={this.onPanelChange} dateCellRender={this.dateCellRender} className='calendar' locale={locale}/>
                </div>
            );
        }

    }

}

