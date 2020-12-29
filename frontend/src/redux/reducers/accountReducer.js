import * as constants from './constants'


export default function accountReducer(state = [],action){
    switch(action.type){
        case constants.SET_DEPOSITE:
            return { ...action.payload };
        case constants.SET_WITHDRAWAL:
            return {...action.payload };
        case constants.ACCOUNT_INFO:
            return {...action.payload };
        default:
            return state;
    }
}