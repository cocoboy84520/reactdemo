import React, {Component} from 'react'
import { Spin } from 'antd';

class Loading extends Component {

    render() {
        return(
            <div style={{display:"flex",width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>
                <Spin tip="正在玩命加载中..." size="large" />
            </div>

        )
    }
}

export default Loading;
