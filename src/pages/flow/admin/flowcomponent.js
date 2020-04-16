import React from "react";
import {Flow, withPropsAPI} from 'gg-editor'

class Flowcomponent extends React.Component {
    constructor(props) {
        super(props);
        if(props.onRef){//如果父组件传来该方法 则调用方法将子组件this指针传过去
            props.onRef(this)
        }
    }

    save() {
        console.log('save')
    }

    render() {
        return (
            <Flow style={{flex: 1}} data={this.props.data} onClick={this.props.onClick}/>
        )
    }
}

export default withPropsAPI(Flowcomponent)
