import React,{ useState , useEffect } from 'react'
import { connect } from 'react-redux';
import { toast } from 'react-toastify'

import { withdrawalAmount , userInfo} from '../redux/actions/accountActionCreator'

const Withdrawal = ({dispatchWithdrawalAction , dispatchUserAction , accountUser}) => {

    useEffect(() => {dispatchUserAction() } , [dispatchUserAction] )
 

    const user = JSON.parse(localStorage.getItem('USER_INFO'))
    const userid = user.userId
    const username = user.userName

    const userInfo = {accountUser}
    const balance = userInfo.accountUser.total_amount
    console.log(accountUser)
  


    const [withdraw_amount, setWithdrawal] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();

        dispatchWithdrawalAction(userid,withdraw_amount, 
        () => toast.success("Withdrawal",dispatchUserAction()),
        (message) => toast.error(`Error: ${message}`))
    }
    

    return (
        <>
            <div className="row justify-content-between">
                <div className="col-md-5">
                    <form onSubmit={handleSubmit}>
                    <div className="form-group">
                                <label htmlFor="username">Withdrawal Amount</label>
                                <input noValidate id="withdraw_amount"
                                    type="text"
                                    placeholder="withdraw_amount"
                                    value={withdraw_amount}
                                    onChange={(e) => setWithdrawal(e.target.value)}
                                    className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary mr-2">
                                Withdrawal | <i className="fas fa-sign-in-alt"></i>
                    </button>
                    </form>
                </div>

                <div className="col-md-5">
                <h4 id="userName" className = "text-capitalize" >Account Holder Name : {username} </h4>
                <h4 id="balance" className = "text-capitalize" >Balance : {balance} </h4>

            </div>

            </div>
        </>
    )
}

const mapStateToProps = state => ({
    loading: state.loading,
    accountUser: state.accountUser,
  
})

const mapDipatchToProps = dispatch => ({

    dispatchWithdrawalAction: (userid, withdraw_amount,onSuccess , onError) =>
    dispatch(withdrawalAmount({userid, withdraw_amount }, onSuccess, onError),
    dispatch(userInfo())
    ),

    dispatchUserAction: ()=>
    dispatch(userInfo())
})
export default connect(mapStateToProps , mapDipatchToProps)(Withdrawal);
// export default Deposite