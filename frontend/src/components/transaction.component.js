import React,{ useState ,useEffect} from 'react'
import {
    useParams
  } from "react-router-dom"; 

import { connect } from 'react-redux';
import { toast } from 'react-toastify'


import { transaction } from '../redux/actions/transactionActionCreator'


const Transaction = ({  dispatchTransactionAction , transaction}) => {
    const { userid } = useParams(); 

    useEffect(() => {
        
        dispatchTransactionAction(userid) } , [dispatchTransactionAction] )
    
        console.log(transaction)


    return (
        <>
           <div className="row justify-content-between">
                <div className="col-md-5">
                    <h1>deposited transaction</h1><br />
                
                {
    
                       Object.entries(transaction).map(([key, user], i) => (
                        user.deposited_amount && 
                            <p key={user.id}>
                                <h6 key={user.id}>The account Number is {user.userid} has been deposited with the amount {user.deposited_amount} AND the Balance is . {user.total_amount + user.deposited_amount}</h6>
                              
                            </p>
                        ))
    
                }
        
                
            </div>

            <div className="col-md-5">
            <h1>withdrawal transaction</h1><br />
                {
                    Object.entries(transaction).map(([key, user], i) => (
                        user.withdraw_amount && 
                            <p>
                                <h6>The account Number is {user.userid} has been withdrawal with the amount {user.withdraw_amount} AND the Balance is . {user.total_amount - user.withdraw_amount}</h6>
                               
                            </p>
                    ))
                }          

            </div>
        </div>
        </>
    )


}


const mapStateToProps = state => ({
    loading: state.loading,
    transaction : state.transaction,
  
})

const mapDipatchToProps = dispatch => ({

    dispatchTransactionAction: (userid ,onSuccess , onError) =>
    dispatch(transaction(userid, onSuccess, onError),
  
    )
  
})

export default connect( mapStateToProps , mapDipatchToProps )(Transaction);