#include <OSCMessage.h>
#include <OSCBundle.h>
#include <OSCData.h>

#ifdef BOARD_HAS_USB_SERIAL
#include <SLIPEncodedUSBSerial.h>
  SLIPEncodedUSBSerial SLIPSerial( thisBoardsSerialUSB );
#else
#include <SLIPEncodedSerial.h>
  SLIPEncodedSerial SLIPSerial(Serial1);
#endif

void OSCreceive(char* inmsg) //receive Serial Port OSC message and convert/store as string in inmsg
{
    OSCMessage bundleIN;
    int size;

    while(!SLIPSerial.endofPacket()) //to read Serial port
        if( (size =SLIPSerial.available()) > 0)
        {
            while(size--)
                bundleIN.fill(SLIPSerial.read());
        }
    if (!bundleIN.hasError()) {
        bundleIN.getString(0, inmsg);
    }
}

