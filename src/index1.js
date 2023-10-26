const {format} = require('date-fns');
const {v4: uuid} = require('uuid');

const dateElement = document.querySelector('#date');
let currentTime = format(new Date(), 'yyyy.MM.dd\tHH:mm:ss');
dateElement.innerHTML= currentTime; 

//Form Element
const registerForm = document.querySelector('#registerForm');


//Set Empty Storage or Current
if(localStorage.getItem("storage") === null){
    const storage = [];
    localStorage.setItem('storage', JSON.stringify(storage));
    //console.log('Empty Storage, set to array ');
}

// Splitting Localstorarge string

    const str = localStorage.getItem('storage');
    const strJson = JSON.parse(str);
  
    if(typeof strJson === 'string'){
    const newArray = strJson.split(' , ');
    newArray.pop();
    console.log(newArray);
    addTodosToPage(newArray);
    }

//Form Submition
registerForm.addEventListener('submit', (e) => {
    const dateElm = document.querySelector('#date2');
    const activityElm = document.querySelector('#what');
    const priorityElm = document.querySelector('#priority');

    e.preventDefault();
    const date = dateElm.value;
    const activity = activityElm.value;
    const priority = priorityElm.value;

    addTo(date, activity, priority);

})

function addTo(date, activity, priority) {
    const browserStorage = {};
    browserStorage.id = uuid();
    browserStorage.date = date;
    browserStorage.activity = activity;
    browserStorage.priority = priority;
    console.log('actual localStorage: ' + browserStorage);
    addToLocalStorage(browserStorage);
    // test purpose
    //return console.log(browserStorage);
}

function addToLocalStorage(obj){
    let currentStorageString = localStorage.getItem('storage');
    let currentStorage = JSON.parse(currentStorageString);
    let objekt = JSON.stringify(obj);
    currentStorage += objekt + " , ";
    localStorage.setItem('storage', JSON.stringify(currentStorage));
    location.reload();
}

function addTodosToPage(arr){
    for (let i in arr) {
        let obj = JSON.parse(arr[i]); 
        let div = document.querySelector('#logs');
        div.innerHTML += `<p data-todoid="${obj.id}">${obj.date} | ${obj.activity} | ${obj.priority} <button data-name="deleteToDo" id="${obj.id}" >Delete</button> </p>`;
    } 
}
 
function deleteToDo(d){
    d.addEventListener('click', function(e) {
        e.preventDefault();
        const elementToRemove = d.parentElement;
        const idToRemove = elementToRemove.dataset.todoid;
        console.log(elementToRemove, idToRemove);

        let currentStorageString = localStorage.getItem('storage');
        let currentStorage = JSON.parse(currentStorageString);
        console.log('test'+ currentStorage);
        updateLocalStorage(currentStorage, idToRemove);
    })
}

function updateLocalStorage(obj, id){
    const p = [];
    if(typeof obj === 'string'){
        let newArray = obj.split(' , ');
        newArray.pop();
        console.log('current storage' + newArray);
        const finalR = newArray.map((objnew) => {
            let l = objnew ;
            let t = JSON.parse(l);
            if(t.id === id){
                t = '';
            } else {
                /* t += ' , '; */
                t += JSON.stringify(t);
                console.log(t);
                p.push(t);
            }
        });
        console.log(p);
    }
    let currentStorageString = localStorage.getItem('storage');
    let currentStorage = JSON.parse(currentStorageString);
    let objekt = JSON.stringify(p);
    currentStorage = objekt ;
   /*  localStorage.setItem('storage', JSON.stringify(currentStorage)); */
    //location.reload();
}



//Delete
const logs = document.querySelector('#logs');
const deleteButtons = logs.querySelectorAll('[data-name="deleteToDo"]');
/* console.log(deleteButtons);
console.log(typeof deleteButtons); */

    for (let index = 0; index <= deleteButtons.length; index++) {
        const deleteButton = deleteButtons[index];
        if(deleteButton){deleteToDo(deleteButton);}
    }

