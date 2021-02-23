// main.js

const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')

update.addEventListener('click', _ => {
    // sends the put request here
    // fetch(endpoint, options)
    fetch('/quotes', { // endpoint is /quotes
        method: 'put', // setting fetch's method to put 
        headers: { 'Content-Type': 'application/json' }, // tell server we are sending json data
        body: JSON.stringify({ // convert data we send into json
            name: 'Darth Vadar',
            quote: 'I find your lack of faith disturbing.'
        })
    })
    
    .then(res => {
        if (res.ok) return res.json()
    })
      
    .then(response => {
        window.location.reload(true)
    })

})


deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Darth Vadar'
        })
    })

    .then(res => {
        if (res.ok) return res.json()
    })
      
    .then(data => {
        window.location.reload()
    })
    
})
