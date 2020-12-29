import * as constants from './constants'


export default function accountUserReducer(state = [],action){
    switch(action.type){
        case constants.ACCOUNT_INFO:
            return {...action.payload };
        default:
            return state;
    }
}