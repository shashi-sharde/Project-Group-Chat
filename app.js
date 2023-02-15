const path = require('path')
const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
require('dotenv').config()

const sequelize = require('./util/database')


const userRoute = require('./Routes/userRoute')
const chatRouter = require('./Routes/chatRoute')
const GroupRoute = require('./Routes/groupRoutes')



const Users = require('./Models/User')
const Chat = require('./Models/Chatting')
const Groups = require('./Models/groups')
const UserGroup = require('./Models/userGroup')
const groupChat = require('./Models/groupChat')




const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())


app.use(userRoute)
app.use(chatRouter)
app.use(GroupRoute)



app.use((req,res)=>{
    res.sendFile(path.join(__dirname, `/Views/${req.url}`))
})


Users.hasMany(Chat);
Chat.belongsTo(Users);
Users.hasMany(groupChat);
groupChat.belongsTo(Users)
Users.belongsToMany(Groups , {through: UserGroup} )
Groups.belongsToMany(Users , {through: UserGroup} )



sequelize.sync({force: false}).then(result =>{
    console.log('Server started at 3000');
    app.listen(process.env.PORT || 3000); 
}).catch(err=>{
    console.log(err);
}); 