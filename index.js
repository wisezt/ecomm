console.log("This one Works");

const express = require('express');

const app = express();

// the first parameter of app.get() is the router handler, here it is the '/'
app.get('/', (req, res)=>{
    res.send(`
    <h1>Admin Panel</h1>
    <div>
        <p>Sign Up</p>
        <form method="POST" >
            <input name="email" placeholder="email" />
            <br><br>
            <input name="password" placeholder="password" />
            <br><br>
            <input name="passwordConfiramtion" placeholder="password confirmation" />
            <br><br>
            <button>Sign Up</button>
        </form>
    </div>
    `);
});


app.post('/', (req, res)=>{
    // get access to the information send by the browser.
    req.on('data', data =>{
        console.log(data.toString('utf8'));
    });

    console.log("Get Something");
    
    res.send('account created');


});



app.listen(3000, ()=>{
    console.log('Listening');
});