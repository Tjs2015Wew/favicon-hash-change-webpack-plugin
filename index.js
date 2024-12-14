const fs = require('fs');
const icoHashChange = (path) => {
  try {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, data) => {
        if (err) throw err;
        let hexString = data.toString('hex');
        let flag = hexString.slice(116, 124);
        let num = parseInt(flag, 16);
        ++num;
        let newFlag = num.toString(16);
        if (newFlag.length != 8) {
          let arr = new Array(8 - newFlag.length).fill('0');
          newFlag = arr.join('') + newFlag;
        }
        let newHexString = hexString.slice(0, 116) + newFlag + hexString.slice(124);

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
