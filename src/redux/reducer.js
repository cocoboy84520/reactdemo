

import {combineReducers} from "redux";
import {RECEIVE_USER, SET_HEAD_TITLE} from './action-type'
const initUser={}
function user(state=initUser,action) {
    switch (action.type) {
        case RECEIVE_USER:
            return action.user
        default:
            return state
    }
}

const initHeadTitle='home'
function headTitle(state=initHeadTitle,action) {
    switch (action.type) {
        case SET_HEAD_TITLE:
            return action.data
        default:
            return state
    }
}

export default combineReducers({
    headTitle,
    user
})