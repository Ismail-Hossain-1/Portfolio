const express = require('express');
const app = express();
app.use(express.static(__dirname));
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Timestamp } = require('bson');
const dotenv = require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(process.env.db); //....net/Portfolio' database collection nameg

const msgSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
},
    {
        timestamps: true
    }
);

const Message = mongoose.model("message", msgSchema);



app.get("/", (req, res) => {


    res.sendFile(__dirname + "/index.html");
});


// app.post("/sendMsg", (req, res)=>{
//     const data= new Message({
//         name: req.body.name,
//         email:req.body.email,
//         message:req.body.message
//     });

//     data.save();

//     res.redirect('/#contacts');
// });

app.post('/sendMsg', (req, res) => {
    const message = new Message({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });

     message.save();//.then((doc)=>{
    //     console.log("created at: ", doc.createdAt);
    // });
    // alert("submitted");
    res.redirect('/#contacts');

});



app.listen(3000, () => {
    console.log("listening to http://localhost:3000");
});