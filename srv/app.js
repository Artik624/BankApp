import express from 'express'
import path from 'path'
import { findUser } from './mongoDb.js'
const app = express()
const port = process.env.PORT || 5001
const __dirname = path.resolve()
const pagePath = path.join(`${__dirname}`,'./','pages')

console.log(pagePath)



app.use(express.json())
app.get('/', (req,res) => {
    res
    .status(200)
    .sendFile(`${pagePath}/index.html`)
})

app.get('/regPage',(req,res) =>{
    res
    .status(200)
    .sendFile(`${pagePath}/regPage.html`)

})

app.post('/user', async (req,res)=>{

    res.send(await findUser(req.body.userName, req.body.pass))
})

app.get('/account', (req,res) => {
    res.sendFile(`${pagePath}//accountPage.html`)
})

app.listen(port, () => console.log("listening on port " + port))
