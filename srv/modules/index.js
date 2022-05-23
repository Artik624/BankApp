const nameEl = document.getElementById("nameInpt")
const passEl = document.getElementById("pswdInpt")
const emailEl = document.querySelector("#emailInpt")
const loginBtn = document.getElementById("login-btn")
const regBtn = document.getElementById("register-btn")
const forgotBtn = document.querySelector("#forgotPswd-btn")
const testEl = document.getElementById('test')
const loginFormEl = document.querySelector(".login-form")

// loginFormEl.style.height = '300px'
// emailEl.style.display ='none'
// passEl.style.display ='none'
// nameEl.style.display ='none'
 
loginBtn.addEventListener("click",function(){
    loginFormEl.style.height = '300px'
    nameEl.style.display = 'inline'
    passEl.style.display = 'inline'


let user = {userName:nameEl.value, pass:passEl.value}

    getUser()
    async function getUser(){
        
        //console.log(user)
        
        const response =  await fetch('/posts/login', {
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
        })
        const r = await response.json()
        localStorage.setItem('token', r.accessToken)
        
        //console.log(`Bearer ${localStorage.token}`);
        console.log("here1")
        console.log(r)
        if(r != null){
            console.log("in redirect");
            redirect();
        }
        else{
            console.log("empty token")
        }
    }
})
    
                
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

async function redirect(){
    console.log('in redirect')
    const res = await fetch('/gets/account', {
        method:'GET',
        headers:{
            'Authorization': `Bearer ${localStorage.token}`
        }
    })
    window.location.href = res.url
}