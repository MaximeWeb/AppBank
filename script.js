'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKER APP

// Data
const account1 = {
  owner: 'Hedi Rivas',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');



const displayMovements = (movements) => {

containerMovements.innerHTML = ""

movements.forEach(function (mov,i) {
 const type = mov > 0 ? 'deposit' : 'withdrawal';
 const html = `
 <div class="movements__row">
 <div class="movements__type movements__type--${type}">
 ${i + 1} ${type}</div>
 <div class="movements__date">3 days ago</div>
 <div class="movements__value">${mov}€</div>
 `;

 containerMovements.insertAdjacentHTML('afterbegin', html);

})

}  



const createUsernames = (names) => {

  names.forEach(function (name) {
   
    name.username = name.owner.toLowerCase().split(' ').map((name) => name[0]).join('')
        
  })
} 

createUsernames(accounts)




const calcDisplayBalance = (movements) => {
// 0 + 1 + 2 + 3 + 4

 currentAccount.sumWithInitial = movements.reduce((accumulator,currentValue ) => accumulator + currentValue, 0);

labelBalance.textContent = currentAccount.sumWithInitial + " €"

}

const calcDisplaySummary = (movements) => {

 
 const incomes  = movements.filter((mov) => mov > 0).reduce((accumulator,currentValue ) => accumulator + currentValue, 0);
const  out = movements.filter((mov) => mov < 0).reduce((accumulator,currentValue ) => accumulator + currentValue, 0);
const interest = movements
.filter((mov) => mov > 0)
.map((int) => (int * 1.2) / 100)
.filter((mov) => mov > 1)
.reduce((a, b) => a + b, 0);
labelSumInterest.textContent = `${interest.toFixed(2)} €`;
console.log(interest)

labelSumIn.textContent = `${incomes} €`
labelSumOut.textContent = `${Math.abs(out)} €`

 }

let currentAccount;

inputLoginPin.type = "Password"

 btnLogin.addEventListener('click' ,(event) => {
 
  event.preventDefault()

  
 currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value)

 console.log(currentAccount)

if (currentAccount?.pin === Number(inputLoginPin.value) ) {
  labelWelcome.textContent =  `Welcome Back  ${currentAccount.owner.split(' ')[0]}`
   containerApp.style.opacity = 1;
   displayMovements(currentAccount.movements);
   calcDisplayBalance(currentAccount.movements)
   calcDisplaySummary(currentAccount.movements)

  } 

  inputLoginUsername.value = ""
  inputLoginPin.value = ""

 })
 
   
   btnTransfer.addEventListener('click' ,(event) => {
    event.preventDefault()

  let amount = Number(inputTransferAmount.value)

   let receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value)

if (amount > 0 && currentAccount && currentAccount.sumWithInitial > amount && receiverAcc.username !== currentAccount.username ) {
    
    currentAccount.movements.push(-amount)
    receiverAcc.movements.push(amount)
    displayMovements(currentAccount.movements);
    calcDisplayBalance(currentAccount.movements)
    calcDisplaySummary(currentAccount.movements)

   }   

  })
  

  

 


















  
