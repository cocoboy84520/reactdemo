import React, {Component} from 'react';
import {List, Avatar, Modal} from 'antd';
import wechat from '../../assets/images/wechat.png'
import './bind.less'
import queryString from "query-string";
const data = [
    {
        title: '绑定企业微信',
    }
];
class Bind extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            visible:false,
        }
    }

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    bind=()=>{
        console.log('绑定微信')
    }

    async componentWillMount() {
        //引入“微信内嵌二维码”脚本
        console.log(this.props)
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = false;
        script.src = 'http://rescdn.qqmail.com/node/ww/wwopenmng/js/sso/wwLogin-1.0.0.js';
        document.head.appendChild(script);
        // const parsed = queryString.parse(this.props.location.search);
        // if(parsed.code)
        // {
        //     this.setState({isloading:true})
        //     this.props.wxlogin(parsed.code)
        // }
    }

    showqrcode=()=>{
        this.setState({visible:true})
        window.WwLogin({
            "id" : "qrcode",
            "appid" : "ww18011af482c08ca9",
            "agentid" : "1000003",
            "redirect_uri" :"http://122.225.145.62/bingresult",
            "state" : "123456",
            "href" : "",
        });
    }


    render() {
        return (
            <div style={{padding:20}}>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={wechat} size={"large"} />}
                                title={item.title}
                                description="当前未绑定"
                            />
                            <div><a onClick={()=>this.showqrcode()}>绑定</a></div>
                        </List.Item>
                    )}
                />
                <Modal
                    title={null}
                    visible={this.state.visible}
                    footer={null}
                    closable={false}
                    onCancel={this.handleCancel}
                >
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}} id={'qrcode'}>
                        <iframe  src="https://open.work.weixin.qq.com/wwopen/sso/qrConnect?appid=ww18011af482c08ca9&agentid=1000003&redirect_uri=http://122.225.145.62/bingresult&state=123456&login_type=jssdk" frameBorder="0" scrolling="no" width="300px" height="400px"></iframe>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Bind;
