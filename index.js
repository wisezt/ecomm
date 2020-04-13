console.log("This one Works");

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));


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


// where is the next function come from?
// My guest, it is building by the app.post() itself.
// const bodyParser = (req, res, next) =>{
//     if (req.method === 'POST'){
//         req.on('data', data=>{
//             const parsed = data.toString('utf8').split('&');
//             const formDate = {};
//             for (let pair of parsed){
//                 const [key, value] = pair.split('=');
//                 formDate[key] = value;
//             }
//             req.body = formDate;
//             next();
//         }
//         );
//     } else {
//         next();
//     }
// }




app.post('/', (req, res)=>{
    // get access to the information send by the browser.
    console.log(req.body);
    
    res.send('account created');


});



app.post('/products',  (req, res)=>{
    // get access to the information send by the browser.
    console.log(req.body);
    
    res.send('account created');


});




app.listen(3000, ()=>{
    console.log('Listening');
});