import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Index from "./index";
import Addnotice from "./addnotice";
import Editnotice from './editnotice';
import Shownotice from "./shownotice";
export default class Calendars extends Component{
//
    render() {
        return (
            <Switch>
                <Route path='/notice' component={Index} exact/> {/*路径完全匹配*/}
                <Route path='/notice/add' component={Addnotice}/>
                <Route path='/notice/edit' component={Editnotice}/>
                <Route path='/notice/show' component={Shownotice}/>
                {/*<Route path='/product/detail' component={ProductDetail}/>*/}
                <Redirect to='/notice'/>
            </Switch>
        )
    }
}
