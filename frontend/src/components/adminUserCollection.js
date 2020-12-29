import React,{ useEffect } from 'react'
import socketClient from "socket.io-client";

import  { adminUsersList } from '../redux/actions/adminUserListActionCreator';


import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const SERVER = "http://127.0.0.1:8000";




const AdminUserList = ({dispatchUserListAction ,adminUserList } ) => {
    var result = []
    var useronline = []


    var socket = socketClient (SERVER, {transports: ['websocket', 'polling', 'flashsocket']});


    useEffect(async() => { dispatchUserListAction() } , [dispatchUserListAction] )
    console.log(adminUserList)



    socket.on('connection', () => {
        console.log(`I'm connected with the back-end`);
    
      });

      socket.on('message',message => {
        console.log(message)
    
      })
    
    //   const username = user.userName
      const username = "testadmin"
      socket.emit('joinRoom',{username})

    
      socket.on('users',(users) => {
        // console.log(users);
            
            
            result = users.filter(obj => {
            return obj.username !== 'testadmin'
            

    
          })
       
           console.log(result)

        

        //    outputUsers(result)
        const userList = document.getElementById('user-online');
        userList.innerHTML = `${result.map(user => `
        
        <li class="media">
            <div class="mr-2">
                <img alt="User avatar" src="https://freesvg.org/img/1389952697.png" srcset="https://secure.gravatar.com/avatar/8c051fd54e4c811e02bbc78d50549280?s=60&amp;d=mm&amp;r=g 2x" class="avatar avatar-30 photo" height="30" width="30" loading="lazy"></img>
            </div>                
            <div class="media-body">
                <h5 class="mt-0 mb-2 font-weight-bold">
                    <a href="/user/ascensus">${user.username}</a>
                </h5>
        
            </div>
        </li>
        <hr></hr>
        
        
        
        
        `).join('')}`
        

          
        
      })

 

    return (
        <>
            <table className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col"> userId</th>
                        <th scope="col">userName</th>
                        <th scope="col"> Transaction Details </th>
                        <th scope="coll">Total Balance</th>
                    </tr>
                    
                </thead>
                <tbody>
                    {
                       
                       
                           Object.entries(adminUserList).map(([key, user], i) => (
                                <tr key = {user.id}>
                                     <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td><Link to={`/transaction/${user.id}`}>
                                       Transaction Details
                                    </Link></td>
                                    <td>{user.total_amount}</td>
                                    <td id ="total-balance"></td>
                       
                                </tr>
                                    ))

                    }
               
                </tbody>
            </table>
            <div className="container">
         
            
            {/* <span className="badge badge-success"><h4>Online Users</h4></span> */}
            {/* <span class="badge badge-success pl-2"><i class="fas fa-users fa-2x mr-" aria-hidden="true"></i><h4>Online Users</h4></span> */}

            


            {/* <h5 id="user-online"></h5> */}
     
            </div>

            <div class="card users-listing-small mb-4">
                <div class="card-header text-center py-3">
                <i class="fas fa-users fa-2x mr-" aria-hidden="true">
                </i>
                <h4>Online Users</h4>
                </div>

                <div class="card-body">
                    <ul class="list-unstyled">
                        <div id="user-online"> 

                        </div>
                    </ul>
                </div>
             </div>
             
   


        </>
    )
}

const mapStateToProps = state => ({
    loading: state.loading,
    adminUserList: state.adminUserList,

  
})

const mapDipatchToProps = dispatch => ({
    dispatchUserListAction: ()=>
    dispatch(adminUsersList()),
    
    
 
})


export default connect( mapStateToProps , mapDipatchToProps )(AdminUserList)