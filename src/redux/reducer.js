

import {combineReducers} from "redux";
import {SET_HEAD_TITLE} from './action-type'
const initUser={}
function user(state=initUser,action) {
    switch (action.type) {
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