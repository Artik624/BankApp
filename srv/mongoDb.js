// import { MongoClient } from 'mongodb'

// function connectToDB(){
//     const uri = "mongodb+srv://arti:admin1234@bankappcluster.lgthl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
//     const client = new MongoClient(uri)
//     //console.log(client)
//     return client
// }
var mongoUtil = require('mongoUtil');   
 mongoUtil.connectToServer((err, client)=>{
     if(err) console.log(err)
  
     var db = mongoUtil.getDb()
     
    
 })
export async function findUser(userName, pass){
    const searchCursor = mongoUtil.db.collection('Users').find({"name":userName, "pass" : pass })
    const result =  await searchCursor.toArray()
    return result
}

// export async function findUser(userName, pass){
//     const client =  connectToDB()
//     await client.connect()
//     try{
//         const db = client.db("BankApp")
//         console.log(`connected to database ${db.databaseName}`)
//         const users = db.collection("Users")
//         console.log(`connected to collection ${users.collectionName}`)
        
//         const searchCursor =  users.find({"name":userName, "pass" : pass })  // find document 
//         const result =  await searchCursor.toArray()
//         return result
//     }
//     catch (error){
//         console.log(`an error has occcured!@$$@$!$@$@$ ${error}`)
//     }
//     finally{
//         await client.close()
//     }
// }

// export async function addUser(userName, pass ) {
//     const client =  connectToDB()
//     await client.connect()
//     try {
//         const db = client.db("BankApp")
//         console.log(`connected to database ${db.databaseName}`)
//         const users = db.collection("Users")
//         console.log(`connected to collection ${users.collectionName}`)

//         await users.insertOne({"name":userName, "pass":pass})
//         console.log("user added")
//         // if(findUser(userName, pass) == undefined){
            
//         // }else{
//         //     console.log("user taken")
//         // }

        
//     } catch (error) {
//         console.log(`an error has occcured!@$$@$!$@$@$ ${error}`)
//     }
//     finally{
//         //await client.close()
//     }
// }
