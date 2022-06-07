

const addAmountBtn = document.getElementById("add-amount-btn")
const reduceAmountBtn = document.querySelector('#reduce-amount-btn')
const amountInptEl = document.querySelector('#amount-inpt')

addAmountBtn.addEventListener("click", async function(){
    console.log('click')
    let transaction = {amount : amountInptEl.value}
    console.log(transaction)

    const res = await fetch('/posts/transaction', {
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(transaction)
        })

    const transac = await fetch('/gets/transaction:uId',{
        method:'GET',
        headers:{
            
        }
        
    })
})