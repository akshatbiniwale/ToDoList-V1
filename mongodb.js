const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/todoDB")
    .then(() => {
        console.log("MongoDb connected");
    })
    .catch((error) => {
        console.log("MongoDb failed to connect: ", error);
    });

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    } 
});

const task = new mongoose.model("task", taskSchema);

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

const secondTask = new mongoose.model("secondTask", categorySchema);

module.exports = {
    firstSchema : task,
    secondSchema : secondTask
}