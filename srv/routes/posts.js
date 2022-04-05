import express from "express";
import Users from '../Users.js'
import bcrypt from "bcrypt"
const router = express.Router()

//router.get()
router.use(express.json())

router.post('/login', async (req,res)=>{
    const user = await Users.find({name:req.body.userName})
    try {
        console.log(user[0])
        console.log(typeof(user))
        console.log(user[0].name)
        console.log(user[0].pass)
        if(await bcrypt.compare(req.body.pass, user[0].pass)){
            console.log("correct pass")
            //res.send(await Users.find({name:req.body.userName, pass:req.body.pass})) 
            res.json(user) 
        }
        else{
            console.log("incorrect pass")
            res.json(null)
        }
        
        //console.log(userName)
        //func(userName)
            
    } catch (error) {
        console.log(error.message)
    }
})

router.post('/newUser', async (req,res) =>{
    try {
        const hashedPass = await bcrypt.hashSync(req.body.pass, 10)
        const user = await Users.create({name:req.body.userName, pass:hashedPass})
        console.log(user)
    } catch (error) {
        console.log(error)
    }
})

export default router