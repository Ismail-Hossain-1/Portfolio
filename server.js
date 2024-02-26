const {GoogleGenerativeAI} =require("@google/generative-ai");
const express = require('express');
const ejs = require('ejs');
const app = express();
app.use(express.static(__dirname));
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Timestamp } = require('bson');
const dotenv = require("dotenv").config();
const colors = require('colors');
app.set('view engine', 'ejs');

app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.db); //....net/Portfolio' database collection nameg
const genAI= new GoogleGenerativeAI(process.env.API_KEY);



// async function run(){
// const prompt="What is psychology?";
// const result=await model.generateContent(prompt);
// const response = await result.response;
// const text = response.text();

// };  
// run();

// Chatbot Section

let postedData=[];

const model=genAI.getGenerativeModel({model:"gemini-pro"});



/*
app.post('/generate', (req, res)=>{
    try{
            const prompt= req.body.prompt;
        //     const result= await model.generateContent(prompt);
        //     const response = await result.response;
        //     const text = response.text();
        //    // res.send({text});
            console.log(req.body.prompt);
    } catch(e){
        console.log(e);
    }
    //res.redirect('/#contacts');
});
*/

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





let lastContacted='';
let lastContactedTime='';
app.post('/sendMsg', (req, res) => {
    const message = new Message({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });
   // console.log(message);

     message.save().then(doc=>{
        lastContactedTime +=doc.createdAt;
        //console.log(lastContactedTime);
     });
     lastContacted += message.name;
    res.redirect('/#contacts');

});

let responsetxt='';
app.post('/generateText',async (req, res) => {
  
    try{
      const prompt = req.body.prompt;
    
           const result= await model.generateContent(prompt); //Struggled a lot to get the 
                                                            //input prompt, it returned undefined datatype
                                                            // when I changed the "<input>"" tag with "<textarea>"
                                                            //it started working and send text type data so the gemini 
                                                            //api also started responding. 
           const response = await result.response;
          const text = response.text();
          
        responsetxt +=text;
          
    //     res.render('/'{
    //         restxt:`${responsetxt}`
    //   })
       // res.send(text);
        //    console.log(prompt.blue);
        //    console.log(text.red);
    
    }catch(e){
      console.log(e);
    }
   res.redirect('/#chatbot');

  });


app.get("/", (req, res) => {
    
      //res.render('./', data);
    const data={
        restxt:`${responsetxt}`,
        lastContacted: `${lastContacted}`, 
        lastContactedTime:`${lastContactedTime}`
  };
      res.render('index', data);
      responsetxt='';
      lastContacted='';

});

app.listen(3000, () => {
    console.log("listening to http://localhost:3000");
});