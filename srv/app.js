import express from 'express'
import path from 'path'
import {mongoose} from 'mongoose'
import dotenv from 'dotenv'
import Users from './Users.js'
import postsRoute from './routes/posts.js'
import getsRoute from './routes/gets.js'
import jwt from 'jsonwebtoken'
import serveFavicon from 'serve-favicon'
import {expressCspHeader, INLINE, NONE, SELF} from 'express-csp-header'
import cookieParser from 'cookie-parser'




dotenv.config()

mongoose.connect(process.env.DB_CONNECTION,  {useNewUrlParser: true}, () => {
    console.log("mongoose connected")
})


const app = express()
const port = process.env.PORT 
const __dirname = path.resolve()
const publicPath = path.join(`${__dirname}`,'./','public')
const favicon = path.join(`${__dirname}`,'./','favicon.ico')
const a =  path.join(`${__dirname}`,'/','index.html')



app.use(express.static('public'));
//app.use(express.static('modules'));
app.use(serveFavicon(favicon))
app.use(express.json());
app.use('/posts', postsRoute);
app.use('/gets', getsRoute)
app.use(cookieParser())
app.use(expressCspHeader({
    useDefaults:true,
    directives: {
        'default-src': [SELF],
        'script-src': [SELF, INLINE],
        'style-src': [SELF, INLINE],
        'img-src': [ SELF]
    },
    //reportOnly:true
    
}));



app.get('/', (req,res) => { //root directory
    res
    .sendFile(`${publicPath}/index.html`)
})



app.listen(port, () => console.log("listening on port " + port))
