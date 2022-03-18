import express from 'express'
import fs from 'fs'
import path from 'path'
import { findUser } from './mongoDb.js'
const __dirname = path.resolve()

// export const app = express()
// app.use(express.json())
// const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})
app.get('/', (req, res)=>{
    res.sendFile(`${__dirname}/index.html`)
})

app.get('/account', (req, res)=>{
    res.sendFile(`${__dirname}/accountPage.html`)
})



app.post('/user',async  (req, res)  =>  {
    console.log("got a request")
    res.send(await findUser(req.body.userName, req.body.pass)) 
})




