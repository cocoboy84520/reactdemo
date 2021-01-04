import React, {Component} from 'react';
import {Menu} from "antd";
import Baseview from "./baseview";
import Bind from "./bind";
import Entrust from "./entrust";
import './index.less'
import {connect} from 'react-redux'
import {receiveUser} from '../../redux/actions'
@connect( state=>state, { receiveUser } )
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
            case 'Entrust':
                return <Entrust />
        }
        return  null
    }

    render() {
        console.log(this.props)
        return (
            <div style={{flex:1,display:"flex",backgroundColor:'white'}}>
                <div style={{flex:1,borderRight:'1px solid #e8e8e8'}}>
                    <Menu mode="inline" onClick={({key})=>this.setState({selectkey:key})} selectedKeys={this.state.selectkey}>
                        <Menu.Item key={'base'}>基本信息</Menu.Item>
                        <Menu.Item key={'bind'}>账号绑定</Menu.Item>
                        <Menu.Item key={'Entrust'}>审批委托</Menu.Item>
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
