const express = require('express');
const path = require('path')
require('dotenv').config;
const cors = require('cors');
const sequelize = require('./util/Database')




const userRoutes = require('./Routes/UserDetailsRoutes');
const messageRoutes = require('./Routes/MessageRoute');
const { Server } = require('http');

const User = require('./Models/UserDetails');
const Messages = require('./Models/Messeges')

const app = express()

app.use(express.json());
app.use(cors());

app.use(userRoutes);
app.use(messageRoutes)

app.use((req,res)=>{
    res.sendFile(path.join(__dirname, `/views/${req.url}`))
})



User.hasMany(Messages);
Messages.belongsTo(User);


sequelize.sync({force:false}).then(result=>{
    console.log("Server Started")
    app.listen(3000);

}).catch(err=>{
    console.log(err)
})