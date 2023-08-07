const Stream = require('../src/videoStream')

const options = {
  name: 'streamName',
  url: 'rtsp://admin:admin@123@192.168.10.101:554/Streaming/Channels/401',
  width: 640, // Replace with the desired width
  height: 480,
  wsPort: 8083, // Replace with the desired WebSocket port
  port: 8084, // Replace with the desired HTTP port
  ffmpegPath: 'ffmpeg'

}



stream = new Stream(options)

stream.start()