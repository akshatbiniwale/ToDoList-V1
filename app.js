const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    var today = new Date();
    var currentDay = today.getDay();
    var day="";

    switch (currentDay) {
        case 0:
            day = "Sunday"
            break;

        case 1:
            day = "Monday"
            break;
        
        case 2:
            day = "Tuesday"
            break;

        case 3:
            day = "Wednesday"
            break;

        case 4:
            day = "Thursday"
            break;

        case 5:
            day = "Friday"
            break;

        case 6:
            day = "Saturday"
            break;

        default:
            console.log("Error occurred in: " + currentDay);
            break;
    }

    console.log(day);
    res.render("list", {kindOfDay: day});
});

app.listen(4000, function(){
    console.log("The server is live on port 4000");
});