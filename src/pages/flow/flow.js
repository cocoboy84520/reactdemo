import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Index from "./index";
import Startflow from "./startflow";
import FlowView from "./flowview";
import ExportPdf from "./exportpdf";
export default class Flow extends Component{
//
    render() {
        return (
            <Switch>
                <Route path='/newflow' component={Index} exact/> {/*路径完全匹配*/}
                <Route path='/newflow/startflow' component={Startflow}/>
                <Route path='/myflow/flowview' component={FlowView}/>
                <Route path='/myflow/exportpdf' component={ExportPdf}/>
                {/*<Route path='/product/detail' component={ProductDetail}/>*/}
                <Redirect to='/newflow'/>
            </Switch>
        )
    }

}
