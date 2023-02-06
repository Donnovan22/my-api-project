const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('books').find();
    result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
  } catch (error) {
    res.status(500).json(error);
  }
  
};

const getSingle = async (req, res) => {
  try {
    const bookId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('books').find({ _id: bookId });
    result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
  } catch (error) {
    res.status(500).json(error);
  }
  
};

const addBook = async (req, res) => {
  try {
    const book = {
      title: req.body.title,
      author: req.body.author,
      releaseDay: req.body.releaseDay,
      genre: req.body.genre
    };
    const response = await mongodb.getDb().db().collection('books').insertOne(book);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while adding the book.');
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateBook = async (req, res) => {
  try {
    const bookId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const book = {
    title: req.body.title,
    author: req.body.author,
    releaseDay: req.body.releaseDay,
    genre: req.body.genre
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('books')
    .replaceOne({ _id: bookId }, book);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(200).send({
      message: 'Book updated'
    });;
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the book.');
  }
  } catch (error) {
    res.status(500).json(error);
  }
};


const deleteBook = async (req, res) => {
  try {
    const bookId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection('books')
      .deleteOne({ _id: bookId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).send({
        message: 'Book deleted'
      });
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the Book.');
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getAll, getSingle, addBook, updateBook, deleteBook };
