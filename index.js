console.log("This one WOrks");

const express = require('express');

const app = express();

// the first parameter of app.get() is the router handler, here it is the '/'
app.get('/', (req, res)=>{
    res.send(`
    <h1>Admin Panel</h1>
    <div>
        <p>Sign Up</p>
        <form method="POST" action="/">
            <input placeholder="email" />
            <br><br>
            <input placeholder="password" />
            <br><br>
            <input placeholder="password confirmation" />
            <br><br>
            <button>Sign Up</button>
        </form>
    </div>
    `);
});


app.post('/', (req, res)=>{

    res.send('account created');


});



app.listen(3000, ()=>{
    console.log('Listening');
});