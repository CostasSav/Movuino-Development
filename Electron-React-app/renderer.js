// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { SerialPort } = require('serialport')
const tableify = require('tableify')
const osc = require('osc')

async function listSerialPorts() {
  await SerialPort.list().then((ports, err) => {
    if(err) {
      document.getElementById('error').textContent = err.message
      return
    } else {
      document.getElementById('error').textContent = ''
    }
    console.log('ports', ports);

    if (ports.length === 0) {
      document.getElementById('error').textContent = 'No ports discovered'
    }

    tableHTML = tableify(ports)
    document.getElementById('ports').innerHTML = tableHTML
  })
}

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

document.getElementById("confirm-btn").onclick = function () {
  startSerial();
  sendData(
      serialPort,
      document.getElementById("SSID").innerHTML,
      document.getElementById("Password").innerHTML,
      document.getElementById("cIP").innerHTML)
}

function listPorts() {
  listSerialPorts();
  setTimeout(listPorts, 2000);
}

// Set a timeout that will check for new serialPorts every 2 seconds.
// This timeout reschedules itself.
setTimeout(listPorts, 2000);

listSerialPorts()
