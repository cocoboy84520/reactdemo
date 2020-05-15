import React, {Component} from 'react';
import {Menu} from "antd";
import Baseview from "./baseview";
import Bind from "./bind";
import './index.less'

class Index extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectkey:'base'
        };
    }

    renderChildren=()=>{
        const {selectkey}=this.state
        console.log(selectkey)
        switch (selectkey) {
            case 'base':
                return <Baseview />
            case 'bind':
                return <Bind />
        }
        return  null
    }

    render() {
        return (
            <div style={{flex:1,display:"flex",backgroundColor:'white'}}>
                <div style={{flex:1,borderRight:'1px solid #e8e8e8'}}>
                    <Menu mode="inline" onClick={({key})=>this.setState({selectkey:key})}>
                        <Menu.Item key={'base'}>基本信息</Menu.Item>
                        <Menu.Item key={'bind'}>账号绑定</Menu.Item>
                    </Menu>
                </div>
                <div style={{flex:4}}>
                    <div style={{flex:1,padding:20}}><span style={{fontSize:20}}>基本信息</span></div>
                    {/*右侧区域内容*/}
                    {this.renderChildren()}
                </div>

            </div>
        );
    }
}

export default Index;
