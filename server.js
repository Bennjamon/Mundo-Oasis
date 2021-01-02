const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/assets", express.static("public"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
});

app.listen(app.get("port"), () => {
    console.log(`accede a localhost:${app.get("port")}/`);
});