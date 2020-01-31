import fs from 'fs';

const resetDatabase = (path, initialStructure) => {
  const json = JSON.stringify(initialStructure);
  fs.writeFile(path, json, 'utf8', (err, data) => {
    if (err) {
      return;
      //   res.status(400).send({ message: 'error adding the book' });
    } else {
      return;
      //   res.status(200).send({ message: 'book succesfully added' });
    }
  });
};

export default resetDatabase;
