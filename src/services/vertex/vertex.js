const { spawn } = require('child_process');
const path = require('path');
const ServerError = require('../../exceptions/ServerError');

// base path

const vertex = async (imgUrl) => 
   new Promise((resolve, reject) => {
    const pythonPath = path.resolve(__dirname, 'main.py');

    const python = spawn('python', [pythonPath, imgUrl]);

    let result = '';

    python.stdout.on('data', (data) => {
      // console.log(`stdout: ${data}`);
      result = data.toString();
    });

    python.stderr.on('data', (data) => {
      // console.error(`stderr: ${data}`);
      reject(new ServerError(data.toString()));
    });

    python.on('close', (code) => {
      if (code === 0) {
        resolve({
          result: result.split(',')[0],
          percentage: parseFloat(result.split(',')[1].replace('\n', '').replace('\r', '')),
        });
      } else {
        reject(new ServerError(`Python process exited with code ${code}`));
      }
    });
  })

  // const pythonPath = path.resolve(__dirname, 'main.py');

  // let result = '';

  // const python = spawn('python', [pythonPath, imgUrl]);

  // python.stdout.on('data', (data) => {
  //   console.log(`stdout: ${data}`);
  //   result = data.toString();
  // });

  // python.stderr.on('data', (data) => {
  //   console.error(`stderr: ${data}`);
  // });

  // python.on('close', (code) => {
  //   if (code === 0) {
  //     resolve(result);
  //   } else {
  //     reject(new Error(`Python process exited with code ${code}`));
  //   }
  // });
;

module.exports = vertex;
