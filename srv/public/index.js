const nameEl = document.getElementById("nameInpt")
const passEl = document.getElementById("pswdInpt")
const emailEl = document.querySelector("#emailInpt")
const loginBtn = document.getElementById("login-btn")
const regBtn = document.getElementById("register-btn")
const forgotBtn = document.querySelector("#forgotPswd-btn")
const testEl = document.getElementById('test')
const loginFormEl = document.querySelector(".login-form")
const messageEl = document.querySelector("#message")

// loginFormEl.style.height = '300px'
// emailEl.style.display ='none'
// passEl.style.display ='none'
// nameEl.style.display ='none'
 
loginBtn.addEventListener("click",function(){
   /* loginFormEl.style.height = '300px'
    nameEl.style.display = 'inline'
    passEl.style.display = 'inline'
    */

    console.log("login btn ")
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
        console.log(cookie)
        if(cookie && (await response.json() != null)){
            
            const uid = cookie.split('; ').find(row => row.startsWith('uid')).split('=')[1]
            redirect(uid);
        }else{
            messageEl.innerHTML = "error"
            
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

forgotBtn.addEventListener('click', ()=>{
    
    loginFormEl.style.height =  loginFormEl.offsetHeight + 20 + 'px' ;
    emailEl.style.display = 'inline'
})

