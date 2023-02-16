const Sequelize = require('sequelize');

const sequelize = require('../util/database');
const Old_Chat=sequelize.define('oldchat',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    chatMessage:{
        type:Sequelize.STRING,
        allowNull:false
    },
    toUser:{
        type:Sequelize.INTEGER,
        allowNull:false

    },
    date:{
        type:Sequelize.DATE
    }
});
module.exports=Old_Chat