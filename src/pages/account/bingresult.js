import React, {Component} from 'react';
import {Result, Button, Spin} from "antd";
import queryString from 'query-string'
import {wxbind} from "../../api";
import {connect} from 'react-redux'
import {updateuserinfo} from '../../redux/actions'
@connect( state=>state, { updateuserinfo } )
class Bingresult extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isloading:true
        };
    }

    async componentDidMount() {
        console.log(this.props)
        try {
            const parsed = queryString.parse(this.props.location.search);
            if(parsed.code)
            {
                const ret=await wxbind(parsed.code)
                if(ret.ret===200)
                {
                    this.setState(({isloading:false,success:true}))
                    this.props.updateuserinfo(ret.data)
                }else{
                    this.setState(({isloading:false,success:false,errorinfo:ret.msg}))
                }
            }
        }catch (e) {
            this.setState(({isloading:false,success:false,errorinfo:e.message}))
        }
    }

    render() {
        if(this.state.isloading)
        {
            return  <div style={{flex:1,display:"flex",height:'100%',justifyContent:'center',alignItems:"center"}}><Spin size="large" /></div>
        }else{
            if(this.state.success)
            {
                return (
                    <div style={{flex:1,justifyContent:'center',alignItems:"center"}}>
                        <Result
                            status="success"
                            title="您已成功绑定企业微信"
                            // subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                            extra={[
                                <Button type="primary" key="gohome" onClick={()=>this.props.history.replace('/home')}>
                                    返回首页
                                </Button>,
                            ]}
                        />
                    </div>
                );
            }else{
                return(
                    <div style={{flex:1,justifyContent:'center',alignItems:"center"}}>
                        <Result
                            status="error"
                            title="企业微信绑定失败"
                            subTitle={this.state.errorinfo}
                            extra={[
                                <Button type="primary" key="gohome" onClick={()=>this.props.history.replace('/home')}>
                                    返回首页
                                </Button>,
                            ]}
                        />
                    </div>
                )
            }
        }


    }
}

export default Bingresult;
