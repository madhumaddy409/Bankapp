import * as constants from '../reducers/constants'


export const registerUser =(data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: '/api/register',
        data,
        success: (response) => (setUserInfo(response)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
})


export const loginUser = (data, onSuccess, onError ) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: '/api/login',
        data,
        success: (response) => (setUserInfoo(response)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
})

export const logoutUser = () =>{
    localStorage.removeItem('USER_INFO')
    return { type: constants.RESET_USER_INFO}

}

const setUserInfo = (data) =>{
    console.log(data)
    // const parsedToken =JSON.parse(atob(data.token.split('.')[1]));
    const userInfo = {
        userId: data.userId,
        // fullName: `${parsedToken.username}`,
        // token: data.token,
        // isLoggedIn: true
    }
    localStorage.setItem('USER_INFO', JSON.stringify(userInfo));
    return { type:constants.SET_USER_INFO, payload: userInfo }
}

const setUserInfoo = (data) =>{
    console.log(data.token)

    const userDetails = JSON.parse(window.atob(data.token.split('.')[1]));

    console.log(userDetails.user )
    const userInfo = {
        userId: userDetails.user.id,
        userName: userDetails.user.userName,
        token: data.token,
        userType: userDetails.user.userType,
        isLoggedIn: true
    }
    localStorage.setItem('USER_INFO', JSON.stringify(userInfo));
    return { type:constants.SET_USER_INFO, payload: userInfo }
}