import { MongoClient } from 'mongodb'
const uri = "mongodb+srv://arti:admin1234@bankappcluster.lgthl.mongodb.net/BankApp?retryWrites=true&w=majority"

var _db 

module.exports = {
    connectToServer : (callback)=>{
        MongoClient.connect(uri, {userNewUrlParser: true},(err, client)=>{
            _db = client.db('BankApp')
            return callback(err)
        })
    },
    getDb: ()=>{
        return _db
    }
}