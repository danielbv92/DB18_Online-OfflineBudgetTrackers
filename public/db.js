const { response } = require("express");

let db; 
const request = indexedDB.open('budget,', 1);

request.onsucess = event => {
    db = event.target.result;

    if (navigator.onLine) {
        checkDatabase();
    }
};

request.onupgradeneeded = ({ target }) => {
    const db = target.result; 
    db.createObjectStore('pending', { autoIncrement: true });
};

request.onerror = function(event) {
    console.error(event);
};

function saveRecord(record) {
    const transaction = db.transaction(['pending'], 'readwrite');

    const store = transaction.objectStore('pending');

    store.add(record);
}

function checkDatabase() {
    const transaction = db.transaction(['pending'], 'readwrite');

    const store = transaction.obectStore('pending');

    store.add(record);
}

function checkDatabase() {
    const transacion = db.transaction(['pending'], 'readwrite');

    const store = transacion.objectStore('pending');

    const getAll = store.getAll();

    getAll.onsucess = function() {
        if (getAll.result.length > 0) {
            fetch('/api/transaction/bulk', {
                method: 'POST', 
                body: JSON.stringify(getAll.result),
                headers: {
                    accept: 'Application/json, text/plain, */*', 
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(()=> {
                const transacion = db.transacion(['pending'], 'readwrite');

                const store = transaction.objectStore('pending');

                store.clear();
            });
        }
    };
}

window.addEventListener('online', checkDatabase);