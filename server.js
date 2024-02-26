const {GoogleGenerativeAI} =require("@google/generative-ai");
const express = require('express');
const ejs = require('ejs');
const app = express();

app.use(express.static(__dirname+'/'));
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const dotenv = require("dotenv").config();
const colors = require('colors');


//app.use(express.static(__dirname));

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

    const html= `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfioli</title>
    <link rel="stylesheet" href="/index.css">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>

<body>

    <header class="header">
        <a href="#" class="logo">Portfolio</a>
        <i class="fa-solid fa-bars" id="menue-icon"></i>

        <div class="navbar">
            <a href="#home" class="active"> Home</a>
            <a href="#about">About Me</a>
            <a href="#contacts"> Contacts</a>
            <a href="#projects"> Projects</a>
            <a href="#education"> Education</a>
            <a href="#chatbot" ><div class="chatExperiment" style="color: rgb(4, 97, 19);">Experiments</div></a>

        </div>
    </header>

    <section class="home" id="home">
        <div class="home-content">
            <h3>Hi, I am </h3>
           <div style="display: inline-flex;"><h1 >I<h1 id="my-name"></h1> </h1></div>
           
            <h3><span class="my-status"></span></h3>
            <p>The website hightlights some of the projects  I have worked on, my Education and skills I learned. Overall, the website serves as 
                a comprehensive overview of my capabilities and potential as a young student.
            </p>

            <div class="social-media">
                <a href="https://github.com/Ismail-Hossain-1"><i class="fa-brands fa-github"></i></a>
                <a href="#"><i class="fa-brands fa-linkedin"></i></a>
                <a href="#"><i class="fa-solid fa-globe"></i></a>
            </div>
        </div>
        <div class="home-img">
            <img src="./image/me.png" alt="">
        </div>
    </section>

    <section class="about" id="about">
         <div class="about-image">
            <img src="./image/about.png" alt="" class="about-image">
        </div>


        <div class="about-content">
            <h2 class="heading">About Me</h2>
            <!-- <h3>Software Engineering Undergraduate</h3> -->
            <h3>An IT enthusiast currently pursuing Software Engineering BSc. degree and completed 2 years of the program. </br><br>
                A reliable team memer who worked a number of academic and non-academic team projects.Seeking internship opportunities that can greatly enhance my learning. 
                Commited to continuous learning and continuous self development.
            </h3>
            <a href="#" class="btn"> Read more</a>
        </div> 
    </section>

    <!-- projet Section -->

    <section class="projects" id="projects">
        <h2 class="heading">Recent <span>Projects</span></h2>

        <div class="projects-container">

            <div class="project-box">
                <i class="fa-brands fa-android"></i>
                <h3>Android App</h3>
                <p>An app with 3D models for kids to learn about the solar system and holy sites in islam. 
                    The android app was build using flutter framework along with blender for 3D models.
                </p>
                
                <a href="https://github.com/Ismail-Hossain-1/flutter_tutorial" class="btn" id="android"> Read more</a>

            </div>
            <div class="project-box">
                <i class="fa-brands fa-java"></i>
                <h3>Desktop App</h3>
                <p>It is a game where a cat has to cross a river savely using a floating plank.
                   The game was developed using java swing libraby. 
                   Click Read more button for more.
                   </p>

                <a href="https://github.com/Ismail-Hossain-1/Brave-Cat" class="btn"> Read more</a>

            </div>
            <div class="project-box">
                <i class="fa-solid fa-c"><i class="fa-solid fa-plus"><i class="fa-solid fa-plus"></i></i></i>
                <h3>Racing Game</h3>
                <p> A car racing game where the player has to run his car on busy highway without 
                    facing any accidents.
                    It was developed using iGraphics library. Check more:</p>

                <a href="https://github.com/Ismail-Hossain-1/BEAT-THE-ROAD-Game" class="btn"> Read more</a>

            </div>
        </div>
    </section>

    <section class="education" id="education">
        <h2 style="text-align: center; display: inline; font-size: 1.7rem;">Education</h2>
        <div class="contents">
            
            <div class="box" >
                    <h3>2016-2018</h3>
                    <h2>SSC</h2>
                    <p >
                        In 2018 I got my secondary school certificate form my school Master Mission Hight School. 
                        It was located in a suburb of a large city called Cumilla.
                         The teachers were supportive and dedicated to helping students succeed.
                    </p>
            </div>
            <div class="box">
                <h4>2018-2020</h4>
                <h3>HSC</h3>
                <p>
                    My 2 years in higher secondary program was from Kalikapur Abdul Matin Khasru Govt. College, Cumilla. 
                    The board exam was planned to be held on April 2020 but eventually 
                    never happenned due to the Epidemic we all know about.
                </p>
        </div>
        <div class="box">
            <h4>2022-2015(expected)</h4>
            <h3>BSc</h3>
            <p>
            Pursuing my BSc degree at the Department of Software Engineering from Shahjalal University of Science and Technology(SUST).
            I am halfway done with the four years program.
            </p>
         </div>
        </div>
        <div class="about-image">
            <img src="../image/education.png" alt="" class="about-image">
        </div>
    </section>
    

    <!-- Contacts section contacts -->
    <section class="contacts" id="contacts">
        <h2 class="heading">Contact <span>Me</span></h2>

        <form id="form" method="POST" action="/sendMsg" , name="contact-form">
            <div class="input-box">
                <input type="text" placeholder="Full Name" id="input-name" name="name">
                <input type="email" placeholder="Email" id="email" name="email">
            </div>

            <textarea placeholder="Your Message" name="message" id="" cols="30" rows="10"></textarea>

            <input type="submit" value="Submit" class="btn" id="submit">

        </form>
        <p> Last contacted: <span> ${ lastContacted } </span></p>
        <p>  on: ${lastContactedTime }</p>

    </section>

    <!-- Gemini-chatbot -->
    <!-- This secton took more than 12 hours to get it into a shape -->
    <section class="chatbot" id="chatbot">
        <h2 class="heading"> Try AI <span> Chatbot</span></h2>
        <div class="chatbot-container">
        <div class="input-area">
            <h3>Enter your Text below</h3>
        <form action="/generateText" method="post">
            <textarea name="prompt" id="prompt" cols="30" rows="10"></textarea>
            <button type="submit" class="btn">Generate</button>
        </form>

        </div>
        <div id="response" style="color: aliceblue;" class="bot" >
                 <!-- Hi <% if(typeof resTxt !=='undefined' ){%>
                    <p> <%= resxt %></p>
                <% } %>  -->
                <h3>Chatbot:</h3>
                <p> ${responsetxt}</p>

        </div>
    </div>
    </section>

    <!-- Scroll Reveal -->
    <script src="https://unpkg.com/scrollreveal"></script>
    <!-- Typed-script -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.10/typed.js"></script>

    <script src="/index.js"></script>

   
   
   
    <script src="../form-submit.js"></script>




</body>

</html>
    `;
    
      //res.render('./', data);
//     const data={
//         restxt:`${responsetxt}`,
//         lastContacted: `${lastContacted}`, 
//         lastContactedTime:`${lastContactedTime}`
//   };
      res.send(html);
      responsetxt='';
      lastContacted='';

});

app.listen(3000, () => {
    console.log("listening to http://localhost:3000");
});

