const express = require('express');
const path = require('path')
require('dotenv').config;
const cors = require('cors');

const User = require('./Models/UserDetails');
const sequelize = require('./util/Database')

const userRoutes = require('./Routes/UserDetailsRoutes');
const { Server } = require('http');

const app = express()

app.use(express.json());
app.use(cors());

app.use(userRoutes);

app.use((req,res)=>{
    res.sendFile(path.join(__dirname, `/views/${req.url}`))
})

sequelize.sync({force:false}).then(result=>{
    console.log("Server Started")
    app.listen(3000);

}).catch(err=>{
    console.log(err)
})