import React, { Component } from 'react'
import { PageHeader} from 'antd';
import {Link} from 'react-router-dom'

const routes = [
    {
        path: '/home',
        breadcrumbName: '首页',
    },
];

const itemRender=(route, params, routes, paths)=>{
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
        <span>{route.breadcrumbName}</span>
    ) : (
        <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
    );
}

export  default  class Index extends Component{
    render() {
        return(
            <PageHeader
                style={{
                    borderTop: '1px solid rgb(235, 237, 240)',
                    backgroundColor:'#FFF',
                    margin:'-20px -20px 20px -20px'
                }}
                title="日程表"
                breadcrumb={{routes,itemRender}}
            />
        )
    }
}