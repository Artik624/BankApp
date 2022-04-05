import express from "express";
import Users from '../Users.js'
const router = express.Router()

//router.get()


router.post('/login', async (req,res)=>{
    const userName = {name:req.body.userName}
    try {
        res.send(await Users.find({name:req.body.userName, pass:req.body.pass})) 
        //console.log(userName)
        func(userName)
            
    } catch (error) {
        console.log(error.message)
    }
})

router.post('/newUser', async (req,res) =>{
    try {
        const user = await Users.create({name:req.body.userName, pass:req.body.pass})
        console.log(user)
    } catch (error) {
        console.log(error)
    }
})

export default router