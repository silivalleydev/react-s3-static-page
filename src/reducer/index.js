
import {combineReducers} from 'redux'
import { SET_MEMBER_TYPE } from '../action';

const InitialState = {
    memberType: ''
}


const reducer = (state = InitialState, action) => {
    switch(action.type){
        case SET_MEMBER_TYPE:
            return{
                ...state,
                memberType: action.data,
            }
        default:
            return state;
    }
} 

const reducers = combineReducers({
    reducer
})

export default reducers;