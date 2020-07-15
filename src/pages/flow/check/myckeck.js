
import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Index from "./index";

export default class Mycheck extends Component{
//
    render() {
        return (
            <Switch>
                <Route path='/mycheck' component={Index} exact/> {/*路径完全匹配*/}
                {/*<Route path='/myflow/flowview' component={FlowView}/>*/}
                {/*<Route path='/myflow/editflow' component={Editflow}/>*/}
                {/*/!*<Route path='/product/detail' component={ProductDetail}/>*!/*/}
                <Redirect to='/mycheck'/>
            </Switch>
        )
    }

}
