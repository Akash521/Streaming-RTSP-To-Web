// const onvif = require('node-onvif');

// console.log('Start the discovery process.');
// // Find the ONVIF network cameras.
// // It will take about 3 seconds.
// onvif.startProbe().then((device_info_list) => {
//   console.log(device_info_list.length + ' devices were found.');
//   // Show the device name and the URL of the end point.
//   device_info_list.forEach((info) => {
//     console.log('- ' + info.urn);
//     console.log('  - ' + info.name);
//     console.log('  - ' + info.xaddrs[0]);
//   });
// }).catch((error) => {
//   console.error(error);
// });

///////////////////////////////////////

// const onvif = require('node-onvif');

// // Create an OnvifDevice object
// let device = new onvif.OnvifDevice({
//   xaddr: 'http://192.168.88.4:8081/onvif/device_service',
//   user : 'admin',
//   pass : 'tmzkdl123$'
// });

// // Initialize the OnvifDevice object
// device.init().then(() => {
//     // Get the UDP stream URL
//     let url = device.getUdpStreamUrl();
//     console.log(url);
//   }).catch((error) => {
//     console.error(error);
//   });

/////////////////////////////////////////

Stream = require('node-rtsp-stream')
stream = new Stream({
  name: 'name',
  streamUrl: 'rtsp://admin:admin@123@192.168.10.101:554/Streaming/Channels/401',
  wsPort: 9900,
  ffmpegOptions: { // options ffmpeg flags
    '-stats': '', // an option with no neccessary value uses a blank string
    '-r': 30 // options with required values specify the value after the key
  }
})