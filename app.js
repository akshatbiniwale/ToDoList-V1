const express = require("express");
const bodyParser = require("body-parser");

const app = express();
var task;
var taskList = [];
var workTaskList = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function(req, res){
    var today = new Date();
    var currentDay = today.getDay();
    var day="";

    var options = { 
        weekday: 'long',
        month: 'long', 
        day: 'numeric' 
    };

    day = today.toLocaleDateString("en-US", options);

    res.render("list", {listTitle: day, listItem: taskList});
});

app.post("/", function(req, res){

    if(req.body.list === "Work List"){
        workTaskList.push(req.body.task);
        res.redirect("/work");
    }
    else{
        taskList.push(req.body.task);
        res.redirect("/");
    }
});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", listItem: workTaskList});
});

app.get("/about", function(req, res){
    res.render("about");
});

app.listen(4000, function(){
    console.log("The server is live on port 4000");
});