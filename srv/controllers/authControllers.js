import bcrypt from "bcrypt"
import Users from '../modules/Users.js'

export const login_post = async function (req,res){
    let user = await Users.find({name:req.body.userName})
    
    if(user[0] != undefined){
        
        try {
            if(await bcrypt.compare(req.body.pass, user[0].pass)){
                console.log("correct pass")
                res.json(user) 
            }
            else{
                console.log("incorrect pass")
                res.json(null)
            }       
        } catch (error) {
            console.log(error.message)
        }
    }
    else{
        res.json(null)
    }
}

export default login_post

////////stuck on import export 
