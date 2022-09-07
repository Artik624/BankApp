const greetingEl = document.querySelector('#greeting')
const dateEl = document.querySelector('#date')
const amountEl = document.querySelector('#amount')
const currentBalanceEl = document.querySelector('#currentBalance')

const uid = document.cookie.split('; ').find(row => row.startsWith('uid')).split('=')[1]
const user = await getUserObj(uid)
const transactions = user.transactions

const tme = new Date(transactions[0].time)
console.log(transactions[0])
dateEl.textContent = new Date(transactions[0].time).toUTCString()
amountEl.textContent = transactions[0].amount
currentBalanceEl.textContent = transactions[0].currentBalance




greetingEl.textContent ='Welcome ' + user.name ;



async function getUserObj(uid){
    const response = await fetch(`/gets/getUserObj:${uid}`,{
        method:'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    
    const userObj = await response.json()
    return userObj[0]

}