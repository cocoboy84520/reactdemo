import React, {Component} from 'react'
import {Checkbox} from "antd";

class WrapedCheckBox extends Component {

    render() {
        debugger
        let status = false;
        if (this.props.value === true || this.props.value === 'true') status=true;
        return (
            <Checkbox
                checked={status}
                onChange={this.props.onChange}>
                {this.props.text}
            </Checkbox>
        );
    }
}

export default WrapedCheckBox;