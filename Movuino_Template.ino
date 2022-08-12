#include "Arduino.h"
#include "WiFi.h"
#include "MOVUINO_ESP32/_SerialOSC.h"
#include "MOVUINO_ESP32/_WifiOSC.h"
#include "MOVUINO_ESP32/_MPU9250.h"


#ifdef BOARD_HAS_USB_SERIAL
#include <SLIPEncodedUSBSerial.h>
  SLIPEncodedUSBSerial SLIPSerial( thisBoardsSerialUSB );
#else
#include <SLIPEncodedSerial.h>
  SLIPEncodedSerial SLIPSerial(Serial1);
#endif

MovuinoMPU9250 mpu = MovuinoMPU9250();

// A UDP instance to let us send and receive packets over UDP
WiFiUDP Udp;
const IPAddress outIp(192, 168, 0, 5);     // remote IP (not needed for receive)
//const unsigned int outPort = 9999;          // remote port (not needed for receive)
//const unsigned int localPort = 8888;        // local port to listen for UDP packets (here's where we send the packets)

int port = 5555;
int ip[4] = {192, 168, 1, 18};

// Variables to store WiFi credentials
const char* ssid = "";
const char* password = "";

// Variable to store OSC message
char* inmsg= "";
char *startmsg = "";

// Connection with App flag
bool greenFlag = false; //connection flag
bool hasStarted = false; //data start flag

/* Initialize WiFi
void initWiFi() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi:");
  Serial.println(ssid);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(1000);
  }
  delay(5000);
  Serial.println(WiFi.localIP());
}*/


void setup() {
  Serial.begin(115200);

  mpu.begin();

  Serial.print("Connecting to the App..");
  while (greenFlag == false){
    Serial.println(".");
    OSCreceive(inmsg);
    if (!strcmp(inmsg, ""))
    {
      greenFlag = true;
    }   
  }  
  Serial.print("Connection to App established!");

  //Example to receive SSID and Password from App
  //The Osc message sent by the app should be in the form of: OSCmsg = " _your_ssid_ _your_password_"
  if (inmsg[0] == ' '){
    int i = 1;
    while (inmsg[i]!=' '){
      ssid = ssid + inmsg[i];
      i++;
    }
    Serial.println("SSID: ");
    Serial.println(ssid);
    while (inmsg[i]!='\0'){
      password = password + inmsg[i];
      i++;
    }
    Serial.println("Password: ");
    Serial.println(password);     
  }   
  //initWiFi();
  MovuinoWifiOSC osc = MovuinoWifiOSC(ssid, password, ip, port);
  osc.begin();

  //movuino IP
  Serial.print("Movuino IP:");
  Serial.println(WiFi.gatewayIP());

  // udp.send(WiFi.gatewayIP())


}

void loop() {   

  OSCreceive(startmsg);
  while (hasStarted == false){
    Serial.println(".");
    OSCreceive(startmsg);
    if (strcmp(startmsg, "start"))
    {
      hasStarted = true;
      hasStopped = false;
    }   
  }

  while (hasStopped == false){
    // udp.send(mpu);
    if (strcmp(startmsg, "stop"))
    {
      hasStopped = true;
      hasStarted = false;
    }   
  }
}
