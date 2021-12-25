
const nameEl = document.getElementById("nameInpt")
const pswdEl = document.getElementById("pswdInpt")
const loginBtn = document.getElementById("login-btn")


console.log(nameEl.value)

loginBtn.addEventListener("click",function(){
    let userName = nameEl.value
    let userPswd = pswdEl.value
    console.log(userName + userPswd )
})

function checkUserName(){

}

function connectDB (){
    MongoClient.connect
}


