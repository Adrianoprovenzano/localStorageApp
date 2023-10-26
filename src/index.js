const {v4: uuid} = require('uuid');

class UserCreator{
    constructor(id, name, address, number){
        this.id = id; 
        this.name = name;
        this.address = address;
        this.number = number;
    }

    sayHello() {
        alert(`Thank you ${name} to have registered`);
    }
}

function createUser(id, name, address, number){
    const User = new UserCreator(id, name, address, number);
    console.log(User);
    return User;

}

function addUserToPage(arr){
    for (let i in arr) {
        let obj = JSON.parse(arr[i]); 
        let div = document.querySelector('#logs');
        div.innerHTML += `<p data-todoid="${obj.id}">${obj.id} | ${obj.name} | ${obj.address} | ${obj.number} <button data-delete="d" id="${obj.id}" >Delete</button> </p>`;
    } 
}

function addToLocalStorage(user){
    //creates an array of only values
    const b = Object.values(user);
    const array = b.map((item) => item.toString());
    //Set LocalStorage string and parse it to object and add to LocalStorage
    const storageString = `{"id": "${array[0]}", "name": "${array[1]}", "address": "${array[2]}", "number": "${array[3]}"}`;
    const obj = JSON.parse(storageString);
    localStorage.setItem('User'+ array[0], JSON.stringify(obj));
    location.reload();
}

//render LocalStorage on Page
const allItemsInStorage = { ...localStorage };
addUserToPage(allItemsInStorage);

//Form Submit 
let inputs = [];

const registerForm = document.querySelector('#registerForm');

registerForm.addEventListener('submit', (e) => {
    const id = uuid();
    const name = document.querySelector('#name').value;
    const address = document.querySelector('#address').value;
    const number = document.querySelector('#number').value;
    inputs.push(id, name, address, number);
    e.preventDefault();
    //creates a User Object
    const user = createUser(inputs[0], inputs[1], inputs[2], inputs[3]);
    addToLocalStorage(user);
})

// Delete function, Localstorage
const deleteItem = document.querySelector('button[data-delete="d"]');
if(deleteItem){
    deleteItem.addEventListener('click', (e) => {
        e.preventDefault();
        let b =deleteItem.getAttribute('id');
        localStorage.removeItem('User'+ b);
        location.reload();
})
}