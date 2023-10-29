const {v4: uuid} = require('uuid');

class UserCreator{
    constructor(id, name, address, number){
        this.id = id; 
        this.name = name;
        this.address = address;
        this.number = number;
    }

    userRegistered(id, name) {
        const notificationDisplay = document.querySelector('#notificationDisplay');
        notificationDisplay.style.opacity= '1';
        notificationDisplay.classList.add('notificationDisplay');
        notificationDisplay.innerHTML= `User with id: ${id} and name: ${name}, was successfully registered`;

        setTimeout(() => { notificationDisplay.style.opacity= '0';}, 4000)
        setTimeout(() => { notificationDisplay.classList.remove('notificationDisplay');  notificationDisplay.innerHTML= '';}, 5000)
    }
}

function createUser(id, name, address, number){
    const User = new UserCreator(id, name, address, number);
    return User;
}

function addUsersToPage(arr){
    if('name' in arr){
        let obj = arr;
        let div = document.querySelector('#customerTable tbody');
        div.innerHTML += `
                <tr>
                    <td>${obj.id}</td>
                    <td> ${obj.name}</td>
                    <td>${obj.address}</td>
                    <td>${obj.number}</td>
                    <td><button data-delete="delete" id="${obj.id}" >Delete</button></td>
                </tr>
                `;
    } else {
    for (let i in arr) {
                let obj = JSON.parse(arr[i])
                let div = document.querySelector('#customerTable tbody');
                div.innerHTML += `
                <tr>
                    <td>${obj.id}</td>
                    <td> ${obj.name}</td>
                    <td>${obj.address}</td>
                    <td>${obj.number}</td>
                    <td><button class="btn" data-delete="delete" id="${obj.id}" >Delete</button></td>
                </tr>
                `;
         }
    }
    captionText();
}

function deleteUser(element){
    if (confirm("Are you sure you want to delete this customer?")) {
        let id = element.getAttribute('id');
        localStorage.removeItem('User_'+ id);
        element.parentElement.parentElement.remove();
        captionText();
    } else {''}
}

function addToLocalStorage(user){
    //creates an array of only values
    const b = Object.values(user);
    const array = b.map((item) => item.toString());
    //Set LocalStorage string and parse it to object and add to LocalStorage
    const storageString = `{"id": "${array[0]}", "name": "${array[1]}", "address": "${array[2]}", "number": "${array[3]}"}`;
    const obj = JSON.parse(storageString);
    localStorage.setItem('User_'+ array[0], JSON.stringify(obj));
    console.log('localstore finished')
}

function captionText(){
    const tr = document.querySelectorAll('tr');
    const caption = document.querySelector('#customerTable caption');
    let g = tr.length;
    if(g === 1 ) {caption.innerHTML = "No Customers Registred";}
    else{caption.innerHTML = "All Customers";}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//             Event Handling

//render LocalStorage on Page
window.addEventListener('load', () => {
    const allItemsInStorage = { ...localStorage };
    addUsersToPage(allItemsInStorage);
    captionText();
})


//Form Submit 
let inputs = [];
const registerForm = document.querySelector('#registerForm');

registerForm.addEventListener('submit', (e) => {
    const id = uuid();
    const name = document.querySelector('#name').value;
    const address = document.querySelector('#address').value;
    const number = document.querySelector('#number').value;
    inputs = [];
    inputs.push(id, name, address, number);
    console.log(inputs)
    e.preventDefault();
    //creates a User Object
    const user = createUser(inputs[0], inputs[1], inputs[2], inputs[3]);
    addToLocalStorage(user);
    addUsersToPage(user);
    registerForm.reset();
    user.userRegistered(user.id, user.name);
})

// Delete button click
const parenTr =  document.querySelector('#customerTable');
parenTr.addEventListener('click', function(e){
    let deleteButton = e.target;
    let attr = e.target.getAttribute('data-delete');
    if (attr === 'delete') {
          deleteUser(deleteButton);
        }
})