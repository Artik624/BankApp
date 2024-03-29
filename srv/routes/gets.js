import express from "express";
import path from 'path'
import jwt from 'jsonwebtoken'
import Users from '../Users.js'
//import  authenticateToken  from "../controllers/authControllers.js";

const router = express.Router()

const __dirname = path.resolve()
const publicPath = path.join(`${__dirname}`,'./','public')



router.use(express.static('pages'))

router.get('/regPage',(req,res) =>{
    res
    .sendFile(`${publicPath}/regPage.html`)

})

router.get('/transaction',(req,res)=>{

})

router.get('/getUserObj:uid', async (req,res) =>{
    
    const uid = req.params.uid.split(':')[1]
    const userObj = await Users.find({_id:uid})
    res.json(userObj).status(200)
})


router.get('/account:uid', authenticateToken, (req,res) => {
    
    res
    .sendFile(`${publicPath}/accountPage.html`)
})

async function authenticateToken(req, res, next){
    var cookie = req.headers.cookie
    if(cookie === undefined){
        res.sendStatus(403)
    }
    else{
        var jwtToken = req.headers.cookie.split('; ').find(row => row.startsWith('token')).split('=')[1]
        //console.log(jwtToken)
    }

    jwt.verify(jwtToken, process.env.access_token_secret, (err,user) =>{
        if(err) return res.sendStatus(403)
        next()
    })
    
}

export default router