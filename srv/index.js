// import express from 'express'
// import fs from 'fs'
// import path from 'path'
// import { findUser, addUser } from './mongoDb.js'
// const __dirname = path.resolve()
// const appDir = path.resolve(__dirname, '..')

// export const app = express()
// app.use(express.json())
// const PORT = process.env.PORT || 5000

// app.listen(PORT, () => {
//     console.log(`server started on port ${PORT}`)
// })
// app.get('/', (req, res)=>{
//     res.sendFile(`${appDir}/index.html`)
// })

// app.get('/account', (req, res)=>{
//     res.sendFile(`${appDir}/accountPage.html`)
// })

// app.get('/register', (req, res) =>{
//     res.sendFile(`${appDir}/regPage.html`)
// })



// app.post('/user',async  (req, res)  =>  {
//     res.send(await findUser(req.body.userName, req.body.pass)) 
// })

// app.post('/newUser', async (req,res) =>{
//     addUser(req.body.name, req.body.pass)
// })




