import React, {Component} from 'react';
import {Col, message, Row, Icon, Button, Tabs, Form, Input,Radio,Select  } from 'antd';
import GGEditor, {Flow, Item, ItemPanel, withPropsAPI} from 'gg-editor';
import Flowcomponent from "./flowcomponent";
import './flowdesign.less';
import {
    addprocess,
    delprocess,
    get_canvas,
    get_processarrt,
    getuserlist,
    save_canvas,
    save_processarrt
} from "../../../api";

GGEditor.setTrackable(false);

const ButtonGroup = Button.Group;
const {TabPane} = Tabs;
const { Option, OptGroup } = Select;
class flowdesign extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canvasdata: [],
            userlist:[],
            savebtn_enable:true,
            selectitemid:0,
        }
    }

    componentDidMount() {
        this.loadcanvas()
        this.loaduser()
    }

    loadcanvas = async () => {
        const ret = await get_canvas(this.props.location.state.flowid)
        if (ret.ret === 200) {
            this.setState({canvasdata: ret.data})
        } else {
            message.error(ret.msg)
        }
    }

    loaduser=async ()=>{
        const userlist = await getuserlist()
        if (userlist.ret === 200) {
            this.setState({userlist: userlist.data})
        }
    }

    save = async () => {
        const data = this.Flowcomponent.props.propsAPI.save()
        const ret = await save_canvas(JSON.stringify(data), this.props.location.state.flowid)
        if (ret.ret === 200) {
            message.success('保存成功')
        } else {
            message.error('保存失败,' + ret.msg)
        }
    }

    loadattr=async (processid)=>{
        const ret=await get_processarrt(processid)
        if(ret.ret===200)
        {
            this.props.form.setFieldsValue({
                process_type:ret.data.process_type,
                is_sing:ret.data.is_sing,
                is_back:ret.data.is_back,
                auto_person:ret.data.auto_person,
                auto_sponsor_ids:ret.data.auto_sponsor_ids.length>0?ret.data.auto_sponsor_ids.split(','):[],
            })
        }else{
            message.error(`读取步骤属性出错,${ret.msg}`)
        }
    }

    onBeforeCommandExecute = async e => {
        if (e.command.name === 'add' && e.command.type == 'node') {
            debugger
            let ret = await addprocess(this.props.location.state.flowid, e.command.addModel.id)
            if (ret.ret !== 200) {
                // 如果数据库添加节点失败则删除该节点
                this.Flowcomponent.props.propsAPI.executeCommand('undo')
                message.error('节点添加失败,' + ret.msg)
            }
        }
        if (e.command.name === 'delete') {
            let SelectedItems = this.Flowcomponent.props.propsAPI.getSelected()
            let SelectItemID = []
            SelectedItems.map((item, index) => {
                if (item.type === 'node') {
                    SelectItemID.push(item.id)
                }
            })
            if (SelectItemID.length > 0) {
                let ret = await delprocess(this.props.location.state.flowid, SelectItemID)
                if (ret.ret !== 200) {
                    this.Flowcomponent.props.propsAPI.executeCommand('undo')
                }
            }

        }
    }

    itemClick=e=>{
        if(e.item)
        {
            if(e.item.type==='node')
            {
                this.setState({savebtn_enable:false,selectitemid:e.item.id})
                this.loadattr(e.item.id)
            }else{
                this.setState({savebtn_enable:true})
            }
        }else{
            this.setState({savebtn_enable:true})
        }
    }

    // 属性保存
    handleSubmit = event => {
        event.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if(!err)
            {
                const {process_type,is_sing,is_back,auto_person,auto_sponsor_ids}=values
                const ret=await save_processarrt(this.state.selectitemid,process_type,is_sing,is_back,auto_person,auto_sponsor_ids)
                if(ret.ret===200)
                {
                    message.success('保存成功')
                }else{
                    message.error(ret.msg)
                }
            }
        })
    }
    render() {
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 15
            },
        };
        const {getFieldDecorator} = this.props.form;
        return (
            <GGEditor className={'editor'} onBeforeCommandExecute={this.onBeforeCommandExecute}>
                <Row type={'flex'} className={'toolbar'}>
                    <Button type="primary" icon="save" onClick={this.save}>保存</Button>
                </Row>
                <Row type="flex" className={'editorBd'}>
                    <Col span={4} className={'editorSidebar'}>
                        <ItemPanel className={'itemPanelStyle'}>
                            <Item className={'itemstyle'}
                                  type="node"
                                  size="72*72"

                                  model={{
                                      color: '#FA8C16',
                                      label: 'Start',
                                      shape: 'flow-circle'
                                  }}
                                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxjaXJjbGUgaWQ9ImIiIGN4PSIzNiIgY3k9IjM2IiByPSIzNiIvPjxmaWx0ZXIgeD0iLTkuNyUiIHk9Ii02LjklIiB3aWR0aD0iMTE5LjQlIiBoZWlnaHQ9IjExOS40JSIgZmlsdGVyVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94IiBpZD0iYSI+PGZlT2Zmc2V0IGR5PSIyIiBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIxIi8+PGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMiIgaW49InNoYWRvd09mZnNldE91dGVyMSIgcmVzdWx0PSJzaGFkb3dCbHVyT3V0ZXIxIi8+PGZlQ29tcG9zaXRlIGluPSJzaGFkb3dCbHVyT3V0ZXIxIiBpbjI9IlNvdXJjZUFscGhhIiBvcGVyYXRvcj0ib3V0IiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiLz48ZmVDb2xvck1hdHJpeCB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMDQgMCIgaW49InNoYWRvd0JsdXJPdXRlcjEiLz48L2ZpbHRlcj48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0IDIpIj48dXNlIGZpbGw9IiMwMDAiIGZpbHRlcj0idXJsKCNhKSIgeGxpbms6aHJlZj0iI2IiLz48dXNlIGZpbGwtb3BhY2l0eT0iLjkyIiBmaWxsPSIjRkZGMkU4IiB4bGluazpocmVmPSIjYiIvPjxjaXJjbGUgc3Ryb2tlPSIjRkZDMDY5IiBjeD0iMzYiIGN5PSIzNiIgcj0iMzUuNSIvPjwvZz48dGV4dCBmb250LWZhbWlseT0iUGluZ0ZhbmdTQy1SZWd1bGFyLCBQaW5nRmFuZyBTQyIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIuNjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQgMikiPjx0c3BhbiB4PSIyMyIgeT0iNDEiPlN0YXJ0PC90c3Bhbj48L3RleHQ+PC9nPjwvc3ZnPg=="
                            >
                                <img draggable={false}
                                     src={'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxjaXJjbGUgaWQ9ImIiIGN4PSIzNiIgY3k9IjM2IiByPSIzNiIvPjxmaWx0ZXIgeD0iLTkuNyUiIHk9Ii02LjklIiB3aWR0aD0iMTE5LjQlIiBoZWlnaHQ9IjExOS40JSIgZmlsdGVyVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94IiBpZD0iYSI+PGZlT2Zmc2V0IGR5PSIyIiBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIxIi8+PGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMiIgaW49InNoYWRvd09mZnNldE91dGVyMSIgcmVzdWx0PSJzaGFkb3dCbHVyT3V0ZXIxIi8+PGZlQ29tcG9zaXRlIGluPSJzaGFkb3dCbHVyT3V0ZXIxIiBpbjI9IlNvdXJjZUFscGhhIiBvcGVyYXRvcj0ib3V0IiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiLz48ZmVDb2xvck1hdHJpeCB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMDQgMCIgaW49InNoYWRvd0JsdXJPdXRlcjEiLz48L2ZpbHRlcj48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0IDIpIj48dXNlIGZpbGw9IiMwMDAiIGZpbHRlcj0idXJsKCNhKSIgeGxpbms6aHJlZj0iI2IiLz48dXNlIGZpbGwtb3BhY2l0eT0iLjkyIiBmaWxsPSIjRkZGMkU4IiB4bGluazpocmVmPSIjYiIvPjxjaXJjbGUgc3Ryb2tlPSIjRkZDMDY5IiBjeD0iMzYiIGN5PSIzNiIgcj0iMzUuNSIvPjwvZz48dGV4dCBmb250LWZhbWlseT0iUGluZ0ZhbmdTQy1SZWd1bGFyLCBQaW5nRmFuZyBTQyIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIuNjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQgMikiPjx0c3BhbiB4PSIyMyIgeT0iNDEiPlN0YXJ0PC90c3Bhbj48L3RleHQ+PC9nPjwvc3ZnPg=='}/>
                            </Item>
                            <Item className={'itemstyle'}
                                  type="node"
                                  size="80*48"
                                  shape="flow-rect"
                                  model={{
                                      color: '#1890FF',
                                      label: 'Normal',
                                  }}>
                                <img draggable={false}
                                     src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iNTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxyZWN0IGlkPSJiIiB4PSIwIiB5PSIwIiB3aWR0aD0iODAiIGhlaWdodD0iNDgiIHJ4PSI0Ii8+PGZpbHRlciB4PSItOC44JSIgeT0iLTEwLjQlIiB3aWR0aD0iMTE3LjUlIiBoZWlnaHQ9IjEyOS4yJSIgZmlsdGVyVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94IiBpZD0iYSI+PGZlT2Zmc2V0IGR5PSIyIiBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIxIi8+PGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMiIgaW49InNoYWRvd09mZnNldE91dGVyMSIgcmVzdWx0PSJzaGFkb3dCbHVyT3V0ZXIxIi8+PGZlQ29tcG9zaXRlIGluPSJzaGFkb3dCbHVyT3V0ZXIxIiBpbjI9IlNvdXJjZUFscGhhIiBvcGVyYXRvcj0ib3V0IiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiLz48ZmVDb2xvck1hdHJpeCB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMDQgMCIgaW49InNoYWRvd0JsdXJPdXRlcjEiLz48L2ZpbHRlcj48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0IDIpIj48dXNlIGZpbGw9IiMwMDAiIGZpbHRlcj0idXJsKCNhKSIgeGxpbms6aHJlZj0iI2IiLz48dXNlIGZpbGwtb3BhY2l0eT0iLjkyIiBmaWxsPSIjRTZGN0ZGIiB4bGluazpocmVmPSIjYiIvPjxyZWN0IHN0cm9rZT0iIzE4OTBGRiIgeD0iLjUiIHk9Ii41IiB3aWR0aD0iNzkiIGhlaWdodD0iNDciIHJ4PSI0Ii8+PC9nPjx0ZXh0IGZvbnQtZmFtaWx5PSJQaW5nRmFuZ1NDLVJlZ3VsYXIsIFBpbmdGYW5nIFNDIiBmb250LXNpemU9IjEyIiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii42NSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNCAyKSI+PHRzcGFuIHg9IjIxIiB5PSIyOSI+Tm9ybWFsPC90c3Bhbj48L3RleHQ+PC9nPjwvc3ZnPg=="/>
                            </Item>
                            <Item className={'itemstyle'}
                                  type="node"
                                  size="80*72"
                                  shape="flow-rhombus"
                                  model={{
                                      color: '#13C2C2',
                                      label: 'Decision',
                                  }}>
                                <img draggable={false}
                                     src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODYiIGhlaWdodD0iNzgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGQ9Ik00Mi42NyAxLjY3bDM0Ljk2NSAzMS4zNTJhNCA0IDAgMCAxIDAgNS45NTZMNDIuNjcgNzAuMzNhNCA0IDAgMCAxLTUuMzQgMEwyLjM2NSAzOC45NzhhNCA0IDAgMCAxIDAtNS45NTZMMzcuMzMgMS42N2E0IDQgMCAwIDEgNS4zNCAweiIgaWQ9ImIiLz48ZmlsdGVyIHg9Ii04LjglIiB5PSItNi45JSIgd2lkdGg9IjExNy41JSIgaGVpZ2h0PSIxMTkuNCUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgaWQ9ImEiPjxmZU9mZnNldCBkeT0iMiIgaW49IlNvdXJjZUFscGhhIiByZXN1bHQ9InNoYWRvd09mZnNldE91dGVyMSIvPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiIGluPSJzaGFkb3dPZmZzZXRPdXRlcjEiIHJlc3VsdD0ic2hhZG93Qmx1ck91dGVyMSIvPjxmZUNvbXBvc2l0ZSBpbj0ic2hhZG93Qmx1ck91dGVyMSIgaW4yPSJTb3VyY2VBbHBoYSIgb3BlcmF0b3I9Im91dCIgcmVzdWx0PSJzaGFkb3dCbHVyT3V0ZXIxIi8+PGZlQ29sb3JNYXRyaXggdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjA0IDAiIGluPSJzaGFkb3dCbHVyT3V0ZXIxIi8+PC9maWx0ZXI+PC9kZWZzPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMyAxKSI+PHVzZSBmaWxsPSIjMDAwIiBmaWx0ZXI9InVybCgjYSkiIHhsaW5rOmhyZWY9IiNiIi8+PHVzZSBmaWxsLW9wYWNpdHk9Ii45MiIgZmlsbD0iI0U2RkZGQiIgeGxpbms6aHJlZj0iI2IiLz48cGF0aCBzdHJva2U9IiM1Q0RCRDMiIGQ9Ik00Mi4zMzcgMi4wNDJhMy41IDMuNSAwIDAgMC00LjY3NCAwTDIuNjk4IDMzLjM5NGEzLjUgMy41IDAgMCAwIDAgNS4yMTJsMzQuOTY1IDMxLjM1MmEzLjUgMy41IDAgMCAwIDQuNjc0IDBsMzQuOTY1LTMxLjM1MmEzLjUgMy41IDAgMCAwIDAtNS4yMTJMNDIuMzM3IDIuMDQyeiIvPjwvZz48dGV4dCBmb250LWZhbWlseT0iUGluZ0ZhbmdTQy1SZWd1bGFyLCBQaW5nRmFuZyBTQyIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIuNjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMgMSkiPjx0c3BhbiB4PSIxOCIgeT0iNDIiPkRlY2lzaW9uPC90c3Bhbj48L3RleHQ+PC9nPjwvc3ZnPg=="/>
                            </Item>
                            <Item className={'itemstyle'}
                                  type="node"
                                  size="80*48"
                                  shape="flow-capsule"
                                  model={{
                                      color: '#722ED1',
                                      label: 'Model',
                                  }}>
                                <img draggable={false}
                                     src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iNTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxyZWN0IGlkPSJiIiB4PSIwIiB5PSIwIiB3aWR0aD0iODAiIGhlaWdodD0iNDgiIHJ4PSIyNCIvPjxmaWx0ZXIgeD0iLTguOCUiIHk9Ii0xMC40JSIgd2lkdGg9IjExNy41JSIgaGVpZ2h0PSIxMjkuMiUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgaWQ9ImEiPjxmZU9mZnNldCBkeT0iMiIgaW49IlNvdXJjZUFscGhhIiByZXN1bHQ9InNoYWRvd09mZnNldE91dGVyMSIvPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiIGluPSJzaGFkb3dPZmZzZXRPdXRlcjEiIHJlc3VsdD0ic2hhZG93Qmx1ck91dGVyMSIvPjxmZUNvbXBvc2l0ZSBpbj0ic2hhZG93Qmx1ck91dGVyMSIgaW4yPSJTb3VyY2VBbHBoYSIgb3BlcmF0b3I9Im91dCIgcmVzdWx0PSJzaGFkb3dCbHVyT3V0ZXIxIi8+PGZlQ29sb3JNYXRyaXggdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjA0IDAiIGluPSJzaGFkb3dCbHVyT3V0ZXIxIi8+PC9maWx0ZXI+PC9kZWZzPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNCAyKSI+PHVzZSBmaWxsPSIjMDAwIiBmaWx0ZXI9InVybCgjYSkiIHhsaW5rOmhyZWY9IiNiIi8+PHVzZSBmaWxsLW9wYWNpdHk9Ii45MiIgZmlsbD0iI0Y5RjBGRiIgeGxpbms6aHJlZj0iI2IiLz48cmVjdCBzdHJva2U9IiNCMzdGRUIiIHg9Ii41IiB5PSIuNSIgd2lkdGg9Ijc5IiBoZWlnaHQ9IjQ3IiByeD0iMjMuNSIvPjwvZz48dGV4dCBmb250LWZhbWlseT0iUGluZ0ZhbmdTQy1SZWd1bGFyLCBQaW5nRmFuZyBTQyIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIuNjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQgMikiPjx0c3BhbiB4PSIyNCIgeT0iMjkiPk1vZGVsPC90c3Bhbj48L3RleHQ+PC9nPjwvc3ZnPg=="/>
                            </Item>
                        </ItemPanel>
                    </Col>
                    <Col span={13} className={'editorContent'}>
                        <Flowcomponent data={this.state.canvasdata} onRef={(ref) => {
                            this.Flowcomponent = ref
                        }} flowid={this.props.location.state.flowid} onClick={this.itemClick}/>
                        {/*<EditableLabel />*/}
                    </Col>
                    <Col span={7} className={'editorSidebar'}>
                        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="节点属性" key="1">
                                    <Form.Item label={("步骤类型")}>
                                        {getFieldDecorator('process_type', {
                                            rules: [{required: true, message: ('请选择步骤类型')}]
                                        })(<Radio.Group onChange={this.onChange}>
                                            <Radio value={'is_step'}>正常步骤</Radio>
                                            <Radio value={'is_one'}>第一步</Radio>
                                        </Radio.Group>)}
                                    </Form.Item>
                                    <Form.Item label={("会签方式")}>
                                        {getFieldDecorator('is_sing', {
                                            rules: [{required: true, message: ('请选择会签方式')}]
                                        })(<Radio.Group onChange={this.onChange}>
                                            <Radio value={1}>允许会签</Radio>
                                            <Radio value={2}>禁止会签</Radio>
                                        </Radio.Group>)}
                                    </Form.Item>
                                    <Form.Item label={("回退方式")}>
                                        {getFieldDecorator('is_back', {
                                            rules: [{required: true, message: ('请选择回退方式')}]
                                        })(<Radio.Group onChange={this.onChange}>
                                            <Radio value={1}>不允许</Radio>
                                            <Radio value={2}>允许回退</Radio>
                                        </Radio.Group>)}
                                    </Form.Item>
                                </TabPane>
                                <TabPane tab="节点人员" key="2">
                                    <Form.Item label={("办理人员")}>
                                        {getFieldDecorator('auto_person', {
                                            rules: [{required: true, message: ('请选择办理人员')}]
                                        })(<Select  style={{ width: 120 }}>
                                            <Option key={3} value={3}>自由选择</Option>
                                            <Option key={4} value={4}>指定人员</Option>
                                            <Option key={5} value={5}>指定角色</Option>
                                            <Option key={6} value={6}>事物接受</Option>
                                        </Select>)}
                                    </Form.Item>
                                    <Form.Item label={("请选择")}>
                                        {getFieldDecorator('auto_sponsor_ids', {
                                            rules: [{required: true, message: ('请选择')}]
                                        })(<Select mode='multiple'>
                                            {this.state.userlist.map((item, index) => {
                                                    return (
                                                        <OptGroup key={index} label={item.DepartName}>
                                                            {item.users.map((user, uindex) => {
                                                                return (
                                                                    <Option key={user.id} value={user.id.toString()}>{user.name}</Option>
                                                                )
                                                            })}

                                                        </OptGroup>
                                                    )
                                                }
                                            )}
                                        </Select>)}
                                    </Form.Item>
                                </TabPane>

                            </Tabs>
                            <Form.Item  wrapperCol={{offset: 9}}>
                                <Button disabled={this.state.savebtn_enable} htmlType="submit" type="primary" htmlType="submit">
                                    {('提交')}
                                </Button>
                                <Button style={{marginLeft:20}}  onClick={()=>this.props.history.goBack()}>返回</Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </GGEditor>
        )
    }
}

const DesignForm = Form.create()(flowdesign)
export default DesignForm
