const osc = require('osc-js');

/*******************
 * OSC Over Serial *
 *******************/
function startSerial() {
    // Instantiate a new OSC Serial Port.
    var serialPort = new osc.SerialPort({
        devicePath: process.argv[2] || "/dev/tty.usbmodem221361"
        // USB\VID_10C4&PID_EA60\022KU11D
    });

    serialPort.on("message", function (oscMessage) { //wehn message is received
        console.log(oscMessage);
    });

    // Open the port.
    serialPort.open();
}


/****************
 * OSC Over UDP *
 ****************/

var getIPAddresses = function () {
    var os = require("os"),
        interfaces = os.networkInterfaces(),
        ipAddresses = [];

    for (var deviceName in interfaces) {
        var addresses = interfaces[deviceName];
        for (var i = 0; i < addresses.length; i++) {
            var addressInfo = addresses[i];
            if (addressInfo.family === "IPv4" && !addressInfo.internal) {
                ipAddresses.push(addressInfo.address);
            }
        }
    }

    return ipAddresses;
};

var udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 57121
});

udpPort.on("ready", function () {
    var ipAddresses = getIPAddresses();

    console.log("Listening for OSC over UDP.");
    ipAddresses.forEach(function (address) {
        console.log(" Host:", address + ", Port:", udpPort.options.localPort);
    });
});

udpPort.on("message", function (oscMessage) {
    console.log(oscMessage);
});

udpPort.on("error", function (err) {
    console.log(err);
});

udpPort.open();


function sendData(port, msg1, msg2, msg3){
    const adress1 = "/addr1";
    var msg ="c"+ msg1 + "|" + msg2 + "|" + msg3;
    port.send({
        address: adress1,
        args: msg
    });
}