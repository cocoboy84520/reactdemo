import React, {Component} from 'react';
import PageHeader from '../../components/pageheader'
import {Form, Input, Row, Col, Select, message,Timeline} from 'antd'
import {getexpresslist, gettrack} from "../../api";

const { Search } = Input;
const {Option} =Select;
@Form.create()
class Index extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [],
            value: undefined,
            showresult:false,
        };
    }


    handleChange = value => {
        this.setState({ value });
    };

    handleSearch = async value => {
        try {
            const ret=await getexpresslist(value)
            if(ret.ret===200){
                this.setState({data:ret.data.list})
                console.log(this.state.data)
            }
        }catch (e) {
            message.error(e.message)
        }
    };

    search=(value)=>{
        this.props.form.validateFields(async (err, values) => {
            if(!err)
            {
                let {ShipperCode,LogisticCode}=values
                try
                {
                    const ret=await gettrack(ShipperCode,LogisticCode)
                    if(ret.ret===200)
                    {
                        this.setState({TrackData:ret.data.Traces,showresult:true})
                    }
                }catch (e) {
                    message.error(e.message)
                }
            }
        })
    }

    render() {
        const {getFieldDecorator}=this.props.form
        const options = this.state.data.map(d => <Option key={d.expresscode}>{d.expressname}</Option>);
        return (
            <div>
                <PageHeader />
                <div style={{display:"flex", backgroundColor:'white', paddingTop:50}}>
                    <Row style={{flex:1}}>
                        <Col span={6}>

                        </Col>
                        <Col span={12}>
                            <Form labelAlign={"left"} labelCol={{span:4}} wrapperCol={{span:20}}>
                                <Form.Item label={'物流公司'}>
                                    {getFieldDecorator('ShipperCode', {
                                        rules: [{ required: true, message: '请选择物流公司' }],
                                    })(<Select
                                        allowClear={true}
                                        showSearch
                                        value={this.state.value}
                                        defaultActiveFirstOption={false}
                                        showArrow={false}
                                        filterOption={false}
                                        onSearch={this.handleSearch}
                                        onChange={this.handleChange}
                                        notFoundContent={null}
                                        size={"large"}
                                        style={{width:200}}
                                    >
                                        {options}
                                    </Select>)}
                                </Form.Item>
                                <Form.Item label={'物流单号'}>
                                    {getFieldDecorator('LogisticCode', {
                                        rules: [{ required: true, message: '请输入查询的单号' }],
                                    })(<Search
                                        enterButton="查询"
                                        size="large"
                                        onSearch={value => this.search(value)}
                                    />)}
                                </Form.Item>
                                <Form.Item>
                                    {this.state.showresult&&<div style={{flex:1,}}>
                                        <Timeline>
                                            {this.state.TrackData.map((item,index)=>
                                                    <Timeline.Item>
                                                <p style={{backgroundColor:'white'}}>{item.AcceptTime}</p>
                                                        <p style={{backgroundColor:'white'}}>{item.AcceptStation}</p>
                                            </Timeline.Item>
                                            )}

                                        </Timeline>
                                    </div>}
                                </Form.Item>
                            </Form>
                        </Col>
                        <Col span={6}>

                        </Col>
                    </Row>

                </div>
            </div>
        );
    }
}

export default Index;
