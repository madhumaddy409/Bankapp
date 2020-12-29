import React from 'react';
import { Link } from 'react-router-dom'

const Header = ({userName, isLoggedIn , onLogout ,userid}) => {


return(
    <nav className = "navbar navbar-dark bg-dark">
        <div className="container">
            <Link className="navbar-brand" to="/">
                <div className="d-flex align-items-center">
                    <i className="fas fa-book fa-2x"></i>
                    <span className="h4 pl-2">
                        Bank Application 
                    </span>
                </div>
                
            </Link>
            { isLoggedIn &&

            
            <>
             
                <div className="btn-group">
                    <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Deposite/Withdrawal <span class="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                        <li><a href="/deposite">Deposite</a></li>
                        <li><a href="/withdrawal">Withdrawal</a></li>
                        
                        <Link to={`/transaction/${userid}`}>
                                       Transaction Details
                                    </Link>
                        <hr></hr>
                        <li><a href="/">Home</a></li>
                    </ul>
                </div>

                
            </>


                
            }


            { isLoggedIn &&
            <h4 className="ml-auto mr-4">
                <span className="badge badge-pill badge-secondary text-capitalize">
                    welcome { userName} !
                </span>
              
            </h4>
            }
          
             { isLoggedIn &&
            <button type="button" onClick={onLogout} className="btn btn-outline-warning">
                Logout | <i className="fas fa-sign-out-alt"></i>
            </button>

            }
        </div>

    </nav>
)};

export default Header;