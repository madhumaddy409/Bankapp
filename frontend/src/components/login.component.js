import React,{ useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify'

import { loginUser } from '../redux/actions/authActionCreators'


const LoginForm = ({ dispatchloginAction}) => {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatchloginAction(username,password, 
        () => toast.success("loagged in successfully"),
        (message) => toast.error(`Error: ${message}`))
    }

    return(
            <>
                <h4>Have a account</h4>
                <h2>Login here,</h2>

                <br/>

                <form noValidate onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">User Name</label>
                        <input noValidate id="username"
                            type="text"
                            placeholder="username"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            className="form-control" />
                    </div>

                    <div className="form-group">
                    <label htmlFor="email">Password</label>
                        <input noValidate id="password"
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control" />
                        
                    </div>

                    <button type="submit" className="btn btn-primary mr-2">
                        Login | <i className="fas fa-sign-in-alt"></i>
                    </button>

                    <button className="btn btn-outline-secondary">
                        Cancle | <i className="fas fa-times"></i>
                    </button>

                </form>

            </>
    );
};

const mapDipatchToProps = dispatch => ({
    dispatchloginAction: (username,password, onSuccess , onError) =>
    dispatch(loginUser({username,password}, onSuccess, onError))
})
export default connect(null, mapDipatchToProps)(LoginForm);