const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');//midlldeware to handle form data 
const helmet = require('helmet');//helmet module to mitigate ddos requests
const { addUser } = require('./src/js/user_model');


//TODO write test for github CI
const dirname = path.resolve("./");
const cors = require('cors');//middleware to mitigate cross side scripting 
const server = express();
const port = process.env.PORT || 3001;
const staticDir = path.join(dirname, `src`); 

server.use(cors({origin: '*'}));
server.use(helmet({
    contentSecurityPolicy: false,
}));

server.use(bodyParser.urlencoded({
    extended: false
}));
server.use(express.json());//json middleware 
server.use(express.static(staticDir));
console.log(dirname);

server.get("/", (req, res) => {
    //home route 
    res
        .status(200)
        .type(".html")
        .sendFile(path.join(dirname, "src", "html", "index.html"));

});
server.get("/form", (req, res) => {

    res
        .status(200)
        .type(".html")
        .sendFile(path.join(dirname, "src", "html", "auth.html"));
})
server.post('/form', (req, res) => {
    //handle form  
    console.log({ username: req.body.name, regNumber: req.body.regNo, email: req.body.email, phoneNumber: req.body.phoneNo })

    if (req.body.name && req.body.regNo && req.body.email && req.body.phoneNo) {
        //if form data is populated 
        addUser({ username: req.body.name, regNumber: req.body.regNo, email: req.body.email, phoneNumber: req.body.phoneNo })//add user to db 
        res
            .status(200)
            .redirect(`/`);
    }
    else{
            //if form data is null 
        res
            .status(404)
            .json({status:"fail"})
            
    }
})
server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);//Debug log 
});
