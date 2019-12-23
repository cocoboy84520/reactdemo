import React, {Component} from 'react'
import {PageHeader} from 'antd';
import {Link, withRouter} from 'react-router-dom'
import menuList from "../../config/menuConfig";
import {connect} from 'react-redux'

const itemRender = (route, params, routes, paths) => {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
        <span>{route.breadcrumbName}</span>
    ) : (
        <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
    );
}


@withRouter
class Index extends Component {

    constructor(props) {
        super(props);

    }


    componentWillMount() {
        this.routes = [
            {
                path: '/home',
                breadcrumbName: '首页',
            },
        ];
        const path = this.props.location.pathname;
        menuList.map(item=>{
            if(!item.children)
            {
                if(item.key===path)
                {
                    this.setState({
                        currpagename: item.title
                    })
                    let currroute = {path: path, breadcrumbName: item.title}
                    this.routes.push(currroute)
                    return
                }
            }else{
                const cItem=item.children.find(cItem=>cItem.key===path)
                if(cItem)
                {
                    this.setState({
                        currpagename: cItem.title
                    })
                    let currroute = {path: path, breadcrumbName: cItem.title}
                    this.routes.push(currroute)
                    return
                }
            }
        })

    }


    render() {
        return (
            <PageHeader
                style={{
                    borderTop: '1px solid rgb(235, 237, 240)',
                    backgroundColor: '#FFF',
                    margin: '-20px -20px 20px -20px'
                }}
                title={this.props.headTitle}
                breadcrumb={{routes: this.routes, itemRender}}
            />
        )
    }
}

export default connect(
    state=>({
        headTitle:state.headTitle
    }),
    {}
)(Index)