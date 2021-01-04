import React, {Component} from 'react';
import parse from 'html-react-parser';
import './show.less'
import {Row,Col} from 'antd'
import {getnoticedetail} from "../../api";
import 'braft-editor/dist/index.css'


class Shownotice extends Component {



    constructor(props, context) {
        super(props, context);
        this.state = {
            html:'',
            title:''
        };
    }


   async componentDidMount() {
        let {noticeid}=this.props.location.state
        let ret=await getnoticedetail(noticeid)
       console.log(ret)
        if(ret.ret===200)
        {
            this.setState({html:ret.data.content,title:ret.data.title})
        }
    }

    render() {
        console.log(this.props)
        return (
            <div style={{flex:1, backgroundColor:'#666', padding:10,height:'100vh',display:'flex',justifyContent:'center'}}>
                {/*<Row gutter={{ xs: 24, sm: 24, md: 24}}>*/}
                {/*    <div style={{flex:1}}>*/}
                {/*        <div className={'title'}>{this.state.title}</div>*/}
                {/*        <div className={'container'}>*/}
                {/*            {parse(this.state.html)}*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</Row>*/}
                <div style={{flex:1}}></div>
                <div style={{flex:3, backgroundColor:'white'}}>
                    <div className={'title'}>{this.state.title}</div>
                    <div className={'container'}>
                        {parse(this.state.html)}
                    </div>
                </div>
                <div style={{flex:1}}></div>
            </div>
        );
    }
}

export default Shownotice;
