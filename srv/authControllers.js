import bcrypt from "bcrypt"
import Users from './Users.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

export  async function login_post (req,res){
    let user = await Users.find({name:req.body.userName})
  
    if(user[0] != undefined){
        try {
            if(await bcrypt.compare(req.body.pass, user[0].pass)){
                console.log("password match")
                const accessToken = jwt.sign(user[0].name, process.env.ACCESS_TOKEN_SECRET)
                
                const token = {
                    accessToken : accessToken,
                    uId : user[0].id
                }
                
                res
                .cookie('token', accessToken  /*{maxAge: 100000}*/ )
                .cookie('uid', user[0].id /*{maxAge: 100000}*/ )
                .status(200)
                .json({cookie : 'sent'})
                
                
            }
            else{
                console.log("incorrect pass")
                res.json(null)
            }       
        } catch (error) {
            console.log(error.message)
        }
    }
    else{
        console.log("incorrect username")
        res.json(null)
    }
}

async function addTransaction(req,res){
    let amount = req.body.amount;
}

export default (login_post)


