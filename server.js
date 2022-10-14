var udp = require('dgram');
require('date-utils');
const prompt = require('prompt-sync')({sigint: true});

prompt.start();

prompt.get(['username', 'email'], function (err, result) {
  if (err) {
    return onErr(err);
  }
  console.log('Command-line input received:');
  console.log('  Username: ' + result.username);
  console.log('  Email: ' + result.email);
});

function onErr(err) {
  console.log(err);
  return 1;
}
// --------------------creating a udp server --------------------

// creating a udp server
var server = udp.createSocket('udp4');
var serverAddr = {
    address: '192.168.1.115',
    port: '2222'
}

var clientAddr = {
    address: '192.168.1.115',
    port: '55555'
}
//bind ip and port
server.bind(serverAddr);

// emits when any error occurs
server.on('error', function (error) {
    console.log('Error: ' + error);
    server.close();
});

var data = 'B10815027黃浚廷' +
    ' address:' + serverAddr.address +
    ' port:' + serverAddr.port;
var idx = 0;
setInterval(() => {
    let sendData = '[' +  idx + '] ' + data;
    // console.log(sendData);
    server.send(sendData, clientAddr.port, clientAddr.address, function (error) {
        if (error) {
            client.close();
        } else {
            console.log('Server' +' [' +  idx++ + ']'+ 'Data sent !!!');
        }
    })}, 1000);



// emits on new datagram msg
server.on('message', function (msg, info) {
    console.log('Data received from client : ' + msg.toString());
    console.log('Received %d bytes from %s:%d\n', msg.length, info.address, info.port);
    // //sending msg
    // server.send(msg, info.port, info.address, function (error) {
    //     if (error) {
    //         client.close();
    //     } else {
    //         console.log('Data sent !!!');
    //     }

    // });
});

//emits when socket is ready and listening for datagram msgs
server.on('listening', function () {
    var address = server.address();
    var port = address.port;
    var family = address.family;
    var ipaddr = address.address;
    console.log('Server is listening at port' + port);
    console.log('Server ip :' + ipaddr);
    console.log('Server is IP4/IP6 : ' + family);
});

//emits after the socket is closed using socket.close();
server.on('close', function () {
    console.log('Socket is closed !');
});


// setTimeout(function () {
//     server.close();
// }, 8000);

// -------------------- udp client ----------------



// var udp = require('dgram');

// // --------------------creating a udp server --------------------

// // creating a udp server
// var server = udp.createSocket('udp4');
// var localhost = {
//     address: '192.168.1.115',
//     port: '2222',
// }

// var remotehost = {
//     address: '192.168.1.115',
//     port: '55555',
// }

// // emits when any error occurs
// server.on('error', function (error) {
//     console.log('Error: ' + error);
//     server.close();
// });

// // emits on new datagram msg
// server.on('message', function (msg, info) {
//     console.log('Data received from client : ' + msg.toString());
//     console.log('Received %d bytes from %s:%d\n', msg.length, info.address, info.port);

//     //sending msg
//     server.send(msg, info.port, info.address, function (error) {
//         if (error) {
//             client.close();
//         } else {
//             console.log('Data sent !!!');
//         }

//     });

// });

// //emits when socket is ready and listening for datagram msgs
// server.on('listening', function () {
//     var address = server.address();
//     var port = address.port;
//     var family = address.family;
//     var ipaddr = address.address;
//     console.log('Server is listening at port' + port);
//     console.log('Server ip :' + ipaddr);
//     console.log('Server is IP4/IP6 : ' + family);
// });

// //emits after the socket is closed using socket.close();
// server.on('close', function () {
//     console.log('Socket is closed !');
// });

// server.bind(localhost);

// // setTimeout(function () {
// //     server.close();
// // }, 8000);

// // -------------------- udp client ----------------

// // var Buffer = require('buffer');

// // creating a client socket
// var client = udp.createSocket('udp4');
// client.bind(remotehost);
// //buffer msg
// var data = Buffer.from('siddheshrane');


// client.on('message', function (msg, info) {
//     console.log('Data received from server : ' + msg.toString());
//     console.log('Received %d bytes from %s:%d\n', msg.length, info.address, info.port);
// });

// //sending msg
// client.send(data, localhost.port, localhost.address, function (error) {
//     if (error) {
//         client.close();
//     } else {
//         console.log('Data sent !!!');
//     }
// });

// var data1 = Buffer.from('hello');
// var data2 = Buffer.from('world');

// //sending multiple msg
// client.send([data1, data2], localhost.port, localhost.address, function (error) {
//     if (error) {
//         client.close();
//     } else {
//         console.log('Data sent !!!');
//     }
// });

