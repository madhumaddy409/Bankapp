import * as constants from './constants'


export default function transactionReducer(state = [],action){
    switch(action.type){
        case constants.TRANSACTION_INFO:
            return { ...action.payload };
        default:
            return state;
    }
}