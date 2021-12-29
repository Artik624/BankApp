
const nameEl = document.getElementById("nameInpt")
const pswdEl = document.getElementById("pswdInpt")
const loginBtn = document.getElementById("login-btn")
const regBtn = document.getElementById("register-btn")



console.log(nameEl.value)

loginBtn.addEventListener("click",function(){
    let userName = nameEl.value
    let userPswd = pswdEl.value
    
})

regBtn.addEventListener("click", function(){

})

function checkUserName(){

}

function connectDB (){
    MongoClient.connect
}


