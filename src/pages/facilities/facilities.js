import React, { Component,PureComponent } from 'react'
import PageHead from "../../components/pageheader";
import FormDesign from '../../components/formdesign';


import { Button, Form, Tabs } from "antd";
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const { FormDisplay } = FormDesign;
class FormShow extends PureComponent {
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
export default class Facilities extends Component {
    render() {
        return (
            <div>
                <PageHead />
            </div>
        )
    }
}
