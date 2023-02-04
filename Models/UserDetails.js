const Sequelize = require('sequelize');
const sequelize = require('../util/Database')

const User = sequelize.define('userDetails',{
    id:{
        type:Sequelize.INTEGER,
        unique:true,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    Name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    Email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    Phone_Number:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    Password:{
        type:Sequelize.STRING,
        allowNull:false
    }

})

module.exports = User;