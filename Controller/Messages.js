const User = require('../Models/UserDetails')
const Messages = require('../Models/Messeges')

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
exports.GettingUserMessages = async(req, res, next)=>{
    try{
        //const username = req.user.Name
        
        const data = await Messages.findAll({
            include: [
                {
                    model: User,
                    as: "userDetail"
                }
            ]
        });
        res.status(201).json(data)
        
    }catch(err){
        console.log(err)
        res.status(500).json({err:err})
    }
}
