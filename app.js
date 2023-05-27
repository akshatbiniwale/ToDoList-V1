const express = require("express");
const bodyParser = require("body-parser");
const taskManager = require("./mongodb");

const app = express();
var errMsg = "";

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var listHead = "home"
var day

app.get("/home", async function(req, res){
    var today = new Date();
    var currentDay = today.getDay();
    day="";

    var options = { 
        weekday: 'long',
        month: 'long', 
        day: 'numeric' 
    };

    day = today.toLocaleDateString("en-US", options);

    const taskList = await taskManager.firstSchema.find();

    res.render("list", {listTitle: day, listHead: listHead, listItem: taskList, errorMessage: errMsg});
});

app.post("/home", async function(req, res){

    const taskVal = req.body.task;
    if(taskVal != ''){
        errMsg = ""
        const data = {
            name: taskVal
        }
        await taskManager.firstSchema.insertMany([data]);
    }else{
        errMsg = "Error: Value is NULL"
    }
    res.redirect("/home");
});

app.post("/delete", function(req, res){
    setTimeout(async () => {
        await taskManager.firstSchema.deleteOne({_id: req.body.checks})
        res.redirect("/home");
    }, 500);
});

app.get("/:category", async function(req, res){
    const categoryList = req.params.category;
    const taskList = await taskManager.secondSchema.find({category: categoryList});
    res.render("list", {listTitle: day, listHead: categoryList, listItem: taskList, errorMessage: errMsg});
});

app.post("/:category", async function(req, res){
    const categoryList = req.params.category;
    const taskVal = req.body.task
    console.log(taskVal + " + " + categoryList)
    if(taskVal != ''){
        const data = {
            category: categoryList,
            name: taskVal
        }
        await taskManager.secondSchema.insertMany([data]);
    }else{
        errMsg = "Error: Value is NULL"
    }
    res.redirect("/" + categoryList);
})

app.get("/about", function(req, res){
    res.render("about");
});

app.listen(4000, function(){
    console.log("The server is live on port 4000");
});