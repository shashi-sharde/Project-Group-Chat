const User = require('../Models/UserDetails')
const Messages = require('../Models/Messeges')

exports.UserMessage = async(req,res, next)=>{

    try{
        const { message} = req.body;
        if(!message){
            throw new Error("Please type message to sent!")
        }
        const userDetailId = req.user.id
        
        const data = await Messages.create({message, userDetailId})
        res.status(201).json({newMessage:data})

    }catch(err){
        res.status(500).json({err:err})
    }
}