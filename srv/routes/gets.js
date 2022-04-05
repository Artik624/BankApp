import express from "express";
import path from 'path'
//import Users from '../Users.js'
const router = express.Router()

const __dirname = path.resolve()
const pagePath = path.join(`${__dirname}`,'./','pages')


router.get('/regPage',(req,res) =>{
    res
    .status(200)
    .sendFile(`${pagePath}/regPage.html`)

})

router.get('/account', (req,res) => {
    res.sendFile(`${pagePath}/accountPage.html`)
})

export default router