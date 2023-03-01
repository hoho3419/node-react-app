const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://hoho3419:32N1Rgu8SNxkYELb@boilerplate.0rdvtgv.mongodb.net/?retryWrites=true&w=majority'
).then(() => console.log('mongoDB connect..')).catch((err) => console.log("error " + err));

app.get('/',(req,res) => res.send('hello word!'));
app.listen(port,() => console.log(`Example app listening on port ${port}`));