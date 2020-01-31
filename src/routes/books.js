import fs from 'fs';
import path from 'path';
import uuid from 'uuid/v4';

import initIfFileIfMissing from '../utils/initIfFileMissing';



const getBooks = (req, res) => {
  // Pour activer cette route, commenter cette ligne et decommenté le reste
  res.status(200).send({ message: 'route non activé' });

  // const pathBooks = path.join(__dirname, '../data/books.json');
  // fs.readFile(pathBooks, 'utf8', (err, data) => {
  //   if (err) {
  //     console.log(err);
  //     res.status(400).send({ message: 'error fetching books' });
  //   } else {
  //     console.log(data);
  //     res.status(200).send(JSON.parse(data));
  //   }
  // });
};

/*
 * POST /book to save a new book.
 */

const initialStructure = {
  books: []
};

const postBook = (req, res) => {
  // Pour activer cette route, commenter cette ligne et decommenté le reste
  res.status(200).send({ message: 'route non activé' });

  // const pathBooks = path.join(__dirname, '../data/books.json');
  // initIfFileIfMissing(pathBooks, initialStructure);
  // fs.readFile(pathBooks, 'utf8', (err, data) => {
  //   if (err) {
  //     console.log(err);
  //     res.status(400).send({ message: 'an Error occured' });
  //   } else {
  //     console.log(data);
  //     let obj;
  //     if (!data) {
  //       obj = obj = { books: [] };
  //     } else {
  //       obj = JSON.parse(data); //now it an object
  //     }
  //     if (!obj || !obj.books) obj = { books: [] };
  //     obj.books.push({
  //       id: uuid(),
  //       title: req.body.title,
  //       years: req.body.years,
  //       pages: req.body.pages
  //     }); //add some data
  //     const json = JSON.stringify(obj); //convert it back to json
  //     fs.writeFile(pathBooks, json, 'utf8', (err, data) => {
  //       if (err) {
  //         res.status(400).send({ message: 'error adding the book' });
  //       } else {
  //         res.status(200).send({ message: 'book successfully added' });
  //       }
  //     });
  //   }
  // });
};

/*
 * GET /book/:id route to retrieve a book given its id.
 */
const getBook = (req, res) => {
  // Pour activer cette route, commenter cette ligne et decommenté le reste
  res.status(200).send({ message: 'route non activé' });

  // const pathBooks = path.join(__dirname, '../data/books.json');
  // fs.readFile(pathBooks, 'utf8', (err, data) => {
  //   if (err) {
  //     console.log(err);
  //     res.status(400).send({ message: 'an Error occured' });
  //   } else {
  //     let obj = JSON.parse(data); //now it an object
  //     const book = obj.books.find(element => {
  //       if (element.id === req.params.id) return element;
  //     });
  //     if (!book) {
  //       return res.status(400).send({ message: 'book does not exist' });
  //     }
  //     console.log(req.params.id);
  //     console.log(book);
  //     res.status(200).send({ message: 'book fetched', book });
  //   }
  // });
};

/*
 * DELETE /book/:id to delete a book given its id.
 */
const deleteBook = (req, res) => {
  // Pour activer cette route, commenter cette ligne et decommenté le reste
  res.status(200).send({ message: 'route non activé' });

  // const pathBooks = path.join(__dirname, '../data/books.json');
  // fs.readFile(pathBooks, 'utf8', (err, data) => {
  //   if (err) {
  //     console.log(err);
  //     res.status(400).send({ message: 'an Error occured' });
  //   } else {
  //     let obj = JSON.parse(data); //now it an object
  //     const bookIndex = obj.books.findIndex(element => {
  //       if (element.id === req.params.id) {
  //         return element;
  //       }
  //     });
  //     console.log(bookIndex);
  //     if (bookIndex === -1) {
  //       return res.status(400).send({ message: 'book does not exist' });
  //     }
  //     obj.books.splice(bookIndex, 1);
  //     const json = JSON.stringify(obj);
  //     fs.writeFile(pathBooks, json, 'utf8', (err, data) => {
  //       if (err) {
  //         return res.status(400).send({ message: 'error deleting the book' });
  //       } else {
  //         return res.status(200).send({ message: 'book successfully deleted' });
  //       }
  //     });
  //   }
  // });
};

/*
 * PUT /book/:id to updatea a book given its id
 */
const updateBook = (req, res) => {
  // Pour activer cette route, commenter cette ligne et decommenté le reste
  res.status(200).send({ message: 'route non activé' });

  // const pathBooks = path.join(__dirname, '../data/books.json');
  // fs.readFile(pathBooks, 'utf8', (err, data) => {
  //   if (err) {
  //     console.log(err);
  //     res.status(400).send({ message: 'an Error occured' });
  //   } else {
  //     let obj = JSON.parse(data); //now it an object
  //     const bookIndex = obj.books.findIndex(element => {
  //       if (element.id === req.params.id) {
  //         return element;
  //       }
  //     });
  //     console.log(bookIndex);
  //     if (bookIndex === -1) {
  //       return res.status(400).send({ message: 'book does not exist' });
  //     }
  //     obj.books.splice(bookIndex, 1, {
  //       ...obj.books[bookIndex],
  //       title: req.body.title,
  //       years: req.body.years,
  //       pages: req.body.pages
  //     });
  //     const json = JSON.stringify(obj);
  //     fs.writeFile(pathBooks, json, 'utf8', (err, data) => {
  //       if (err) {
  //         return res.status(400).send({ message: 'error updating the book' });
  //       } else {
  //         return res.status(200).send({ message: 'book successfully updated' });
  //       }
  //     });
  //   }
  // });
};

//export all the functions
export default { getBooks, postBook, getBook, deleteBook, updateBook };
