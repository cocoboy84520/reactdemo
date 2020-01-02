import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from "./redux/store";
import {persistor} from './redux/store';
import {PersistGate} from 'redux-persist/lib/integration/react';
import './i18n'
import App from './App'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
ReactDOM.render(<Provider store={store}><PersistGate loading={null} persistor={persistor}><App/></PersistGate></Provider>,document.getElementById('root'))