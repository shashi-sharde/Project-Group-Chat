const Sequelize = require('sequelize');

const sequelize = require('../util/database');
const OLD_Groupmessage=sequelize.define('oldgroupchat',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    groupMessage:{
        type:Sequelize.STRING,
        allowNull:false
    },
    groupId:{
        type:Sequelize.INTEGER,
        allowNull:false

    },
    userName:{
        type:Sequelize.STRING,
        allowNull:false
    }
});
module.exports=OLD_Groupmessage;