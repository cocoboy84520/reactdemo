import React, { Component } from 'react'
import './calendars.less'

import locale from '../../locale/zh'


import { Calendar } from 'antd';


export default class DemoApp extends React.Component {


    render() {
        return (
            <Calendar className='calendar' locale={locale}  />

        );
    }

}

