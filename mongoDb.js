const MongoClient = require("mongodb").MongoClient
const uri = "mongodb+srv://arti:admin1234@bankappcluster.lgthl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(uri)
const connect = client.connect()

function findUser(userName){
    connect.then(async () =>{
        try{
            const db = client.db("BankApp")
            console.log(`connected to database ${db.databaseName}`)
            const users = db.collection("Users")
            console.log(`connected to collection ${users.collectionName}`)
            
            console.log(userName)
            const searchCursor =  users.find({"name":userName })  // find document 
            const result =  await searchCursor.toArray()
            console.table(result)
        }
        catch{
            //console.error(`an error has occcured!@$$@$!$@$@$ ${error}`)
        }
        finally{
            client.close()
        }
    })
    
}


findUser("test1")




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

