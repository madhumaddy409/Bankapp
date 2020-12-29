import * as constants from './constants'

export default function adminUserListReducer(state = [],action){
    switch(action.type){
        case constants.USER_LIST:
            return {...action.payload };
        default:
            return state;
    }
}