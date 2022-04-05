import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name:String,
    pass:String
    }, 
    {collection: 'Users'})



export default mongoose.model('Users', userSchema)