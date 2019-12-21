import React, { Component } from 'react'
import './calendars.less'
import PageHead from '../../components/pageheader'
import locale from '../../locale/zh'
import { Calendar} from 'antd';


export default class DemoApp extends React.Component {

    render() {
        return (
            <div>
                <PageHead />
                <Calendar className='calendar' locale={locale}/>
            </div>
        );
    }

}

