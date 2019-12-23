import React, { Component } from 'react'
import './calendars.less'
import PageHead from '../../components/pageheader'
import locale from '../../locale/zh'
import { Calendar,Badge} from 'antd';
import {reqgetcalendar, reqlogin} from "../../api";
import {Link} from "react-router-dom";

export default class DemoApp extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            daydata:[],
        }
    }

    async componentWillMount() {
        const response = await reqgetcalendar('', '');

        this.setState({daydata:response.data})

    }
    onPanelChange=(date,model)=>{
        console.log(date.format('M'));
        console.log(model);
    }

    dateCellRender=(date)=>{
        const weekday=date.format('d')
        const finddata=date.format('YYYY-MM-DD');
        const daydate=this.state.daydata;
        const cItem=daydate.find(cItem=>cItem.date==finddata)

        if(cItem)
        {
            const vacation=cItem.vacation||date.format('d')==6||date.format('d')==0
            return (
                <div style={{width:'100%',height:'100%'}}>
                    {vacation&&<span className='vacation'>休</span>}
                    <ul className="events">
                        {cItem.list.map(item => (
                            <li key={item.title}>
                                <Badge color={item.color} status='default' text={item.title} />
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
                </div>
            )
        }
    }

    render() {
        debugger
        return (
            <div>
                <PageHead />
                <Calendar onPanelChange={this.onPanelChange} dateCellRender={this.dateCellRender} className='calendar' locale={locale}/>
            </div>
        );
    }

}

