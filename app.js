const express = require("express");
const bodyParser = require("body-parser");
const taskManager = require("./mongodb");
const _ = require('lodash');

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const today = new Date();
var listHead = "home"
const options = { 
    weekday: 'long',
    month: 'long', 
    day: 'numeric' 
};

const day = today.toLocaleDateString("en-US", options);

app.get("/home", async function(req, res){
    const taskList = await taskManager.firstSchema.find();

    res.render("list", {listTitle: day, listHead: _.capitalize(listHead), listItem: taskList});
});

app.post("/home", async function(req, res){

    const taskVal = req.body.task;
    const data = {
        name: taskVal
    }
    await taskManager.firstSchema.insertMany([data]);
    res.redirect("/home");
});

app.post("/:category/delete", function(req, res){
    setTimeout(async () => {
        const categoryList = req.params.category;
        if(categoryList == "home"){
            await taskManager.firstSchema.deleteOne({_id: req.body.checks})
        }else{
            await taskManager.secondSchema.deleteOne({_id: req.body.checks})
        }
        res.redirect("/" + categoryList);
    }, 500);
});

app.get("/:category", async function(req, res){
    const categoryList = req.params.category;
    const taskList = await taskManager.secondSchema.find({category: categoryList});
    res.render("list", {listTitle: day, listHead: _.capitalize(categoryList), listItem: taskList});
});

app.post("/:category", async function(req, res){
    const categoryList = req.params.category;
    const taskVal = req.body.task
    const data = {
        category: categoryList,
        name: taskVal
    }
    await taskManager.secondSchema.insertMany([data]);
    res.redirect("/" + categoryList);
})

app.get("/about", function(req, res){
    res.render("about");
});

app.listen(4000, function(){
    console.log("The server is live on port 4000");
});