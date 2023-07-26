const onvif = require('onvif');

function getOnvifCameras() {
  return new Promise((resolve, reject) => {
    try {
      // Discover devices on the network
      onvif.Discovery.probe((err, result) => {
        if (err) {
          reject(err);
        } else {
          const cameras = result.map(device => ({
            hostname: device.xaddrs[0],
            types: device.types,
            scopes: device.scopes
          }));
          resolve(cameras);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

async function main() {
  try {
    const cameras = await getOnvifCameras();

    if (cameras.length === 0) {
      console.log('No ONVIF cameras found on the network.');
      return;
    }

    console.log('Discovered ONVIF Cameras, NVRs, and DVRs:');
    cameras.forEach((camera, index) => {
        console.log(camera)
    //   console.log(`${index + 1}. Hostname: ${camera.hostname}`);
    //   console.log('   Types:', camera.types);
    //   console.log('   Scopes:', camera.scopes);
    //   console.log();
    });
  } catch (error) {
    console.error('Error occurred while discovering devices:', error);
  }
}

main();
