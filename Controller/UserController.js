const User = require('../Models/UserDetails');
const bcrypt = require('bcrypt');
const { response } = require('express');
const jwt=require('jsonwebtoken')

exports.registerUser = async(req,res,next)=>{
    try{
        const {Name,Email,Phone_Number,Password} =req.body
        if (Name == undefined || Name.length === 0 || Email.length === 0 || Email == null || Phone_Number.length === 0 ||Phone_Number.length === 0 ||Password.length === 0 || Password ==null){
            return res.status(400).json({err: 'Bad Parameters . Something is missing.'})
        }
        const userdata = await User.findAll({where:{Email}})
        if(userdata.length>0){
            return res.status(401).json({message: "Email Id already Exists!"})
        }
        else{
            saltRound = 10;
            bcrypt.hash(Password, saltRound, async(err,hash)=>{
                await User.create({Name,Email,Phone_Number, Password:hash})
                return res.status(201).json({message : "Registration for new user is successfull!"})
            })
        }
    }catch(err){
        console.log(err)
        res.status(500).json({err:err})
    }
}

function generateAccessToken(id,Name,Email,Phone_Number,Password){
    return jwt.sign({userId:id, Name:Name,Email:Email,Phone_Number:Phone_Number, Password:Password},'ViratKohli')

}

exports.LoginUser = async(req,res,next)=>{
    try{
        const {Email, Password} =req.body;
        const LoginData = await User.findAll({where:{Email}});
        if(LoginData.length>0){
            bcrypt.compare(Password, LoginData[0].Password, (err, result)=>{
                if(err){
                    throw new Error("Something went wrong!")
                }
                else if(result === true){
                    res.status(201).json({message:'Login Successfull !', token : generateAccessToken(LoginData[0].id,LoginData[0].Name,
                        LoginData[0].Email,LoginData[0].Phone_Number, LoginData[0].Password)})
                }
                else{
                    return res.status(400).json({message :'Wrong Password' })
                }

            })
        } else {
            return res.status(207).json({message: "User not found"})
        }
    }catch(err){
        res.status(500).json({err:err})
    }

}