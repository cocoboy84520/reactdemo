import React ,{Component}from "react";


import {Button, Form, message, Tabs} from "antd";
import FormDesign  from '../../../components/formdesign';
import './formdesign.less'
import {get_formdesign, save_formdesign} from "../../../api";
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const { FormDisplay } = FormDesign;

class FormShow extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
            }
        });
    };
    render() {
        const { fieldsData, form } = this.props;
        return (
            <Form
                className="form-display"
                layout="inline"
                onSubmit={this.handleSubmit}
            >
                <FormDisplay
                    fieldsData={fieldsData}
                    form={form}
                    formItemLayout={{
                        labelCol: {
                            span: 8
                        },
                        wrapperCol: {
                            span: 10
                        }
                    }}
                />
                <FormItem wrapperCol={{ span: 10, offset: 12 }}>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedFormShow = Form.create({
    mapPropsToFields(props) {
        let obj = {};
        let { initValues } = props;
        if (initValues) {
            Object.keys(initValues).forEach(key => {
                obj[key] = Form.createFormField({
                    value: initValues[key]
                });
            });
        }
        return obj;
    }
})(FormShow);

class Formdesign extends Component{
    constructor(props) {
        super(props);
        this.state={
            fieldsData:[],
        }
    }

    async componentDidMount() {
        const ret=await get_formdesign(this.props.location.state.flowid)
        if(ret.ret===200)
        {
            if(ret.data)
            {
                if(ret.data.designdata)
                    this.setState({fieldsData:JSON.parse(ret.data.designdata)})
                this.designid=ret.data.id
            }

        }
    }

    save=(e)=>{
        this.setState({ fieldsData: e });
        console.log(e)
    }

    saveformdesigndata=async ()=>{
        const ret=await save_formdesign(this.props.location.state.flowid,this.designid,this.state.fieldsData)
        if(ret.ret===200)
        {
            message.success('保存成功')
        }else{
            message.error(ret.msg)
        }
    }


    render() {
        return(
            <div>
                <Tabs type="card">
                    <TabPane tab="form表单设计" key="1">
                        <div style={{paddingBottom: 20, paddingLeft:20}}>
                            <Button type="primary" onClick={this.saveformdesigndata}>保存设计</Button>
                        </div>
                        <FormDesign fieldsData={this.state.fieldsData} onSave={this.save} height="500px" />
                    </TabPane>
                    <TabPane tab="form表单展示" key="2">
                        <div style={{ backgroundColor: "#fff", padding: "15px 0" }}>
                            <WrappedFormShow fieldsData={this.state.fieldsData} />
                        </div>
                    </TabPane>
                    <TabPane tab="form表单还原" key="3">
                        {/*<FormDesign*/}
                        {/*    onSave={this.save}*/}
                        {/*    height="500px"*/}
                        {/*    fieldsData={this.state.fieldsData}*/}
                        {/*/>*/}
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}


export default Formdesign
