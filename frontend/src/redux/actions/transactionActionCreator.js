
import * as constants from '../reducers/constants'




export const transaction = (userid, onSuccess, onError ) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: `/api/transaction/${userid}`,
        success: (transaction) => (setTransaction(transaction)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
})


const setTransaction = (transaction) =>({
    type: constants.TRANSACTION_INFO,
    payload: transaction
})
