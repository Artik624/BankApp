import express from "express";
import Users from '../modules/Users.js'
import login_post from '../controllers/authControllers.js'
import bcrypt from "bcrypt"
const router = express.Router()

router.use(express.json())

router.post('/login', login_post)


router.post('/newUser', async (req,res) =>{
    try {
        const hashedPass = await bcrypt.hashSync(req.body.pass, 10)
        const user = await Users.create({name:req.body.userName, pass:hashedPass})
    } catch (error) {
        console.log(error)
    }
})

export default router