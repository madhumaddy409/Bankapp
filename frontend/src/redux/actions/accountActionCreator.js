
import * as constants from '../reducers/constants'

export const depositeAmount = (data, onSuccess, onError ) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: '/api/deposit',
        data,
        success: (deposite) => (setDeposite(deposite)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
})


const setDeposite = (deposite) =>({
    // console.log(data)
    type: constants.SET_DEPOSITE,
    payload: deposite
})

export const withdrawalAmount = (data, onSuccess, onError ) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: '/api/withdraw',
        data,
        success: (withdrawal) => (setWithdrawal(withdrawal)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
})


const setWithdrawal = (withdrawal) =>({
    // console.log(data)
    type: constants.SET_WITHDRAWAL,
    payload: withdrawal
})


export const userInfo = (onSuccess, onError ) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: '/api/profile',
        success: (userInfo) => (setUserInfo(userInfo)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
})


const setUserInfo = (accountUser) =>({
    type: constants.ACCOUNT_INFO,
    payload: accountUser,


})