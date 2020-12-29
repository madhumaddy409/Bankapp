import { combineReducers } from 'redux';

import user from './userReducers'
import loading from './loadingReducers'
import account from './accountReducer'
import accountUser from './accountUserReducer'
import adminUserList from './adminUserListReducer'
import transaction from './transactionReducer'


const rootReducer = combineReducers({ user , loading ,account ,accountUser , adminUserList ,transaction })

export default rootReducer