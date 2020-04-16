import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Index from './default'
import flowdesign from "./flowdesign";
import formdesign from './formdesign'
export default class Flowadmin extends Component{
//
    render() {
        return (
            <Switch>
                <Route path='/flowadmin' component={Index} exact/> {/*路径完全匹配*/}
                <Route path='/flowadmin/flowdesign' component={flowdesign}/>
                <Route path='/flowadmin/formdesign' component={formdesign}/>
                {/*<Route path='/product/detail' component={ProductDetail}/>*/}
                <Redirect to='/flowadmin'/>
            </Switch>
        )
    }
}
