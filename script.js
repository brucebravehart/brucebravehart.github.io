// Navigation Logic
function goToMain() {
    const name = document.getElementById('name-input').value;
    if (name.trim() === "") {
        alert("Please enter a name");
        return;
    }
    
    document.getElementById('greeting').innerText = `Hello, ${name}!`;
    document.getElementById('landing-page').classList.add('hidden');
    document.getElementById('main-page').classList.remove('hidden');
}

// List Logic
const btn = document.getElementById('add-item-btn');
const list = document.getElementById('item-list');

btn.addEventListener('click', () => {
    const newItem = document.createElement('li');
    newItem.innerText = `Item added at ${new Date().toLocaleTimeString()}`;
    list.appendChild(newItem);
});

// Register Service Worker for PWA functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker registered!'))
            .catch(err => console.log('Service Worker failed:', err));
    });
}