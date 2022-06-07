import mongoose from "mongoose";

var transaction = new mongoose.Schema({
    date:{type:Date, default:Date.now},
    amount:{type:Number, default:0},
    currentBalance:{type:Number, default:0}
});

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
    transactions:[transaction],
    

}, 
    {collection: 'Users'})



export default mongoose.model('Users', userSchema)