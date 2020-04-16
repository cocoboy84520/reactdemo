import React, {Component, PureComponent} from 'react'
import {Row, Col, List, Card, message} from 'antd'
import './index.less'
import {get_flowlist} from "../../api";
import addbtnimg from "../../assets/images/addcalendar.png";
import {Link} from "react-router-dom";
import Loading from "../../components/loading";

export default class Index extends PureComponent {

    constructor(props) {
        super(props);
        this.state={
            data:[],
            isloading:true,
        }
    }


    async componentWillMount(){
        const ret=await get_flowlist()
        if(ret.ret===200)
        {
            this.setState({data:ret.data,isloading:false})
        }else{
            message.error(ret.msg)
        }
    }

    render() {
        if(this.state.isloading)
        {
            return <Loading />
        }
        return (
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 6,
                }}
                dataSource={this.state.data}
                renderItem={item => (
                    <List.Item>
                        <List
                            size="small"
                            header={<div>{item.type}</div>}
                            bordered
                            dataSource={item.list}
                            renderItem={item => <List.Item><Link to={{pathname:'/newflow/startflow',state:{item:item}}} >{item.flow_name}</Link></List.Item>}
                            style={{backgroundColor:'#fff'}}
                        />
                    </List.Item>
                )}
            />
        )
    }
}
