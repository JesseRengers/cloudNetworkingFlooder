const express = require("express")
const bodyParser = require("body-parser")
const app = express();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Dummy react on a GET request, just sending some string
app.get("/", function(req,res) {
    res.send("<h1>Co-residency detection</h1>This is the flooder")
})

//React on the post request of the client at /flooder, only if key is a specific string
//runs the flood function
app.post('/flooder',function(req,res) {
    console.log("Got a post")
    console.log(req.body)
    instruct_flooder(req.body.floodDuration,
            req.body.sink_ip,
            req.body.sink_port,
            req.body.packet_size,
            req.body.measureDuration) //launc flooder function
        
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end('Now flooding after ' + req.body.offset + ' for ' + req.body.duration + ' seconds')
})


//Waits <offset> seconds before flooding a host in the options constant
const instruct_flooder = async function(floodDuration,sink_ip,sink_port,packet_size,measureDuration) {

    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python3',["flooder.py", sink_ip, sink_port, packet_size,measureDuration,floodDuration])

    pythonProcess.stdout.on('data', (data) => {
        console.log(data.toString('hex'))
    });

}


//Listen on port 3000 for incoming requests
app.listen(3000,function() {
    console.log("listening on 3000")
})