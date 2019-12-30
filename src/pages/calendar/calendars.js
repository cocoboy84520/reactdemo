import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Index from "./index";
import Editcalendar from "./editcalendar";
export default class Calendars extends Component{
//
    render() {
        debugger
        return (
            <Switch>
                <Route path='/calendar' component={Index} exact/> {/*路径完全匹配*/}
                <Route path='/calendar/edit' component={Editcalendar}/>
                {/*<Route path='/product/detail' component={ProductDetail}/>*/}
                <Redirect to='/calendar'/>
            </Switch>
        )
    }

}