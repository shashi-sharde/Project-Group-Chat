const Sequelize = require('sequelize')
const sequelize = require('../util/Database') 
const User = require('../Models/UserDetails')

const Messages = sequelize.define('messages',{
    id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
    },
    message:{
        type:Sequelize.STRING,    
    },
    Name:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

module.exports = Messages;