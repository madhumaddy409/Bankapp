const express =  require("express")

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

//websockets
const http = require('http')
const socketio = require('socket.io')




const app = express();

//websockets

const server = http.createServer(app)
const io = socketio(server)


const users = []

//join user to chat
function userJoin(id, username) {
    const user = {id , username};

    users.push(user)

    return user
}

//user leaves chat
function userLeave(id){
  const index = users.findIndex(user => user.id === id)

  if(index!== -1)
  {
      return users.splice(index, 1)[0]
  }
}



//Run with client connection
io.on('connection', socket => {
 
  console.log("ws connected...")

   //joing
  socket.on('joinRoom', ({username}) => {
    const user = userJoin(socket.id, username)
    console.log(user)

      //joing to chat
  socket.broadcast.emit('message',`${user.username} has joinned the chat`)

  socket.broadcast.emit('users',users)

  // disconnect to chat
  socket.on('disconnect', ()=> {
    const user = userLeave(socket.id)
    if(user){
      io.emit('message',`${user.username} user as left the chat`)
      socket.broadcast.emit('users',users)
    }

  })
 


  })
  
  socket.emit('connection', null);


  //welcome to chat
  socket.emit('message','wellcome to chat')

 



 
})

const PORTWS = 8000 || process.env.PORTWS;

server.listen(PORTWS, ()=>{
    console.log(`server is running on ${PORTWS}`)
});

const userRoutes = require("./routes/user")
const accountRoutes = require("./routes/account")
const transRoutes = require("./routes/transaction")

//MiddleWares
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

//Routes
app.use("/api",userRoutes)
app.use("/api",accountRoutes)
app.use("/api",transRoutes)




const port = Number(process.env.PORT || 5000);




app.listen(port, () => {
    return console.log("Server is up and running on 5000");
  });
