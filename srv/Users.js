import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please enter a username"],
        unique: true,
        lowercase: true
    },
    
    pass:{
        type: String,
        required:[true, "Please enter a password"],
        validate:[(val) => { }, 'custome validate']
    },
    }, 
    {collection: 'Users'})



export default mongoose.model('Users', userSchema)