const express = require("express");
const bodyParser = require("body-parser");
const taskManager = require("./mongodb");

const app = express();
var errMsg = "";

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async function(req, res){
    var today = new Date();
    var currentDay = today.getDay();
    var day="";

    var options = { 
        weekday: 'long',
        month: 'long', 
        day: 'numeric' 
    };

    day = today.toLocaleDateString("en-US", options);

    const taskList = await taskManager.find();

    res.render("list", {listTitle: day, listItem: taskList, errorMessage: errMsg});
});

app.post("/", async function(req, res){

    if(req.body.list === "Work List"){
        workTaskList.push(req.body.task);
        res.redirect("/work");
    }
    else{
        const taskVal = req.body.task;
        if(taskVal != ''){
            errMsg = ""
            const data = {
                name: taskVal
            }
            await taskManager.insertMany([data]);
        }else{
            errMsg = "Error: Value is NULL"
        }
        res.redirect("/");
    }
});

app.post("/delete", function(req, res){
    setTimeout(async () => {
        await taskManager.deleteOne({_id: req.body.checks})
        res.redirect("/");
    }, 500);
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