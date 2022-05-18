const fs = require('fs');

module.exports = (path) => {
  // cek file
  if (fs.existsSync(path)) {
    // delete file
    fs.unlinkSync(path);
  }
};
