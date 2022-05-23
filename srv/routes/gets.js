import express from "express";
import path from 'path'
import jwt from 'jsonwebtoken'
//import  authenticateToken  from "../controllers/authControllers.js";
const router = express.Router()

const __dirname = path.resolve()
const pagePath = path.join(`${__dirname}`,'./','pages')



router.use(express.static('pages'))

router.get('/regPage',(req,res) =>{
    res
    .status(200)
    .sendFile(`${pagePath}/regPage.html`)

})

// router.get('/account', authenticateToken, (req,res) => {
//     res.sendFile(`${pagePath}/accountPage.html`)
// })

// async function authenticateToken(req, res, next){
//     console.log(req.method, req.path)
//     const authHeader =  await req.headers['authorization']
//     console.log('auth header ' + authHeader)
//     const token = authHeader && authHeader.split(' ')[1]
//     console.log('token ' + token)
//     if(token == null) return res.sendStatus(401)

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user) =>{
//         if(err) return res.sendStatus(403)
//         //req.user = user
//         next()
//     })
// }


export default router