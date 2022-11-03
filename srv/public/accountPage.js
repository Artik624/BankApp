const greetingEl = document.querySelector("#accGreeting");
const accInputEl = document.querySelector("#accountInput");
const amountInputEl = document.querySelector("#amountInput");
const currentBalanceEl = document.querySelector("#accBalance");
const depBtnEl = document.querySelector("#depBtn");
const wdBtnEl = document.querySelector("#wdBtn");
const sndBtnEl = document.querySelector("#sendBtn");
const confirmBtnEl = document.querySelector("#confirmBtn");
const mesgSpnEl = document.querySelector("#messageSpn");
let isDeposit = false;
let isWithdraw = false;
let isSend = false;

accInputEl.style.visibility = "hidden";

const uid = document.cookie
  .split("; ")
  .find((row) => row.startsWith("uid"))
  .split("=")[1]; //get user DB UID
const user = await getUserObj(uid); // get user object
const transactions = user.transactions;

const tme = new Date(transactions[0].time);

greetingEl.textContent = "Welcome " + user.name;
currentBalanceEl.textContent = `Your current balance is : ${user.balance}`;

async function getUserObj(uid) {
  const response = await fetch(`/gets/getUserObj:${uid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const userObj = await response.json();
  return userObj[0];
}

depBtnEl.addEventListener("click", function () {
  amountInputEl.style.visibility = "visible";
  confirmBtnEl.style.visibility = "visible";
  accInputEl.style.visibility = "hidden";
  mesgSpnEl.textContent = "Choose amount to Deposit";

  isDeposit = true;
  isWithdraw = false;
  isSend = false;
});

wdBtnEl.addEventListener("click", function () {
  amountInputEl.style.visibility = "visible";
  confirmBtnEl.style.visibility = "visible";
  accInputEl.style.visibility = "hidden";
  mesgSpnEl.textContent = "Choose amount to Withdraw";

  isDeposit = false;
  isWithdraw = true;
  isSend = false;
});

sndBtnEl.addEventListener("click", function () {
  amountInputEl.style.visibility = "visible";
  confirmBtnEl.style.visibility = "visible";
  accInputEl.style.visibility = "visible";
  mesgSpnEl.textContent = "Choose amount and Recipient";

  isDeposit = false;
  isWithdraw = false;
  isSend = true;
});

confirmBtnEl.addEventListener("click", async function () {
  if (amountInputEl.value) {
    if (isDeposit) {
      const response = await fetch(`/posts/deposit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid: uid, amount: amountInputEl.value }),
      });

      if ((await response.status) == 200) {
        amountInputEl.disabled = true;
        confirmBtnEl.disabled = true;
        mesgSpnEl.textContent =
          "Deposit successful , refresh the page to update your balance";
      }
    } else if (isWithdraw) {
      const response = await fetch(`/posts/withdraw`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid: uid, amount: amountInputEl.value }),
      });

      if ((await response.status) == 200) {
        amountInputEl.disabled = true;
        confirmBtnEl.disabled = true;
        mesgSpnEl.textContent =
          "Withdraw successful , refresh the page to update your balance";
      } else if ((await response.status) == 409) {
        mesgSpnEl.textContent = "ERROR - Insufficient funds";
      }
    } else if (isSend) {
      const response = await fetch(`/posts/transfer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: uid,
          recipient: accInputEl.value,
          amount: amountInputEl.value,
        }),
      });

      if ((await response.status) == 200) {
        amountInputEl.disabled = true;
        confirmBtnEl.disabled = true;
        mesgSpnEl.textContent =
          "Transfer successful , refresh the page to update your balance";
      } else if ((await response.status) == 404) {
        mesgSpnEl.textContent = "ERROR - recipient not found, try again";
      } else if ((await response.status) == 409) {
        mesgSpnEl.textContent = "ERROR - Insufficient funds";
      }
    }
  } else {
    mesgSpnEl.textContent = "Choose amount";
  }
});
