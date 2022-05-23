import bcrypt from "bcrypt"
import Users from '../modules/Users.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

export default async function login_post (req,res){
    
    let user = await Users.find({name:req.body.userName})
    //console.log(user)
    if(user[0] != undefined){
        try {
            if(await bcrypt.compare(req.body.pass, user[0].pass)){
                //console.log("correct pass")
                //console.log(user[0].name)
                const accessToken = jwt.sign(user[0].name, process.env.ACCESS_TOKEN_SECRET)
                //console.log(accessToken)
                const token = {
                    accessToken : accessToken
                }
                //console.log(token)
                res.json(token) 
                //res.json(user) 
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
        res.json(null)
    }
}

// export function authenticateToken(req, res, next){
//     console.log('here authtoken')
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]
//     if(token == null) return res.sendStatus(401)

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user) =>{
//         if(err) return res.sendStatus(403)
//         req.user = user
//         next()
//     })
// }

//export default (login_post)


