import fs from 'fs';

const initIfFileIfMissing = (path, initialStructure) => {
  if (!fs.existsSync(path)) {
    const json = JSON.stringify(initialStructure);
    fs.writeFile(path, json, 'utf8', (err, data) => {
      if (err) {
        return;
      } else {
        return;
      }
    });
  }
};

export default initIfFileIfMissing;
