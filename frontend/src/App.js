import React from 'react';

import { Switch , Redirect , Router, Route } from 'react-router-dom';
import Header from './components/header.component';
import { connect } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, Slide } from 'react-toastify'

import socketClient from "socket.io-client";


import AuthPage  from './pages/authpage.component'
import EditPage from './pages/editpage.component'
import Notepage from './pages/notepage.component'
import Depositepage from './pages/deposite.component'
import Withdrawalpage from './pages/withdrawal.component'
import AdminUser from './pages/adminUser.component'
import TransacionPage from './pages/transaction.component'


import Spinner from './components/spinner/spinner.component'
import { logoutUser } from './redux/actions/authActionCreators'
const SERVER = "http://127.0.0.1:8000";



const App = ({ user , dispatchLogoutAction }) =>{

  var socket = socketClient (SERVER, {transports: ['websocket', 'polling', 'flashsocket']});
 

  return (
    <>
    <ToastContainer position="top-right" autoClose={2000}
    hideProgressBar transition={Slide} />
    <Spinner />
      <Header isLoggedIn={user.isLoggedIn} userName = {user.userName} userid={user.userId}
      
      onLogout={dispatchLogoutAction}/>
      <div className="container my-5">



      {(() => {

                if (user.isLoggedIn && user.userType === 'user') {


                  //websocket

                  socket.on('connection', () => {
                    console.log(`I'm connected with the back-end`);
                
                  });
                  socket.on('message',message => {
                    console.log(message)
                
                  })
                
                  const username = user.userName
                  
                  console.log(username)
                  socket.emit('joinRoom',{username})
                  

                  
                  
                  return (

                  <Switch>
                  <Route exact path='/notes' component={Notepage} ></Route>
                   <Route exact path='/deposite' component={Depositepage} ></Route>
                   <Route exact path='/withdrawal' component={Withdrawalpage} ></Route>
                   <Route exact path='/transaction/:userid' component={TransacionPage}></Route>
         
         
                   <Route exact path='/edit-note' component={EditPage} ></Route>
                   <Route exact path='/edit-note/:noteId' component={EditPage} ></Route>
                   <Redirect to='/deposite'></Redirect>
         
                 </Switch>

                  )

                } else if (user.isLoggedIn && user.userType === 'admin') {
                  
               


                  return (
                    <switch>
                       <Route exact path='/admin/user' component={AdminUser}></Route>
                        <Route exact path='/transaction/:userid' component={TransacionPage}></Route>
                        <Redirect to='/admin/user'></Redirect>

                    </switch>
                  )

                } else {

                  return (
                    <Switch>
                        <Route exact path='/auth' component={AuthPage} ></Route>
                        <Redirect to='/auth'></Redirect>


                    </Switch>

                

                  )

                }

                })()}

      </div>
      </>
  );
};

const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => ({
  dispatchLogoutAction: () => dispatch(logoutUser())
})

export default connect(mapStateToProps , mapDispatchToProps)(App);