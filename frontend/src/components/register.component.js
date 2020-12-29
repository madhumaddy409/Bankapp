import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify'

import { registerUser } from '../redux/actions/authActionCreators'

const RegisterForm = ({dispatchRegisterAction}) => {

    const [userName , setUserName ] = useState('');
    const [password , setPassword ] = useState('');
    const [account_type , setUserType ] = useState('user');
    const [error, setError] = useState({ userName: false, password: false });


    const handleCancelForm = (event) => {
        event.preventDefault();
        setUserName('');
        setPassword('');
        setError({ userName: false, password: false });
    };

    const isFormInvalid = () => (!userName ||  !password);

    const updateErrorFlags = () => {
        const errObj = { userName: false,  password: false };
        if (!userName) errObj.userName = true;
        if (!password) errObj.password = true;
        setError(errObj);
    };

    


    const handleOnSubmit = (event) => {
        event.preventDefault();
        if (isFormInvalid()) updateErrorFlags();
        else dispatchRegisterAction(userName,password,account_type,
            ()=> toast.success("Account created succesfully"),
            (message) => toast.error(`Error: ${message}`))
    }
   


    return(


        <>
            <h2>New user?</h2>
            <h4>create an account</h4>
            <br/>

            <form noValidate onSubmit={handleOnSubmit}>
                <div className="form-group">
                <label htmlFor="username">User Name</label>
                        <input noValidate id="username1"
                            type="text"
                            placeholder="username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className={`form-control ${error.userName ? 'is-invalid' : ''}`} />
                             <p className="invalid-feedback">Required</p>
                </div>
                <div className="form-group">
                <label htmlFor="password">Password</label>
                        <input noValidate id="password1"
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`form-control ${error.password ? 'is-invalid' : ''}`} />
                             <p className="invalid-feedback">Required</p>

                </div>               
                
                <button type="submit" className="btn btn-primary mr-2">
                        Register | <i className="fas fa-sign-in-alt"></i>
                </button>

                <button onClick={handleCancelForm} className="btn btn-outline-secondary">
                        Cancle | <i className="fas fa-times"></i>
                </button>
            

            </form>

        </>
    )
}

const mapDispatchToProps = dispatch => ({
    dispatchRegisterAction: (userName,password,account_type ,onSuccess, onError) =>
    dispatch(registerUser({userName,password ,account_type}, onSuccess, onError))
})
export default connect(null, mapDispatchToProps)(RegisterForm);