import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from "./redux/store";
import './i18n'
import App from './App'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
ReactDOM.render(<Provider store={store}><App/></Provider>,document.getElementById('root'))