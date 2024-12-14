const fs = require('fs');
const icoHashChange = (path) => {
  try {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, data) => {
        if (err) throw err;
        let hexString = data.toString('hex');
        let newFlag = `0${new Date().getTime().toString(16)}`;
        let newHexString = hexString.slice(0, 112) + newFlag + hexString.slice(124);
        let buffer = Buffer.from(newHexString, 'hex');
        fs.writeFile(path, buffer, (err) => {
          if (err) throw err;
          console.log('favicon.ico has been updated');
          resolve();
        });
      });
    });
  } catch (error) {
    console.log('Error reading file:', error);
  }
};

class FaviconHashChangePlugin {
  constructor(faviconPath = './public/favicon.ico') {
    this.faviconPath = faviconPath;
  }
  apply(compiler) {
    compiler.hooks.shouldEmit.tap('FaviconHashChangePlugin', (emit, callback) => {
      icoHashChange(this.faviconPath).then(() => {
        callback && callback();
      });
    });
  }
}

module.exports = FaviconHashChangePlugin;
