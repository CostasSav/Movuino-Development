import React from 'react'

class ConnectSection extends React.Component {
  render() {
    return (
      <div>
          <h2>Connect Movuino to the WiFi</h2>
          <input placeholder="SSID" id="SSID"></input><input placeholder="Password" id="Password"></input> <br></br>
          <input placeholder="Computer IP" id="cIP"></input>
          <button>Get IP</button><br></br>
          <button /*onClick={() => {
              startSerial();
              sendData(
                  serialPort,
                  document.getElementById("SSID").innerHTML,
                  document.getElementById("Password").innerHTML,
                  document.getElementById("cIP").innerHTML)
          }}*/>Confirm</button>
      </div>
    )
  }
}