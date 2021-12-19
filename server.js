const express = require("express")
const bodyParser = require("body-parser")
const app = express();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function(req,res) {
    res.send("flooder")
})

app.post('/flooder',function(req,res) {
    console.log("Got a post")
    if (req.body.key == 'ditiseensoortwachtwoord') {
        console.log("Now Flodding for " + req.body.duration + " seconds")
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end('Now flooding for ' + req.body.duration + ' seconds')
    } else {
        console.log("Nevermind")
        res.writeHead(400, {'Content-Type': 'text/html'})
        res.end()
    }

})

app.listen(3000,function() {
    console.log("listening on 3000")
})