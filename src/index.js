import React from 'react'
import ReactDOM from 'react-dom'
import './i18n'
import App from './App'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
ReactDOM.render(<App/>,document.getElementById('root'))