console.log("This one WOrks");

const express = require('express');

const app = express();


app.get('/', (req, res)=>{
    res.send('<h1>hi there<h1>');
});


app.listen(3000, ()=>{
    console.log('Listening');
});