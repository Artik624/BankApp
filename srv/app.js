import express from 'express'
import path from 'path'
import {mongoose} from 'mongoose'
import dotenv from 'dotenv'
import Users from './Users.js'

import postsRoute from './routes/posts.js'
import getsRoute from './routes/gets.js'

dotenv.config()

mongoose.connect(process.env.DB_CONNECTION,  {useNewUrlParser: true}, () => {
    console.log("mongoose connected")
})


const app = express()
const port = process.env.PORT 
const __dirname = path.resolve()
const pagePath = path.join(`${__dirname}`,'./','pages')

app.use(express.json())
app.use('/posts', postsRoute)
app.use('/gets', getsRoute)

app.get('/', (req,res) => { //root directory
    res
    .status(200)
    .sendFile(`${pagePath}/index.html`)
})



function func(user){
    app.get('/getUserInfo', async (req,res)=>{
        res.send(user)
    }) 
}

// app.post('/login', async (req,res)=>{
    
//     const userName = {name:req.body.userName}
//     try {
//         console.log("test1")
//         res.send(await Users.find({name:req.body.userName, pass:req.body.pass})) 
//         //console.log(userName)
//         func(userName)
            
//     } catch (error) {
//         console.log(error.message)
//     }
// })


// app.get('/account', (req,res) => {
//     res.sendFile(`${pagePath}/accountPage.html`)
// })

// app.post('/newUser', async (req,res) =>{
//     try {
//         const user = await Users.create({name:req.body.userName, pass:req.body.pass})
//         console.log(user)
//     } catch (error) {
//         console.log(error)
//     }
// })

app.listen(port, () => console.log("listening on port " + port))
