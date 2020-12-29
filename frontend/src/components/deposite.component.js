import React,{ useState ,useEffect } from 'react'

import { connect } from 'react-redux';
import { toast } from 'react-toastify'


import { depositeAmount, userInfo } from '../redux/actions/accountActionCreator'


const Deposite = ({dispatchDepositeAction ,dispatchUserAction, accountUser}) => {

    useEffect(() => {dispatchUserAction() } , [dispatchUserAction] )
 
    const user = JSON.parse(localStorage.getItem('USER_INFO'))
    const userid = user.userId
    const username = user.userName

    const userInfo = {accountUser}
    const balance = userInfo.accountUser.total_amount
    console.log(accountUser)
 
    const [deposited_amount, setDeposite] = useState('');

    useState(username)

    const handleSubmit = (event) => {
        
        event.preventDefault();
        console.log(userid)
      
       
        dispatchDepositeAction(userid,deposited_amount,
        () => toast.success("deposited",dispatchUserAction()),
        
        (message) => toast.error(`Error: ${message}`))
        
    }
    
  

    return (
        <>
        <div className="row justify-content-between">
            <div className="col-md-5">
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                            <label htmlFor="username">Deposite Amount</label>
                            <input noValidate id="deposited_amount"
                                type="text"
                                placeholder="deposite Amount"
                                value={deposited_amount}
                                onChange={(e) => setDeposite(e.target.value)}
                                className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary mr-2">
                            Deposite | <i className="fas fa-sign-in-alt"></i>
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

    dispatchDepositeAction: (userid, deposited_amount,onSuccess , onError) =>
    dispatch(depositeAmount({userid, deposited_amount }, onSuccess, onError),
    dispatch(userInfo())
    ),

    dispatchUserAction: ()=>
    dispatch(userInfo()),
  
})

export default connect( mapStateToProps , mapDipatchToProps )(Deposite);
