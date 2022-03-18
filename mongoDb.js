import { MongoClient } from 'mongodb'
//const MongoClient = reuire('mongodb')

// let user = app.get((req, res) =>{

// })




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



export async function findUser(userName, pass){
    const client =  connectToDB()
    await client.connect()
    try{
        const db = client.db("BankApp")
        console.log(`connected to database ${db.databaseName}`)
        const users = db.collection("Users")
        console.log(`connected to collection ${users.collectionName}`)
        
        const searchCursor =  users.find({"name":userName, "pass" : pass })  // find document 
        const result =  await searchCursor.toArray()
        //console.log(result)
        return result
        
    }
    catch (error){
        console.log(`an error has occcured!@$$@$!$@$@$ ${error}`)
        
    }
    finally{
        await client.close()
    }
    
    
}


//findUser("test1")




// async function connect(f){
    
    
//     try{
        
//         const db = client.db("BankApp")
//         console.log(`connected to database ${db.databaseName}`)
//         const users = db.collection("Users")
//         console.log(`connected to collection ${users.collectionName}`)

        
//         // const searchCursor = await users.find({"name":"test1" })  // find document 
//         // const result =  await searchCursor.toArray()
//         // console.table(result)
        
//     }
//      catch (error) {
//         console.error(`an error has occcured!@$$@$!$@$@$ ${error}`)
//     }
//     finally{
//         client.close()
//     }
// }

