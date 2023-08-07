const WebSocket = require('ws');
const { spawn } = require('child_process');
const wss = new WebSocket.Server({ port: 8001 });

let clients = [];
let ffmpegProcess;

wss.on('connection', (ws) => {
  clients.push(ws);
  console.log('WebSocket connected');

  ws.on('message', (message) => {
    // Handle incoming messages from the client (if needed)
  });

  ws.on('close', () => {
    clients = clients.filter((client) => client !== ws);
    console.log('WebSocket disconnected');
  });

  if (!ffmpegProcess) {
    const ffmpegArgs = [
      '-i', 'pipe:0',
      '-c:v', 'libvpx',
      '-pix_fmt', 'yuv420p',
      '-deadline', 'realtime',
      '-cpu-used', '5',
      '-b:v', '1M',
      '-bufsize', '1M',
      '-f', 'webm',
      '-content_type', 'video/webm',
      '-'
    ];

    ffmpegProcess = spawn('ffmpeg', ffmpegArgs);

    ffmpegProcess.stdout.on('data', (data) => {
      broadcast(data);
    });

    ffmpegProcess.stderr.on('data', (data) => {
      console.error('FFmpeg error:', data.toString());
    });

    ffmpegProcess.on('close', (code) => {
      console.log('FFmpeg process exited with code', code);
      ffmpegProcess = null;
    });

    ffmpegProcess.on('error', (error) => {
      console.error('FFmpeg process error:', error.message);
      ffmpegProcess.kill();
      ffmpegProcess = null;
    });
  }
});

function broadcast(data) {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}
