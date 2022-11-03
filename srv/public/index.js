const nameEl = document.getElementById("nameInpt")
const passEl = document.getElementById("pswdInpt")
const loginBtn = document.getElementById("login-btn")
const regBtn = document.getElementById("register-btn")
const loginFormEl = document.querySelector(".login-form")
const messageEl = document.querySelector("#message")

// loginFormEl.style.height = '300px'
// emailEl.style.display ='none'
// passEl.style.display ='none'
// nameEl.style.display ='none'
 
loginBtn.addEventListener("click",function(){
   
    let user = {userName:nameEl.value, pass:passEl.value}

    getUser()
    async function getUser(){
        const response =  await fetch('/posts/login', {
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body: JSON.stringify(user)
        })

        let cookie = document.cookie
        
        if(cookie && (await response.json() != null)){
            
            const uid = cookie.split('; ').find(row => row.startsWith('uid')).split('=')[1]
            redirect(uid);
        }else{
            messageEl.innerHTML = "Incorrect Username or password"
            nameEl.value = "";
            passEl.value = "";
        }
    }
})

async function redirect(uid){
    
    const res = await fetch(`/gets/account:${uid}`, {
        method:'GET',
        headers:{
            
        },
    })
    if(res.status == 200){
        window.location.href = res.url
    }
}
        
regBtn.addEventListener('click', () =>{
    
    (async ()=> {
        const res = await fetch('/gets/regPage', {method:'GET'})
        window.location.href = res.url
    })()
})



