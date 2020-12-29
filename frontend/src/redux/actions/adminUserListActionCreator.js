import * as constants from '../reducers/constants'

export const adminUsersList = (data, onSuccess, onError ) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: '/api/transactions/users',
        data,
        success: (userlist) => (setUserList(userlist)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
})


const setUserList = (userlist) =>({
    // console.log(data)
    type: constants.USER_LIST,
    payload: userlist
})
