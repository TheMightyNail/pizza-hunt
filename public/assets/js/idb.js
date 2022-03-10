// create variable to hold db connection
let db;
// establish a connection to IndexedDB database called pizza_hunt and set it to version 1
const request = indexedDB.open('pizza_hunt', 1);

// this event will emit if the database version changes
request.onupgradeneeded = function(event) {
    // save a reference to the database
    const db = event.target.result;
    // create an object store(table) called 'new_pizza', set it to have an autoincrementing primary key
    db.createObjectStore('new_pizza', { autoIncrement: true });
};  

// upon a successful
request.onsuccess = function(event) {
    //  when db is successfully created from its object store (fron onupgradeneeded) or simply established a connection, save reference to db in global variable
    db = event.target.result;

    // check if app is online, if yes run uploadPizza() function to send all local db data to api
    if(navigator.onLine) {
        // uploadPizza();
    }
};

request.onerror = function(event) {
    // log error
    console.log(event.target.errorCode);
};

// This function will execute if we attempt to submit a new pizza and there's no internet connection
function saveRecord(record) {
    // open a new transaction with the database with read and write permissions
    const transaction = db.transaction(['new_pizza'], 'readwrite');

    // access the object store for `new_pizza`
    const pizzaObjectStore = transaction.objectStore('new_pizza');

    // add record to your store with add method
    pizzaObjectStore.add(record);
}