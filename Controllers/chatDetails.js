const {Op} =require('sequelize');
const User=require('../Models/User');
const Chat=require('../Models/Chatting');

exports.getAllusers=async(req,res)=>{
    try{
    const user =await User.findAll({where:{id:{[Op.ne]: +req.user.id}},
        attributes:['id','name']
    })
    res.status(200).json({user,success:true})
}catch(err){
    res.status(500).json({message:err,success:false})
}
}
exports.postChatMessage=async(req,res)=>{
    try{
        console.log(req.body)
        const chat= req.body.chat;
        const id=req.body.toUser;
        if(!chat){
            return res.status(400).json({message:'please enter the message'})
        }
        await req.user.createChat({chatMessage:chat,toUser:id}).then(()=>{
            console.log(req.user.name)
            res.status(200).json({UserName:req.user.name,message:'message sent successfully'})

        })
    }catch(err){
        res.status(500).json({message:'internal server error',success:false})
    }   
    
}
exports.getAllChats=async(req,res)=>{
    try{
    const chatpersonId = +req.params.chatpersonId;
    console.log('asadsfgdsasfaf',chatpersonId)
    if(chatpersonId ==0){
        return res.status(200).json({message:'successful'})
    }
    console.log(chatpersonId)
    const chatTwoWay=await Chat.findAll({
        limit:5,
        order:[["updatedAt","DESC"]],
        where:{
            [Op.or]:[
                {toUser:chatpersonId,userId:+req.user.id},
                {toUser:+req.user.id,userId:chatpersonId}
            ]
        },
        attributes:['chatMessage'],
        include:{
            model:User,
            where:{
                [Op.or]:[{id:+req.user.id},{id:chatpersonId}]
            },
            attributes:['name']
        }

    })
        res.status(200).json({chats:chatTwoWay.reverse(),success:true})
}catch(err){
    res.status(500).json({message:'internal server error',success:false})
}
}
    function uploadToS3(data, filename){

        let s3bucket = new AWS.S3({
            accessKeyId: process.env.IAM_KEY,
            secretAccessKey: process.env.IAM_SECRET_KEY
        })
            var params = {
            Bucket: process.env.S3_BUCKET_NAME ,
            Key: filename,
            Body: data,
            ACL: 'public-read'
        } 
        return new Promise((resolve, reject)=>{
          s3bucket.upload(params, (err,s3response)=>{
            if(err){
                console.log('Something went wrong',err);
                reject(err)
            }
            else{
                console.log('success', s3response)
                resolve(s3response.Location)
                 
            }
        });
        })    
       
    }


exports.saveFile = async (req, res) => {
        try{
            console.log(req.body);
            const file = req.body.file[0];
            const fileName = `file${req.user.id}${new Date()}`;
            const fileURL = await uploadToS3(file, fileName);
            console.log(fileURL);
            res.status(200).send(fileURL);
    
            await req.user.createMessage({
                name: req.user.name,
                message: fileURL,
                chatGroupId: req.body.groupId
            });
        }
        catch(err){
            console.log(err);
            res.status(500).json(null);
        }
    }