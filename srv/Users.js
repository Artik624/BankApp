import mongoose from "mongoose";

/* export const transaction = new mongoose.Schema({
    date:{type:Date, default:Date.now},
    amount:{type:Number, default:0},
    currentBalance:{type:Number, default:0}
}); */

const trans = new mongoose.Schema({

    test:{
        type:String,
        default:'default'
    }
})

const transactions = new mongoose.Schema({
    transaction:{
        type:trans,
        default: () =>({})
    }
})

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
        validate:[(val) => { }, 'custom validate']
    },
    balance:{
        type:Number,
        default:getRndBalance()

    },
    transactions:[
        {
            time:
            {
            type:Date,
            default:Date.now 
            },
            amount:
            {
                type:Number,
                default:0
            },
            currentBalance:
            {
                type:Number,
                default:0
            }
        },
    ],
    

}, 
    {collection: 'Users'})

function getRndBalance(){
    return  Math.floor(Math.random() * (1000 - 10 + 1) ) + 10;
}
export let userDoc = mongoose.model('Users', userSchema)
//export default mongoose.model('Users', userSchema)
export default userDoc