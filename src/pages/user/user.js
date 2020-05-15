import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Index from "./index";
import UserAdd from './useradd'
import UserEdit from "./useredit";
export default class User extends Component{
//
    render() {
        return (
            <Switch>
                <Route path='/user' component={Index} exact/> {/*路径完全匹配*/}
                <Route path='/user/add' component={UserAdd}/>
                <Route path='/user/edit' component={UserEdit}/>
                {/*<Route path='/product/detail' component={ProductDetail}/>*/}
                <Redirect to='/user'/>
            </Switch>
        )
    }

}
