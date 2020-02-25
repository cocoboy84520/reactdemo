import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Index from "./index";
import Addcalendar from "./addcalendar";
import EditCalendar from './editcalendar';
export default class Calendars extends Component{
//
    render() {
        return (
            <Switch>
                <Route path='/calendar' component={Index} exact/> {/*路径完全匹配*/}
                <Route path='/calendar/add' component={Addcalendar}/>
                <Route path='/calendar/edit' component={EditCalendar}/>
                {/*<Route path='/product/detail' component={ProductDetail}/>*/}
                <Redirect to='/calendar'/>
            </Switch>
        )
    }

}
