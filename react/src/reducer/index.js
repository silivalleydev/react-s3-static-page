
import {combineReducers} from 'redux'
import { MENU_CHANGE } from '../action';

const InitialState = {
    isMenuChanged: false
}


const reducer = (state = InitialState, action) => {
    switch(action.type){
        case MENU_CHANGE:
            return{
                ...state,
                isMenuChanged: action.data,
            }
        default:
            return state;
    }
} 

const reducers = combineReducers({
    reducer
})

export default reducers;