const User = require('../Models/UserDetails')
const Messages = require('../Models/Messeges')
const { Op } = require("sequelize");

exports.SendingUserMessage = async(req,res, next)=>{

    try{
        const { message} = req.body;
        if(!message){
            throw new Error("Please type message to sent!")
        }
        const userDetailId = req.user.id
        const Name = req.user.Name
        
        const data = await Messages.create({message, userDetailId,Name})
        res.status(201).json({message:data})

    }catch(err){
        res.status(500).json({err:err})
    }
}
// exports.GettingUserMessages = async(req, res, next)=>{
//     try{
//         //const username = req.user.Name
        
//         const data = await Messages.findAll();
//         res.status(201).json(data)
        
//     }catch(err){
//         console.log(err)
//         res.status(500).json({err:err})
//     }
// }

exports.GettingUserMessages = async(req,res,next)=>{
    try{
        const lastMessage = req.params.lastMessage
        console.log("hsakjdfhgjkshdgajkfgjskghdfkjkhg", lastMessage)
        console.log(req.params.lastMessage);
        if(req.params.lastMessage == 0){
            const messages = await Messages.findAll({
                order: [[ 'createdAt', 'DESC' ]],
                limit: 2
            });
            res.status(200).json(messages);
        }
        else{
            const messages = await Messages.findAll({
                where: {
                    id: {
                        [Op.gt]: req.params.lastMessage
                    }
                }
            });
            res.status(200).json(messages);
        }
    }
    
    catch(err){
        console.error(err);

    }
}