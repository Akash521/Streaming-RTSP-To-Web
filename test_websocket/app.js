// const express = require('express');
// const http = require('http');
// const WebSocket = require('ws');
// const { spawn } = require('child_process');

// const app = express();
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

// // Serve static files from the "public" directory
// app.use(express.static('public'));

// // RTSP configuration
// const rtspStreamUrl = 'rtsp://192.168.1.197:8554/live.sdp';
// const rtspStreamPort = 8888;

// // WebSocket server event handling
// wss.on('connection', (ws) => {
//   const ffmpegArgs = [
//     '-rtsp_transport',
//     'tcp',
//     '-i',
//     rtspStreamUrl,
//     '-c:v',
//     'libx264',
//     '-preset',
//     'ultrafast',
//     '-tune',
//     'zerolatency',
//     '-vf',
//     'format=yuv420p',
//     '-c:a',
//     'aac',
//     '-ar',
//     '44100',
//     '-f',
//     'flv',
//     'pipe:1',
//   ];

//   const ffmpegProcess = spawn('ffmpeg', ffmpegArgs);

//   // Pipe the FFmpeg output to the WebSocket client
//   ffmpegProcess.stdout.on('data', (data) => {
//     console.log(data)
//     ws.send(data);
//   });

//   // Handle WebSocket close event
//   ws.on('close', () => {
//     ffmpegProcess.kill();
//   });
// });

// // Start the server
// server.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

// const express = require('express');
// const http = require('http');
// const WebSocket = require('ws');
// const { spawn } = require('child_process');

// const app = express();
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

// // Serve static files from the "public" directory
// app.use(express.static('public'));

// // RTSP configuration
// const rtspStreamUrl = 'rtsp://192.168.1.197:8554/live.sdp';

// // WebSocket server event handling
// wss.on('connection', (ws) => {
//   const ffmpegArgs = [
//     '-rtsp_transport',
//     'tcp',
//     '-i',
//     rtspStreamUrl,
//     '-c:v',
//     'copy',
//     '-c:a',
//     'aac',
//     '-f',
//     'mpegts',
//     'pipe:1',
//   ];

//   const ffmpegProcess = spawn('ffmpeg', ffmpegArgs);

//   ffmpegProcess.stdout.on('data', (data) => {
//     ws.send(data);
//   });

//   ffmpegProcess.stderr.on('data', (data) => {
//     console.error('FFmpeg error:', data.toString());
//   });

//   // Handle WebSocket close event
//   ws.on('close', () => {
//     ffmpegProcess.kill();
//   });
// });

// // Start the server
// server.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

// const express = require('express');
// const http = require('http');
// const WebSocket = require('ws');
// const { spawn } = require('child_process');

// const app = express();
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

// // Serve static files from the "public" directory
// app.use(express.static('public'));

// // RTSP configuration
// const rtspStreamUrl = 'rtsp://192.168.1.197:8554/live.sdp';

// // WebSocket server event handling
// wss.on('connection', (ws) => {
//   const ffmpegArgs = [
//     '-rtsp_transport',
//     'tcp',
//     '-i',
//     rtspStreamUrl,
//     '-c:v',
//     'copy',
//     '-an',
//     '-f',
//     'mpegts',
//     'pipe:1',
//   ];

//   const ffmpegProcess = spawn('ffmpeg', ffmpegArgs);

//   ffmpegProcess.stdout.on('data', (data) => {
//     ws.send(data);
//   });

//   ffmpegProcess.stderr.on('data', (data) => {
//     console.error('FFmpeg error:', data.toString());
//   });

//   // Handle WebSocket close event
//   ws.on('close', () => {
//     ffmpegProcess.kill();
//   });
// });

// // Start the server
// server.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { spawn } = require('child_process');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static files from the "public" directory
app.use(express.static('public'));

// RTSP configuration
const rtspStreamUrl = 'rtsp://192.168.1.197:8554/live.sdp';

// WebSocket server event handling
wss.on('connection', (ws) => {
  const ffmpegArgs = [
    '-rtsp_transport',
    'tcp',
    '-i',
    rtspStreamUrl,
    '-f',
    'mpegts',
    '-codec:v',
    'mpeg1video',
    '-s',
    '640x480',
    '-b:v',
    '1000k'
    // '-c:v',
    // 'copy',
    // '-copyts',
    // '-start_at_zero',
    // '-vsync',
    // '2',
    // '-an',
    // '-f',
    // 'mpegts',
    // 'pipe:1',
  ];

//   -f mpegts  -codec:v mpeg1video -s 640x480 -b:v 1000k -bf 0

  const ffmpegProcess = spawn('ffmpeg', ffmpegArgs);

  ffmpegProcess.stdout.on('data', (data) => {
    ws.send(data);
  });

  ffmpegProcess.stderr.on('data', (data) => {
    console.error('FFmpeg error:', data.toString());
  });

  // Handle WebSocket close event
  ws.on('close', () => {
    ffmpegProcess.kill();
  });
});

// Start the server
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});


