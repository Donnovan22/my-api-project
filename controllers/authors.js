const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('authors').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Verify that it is a valid ID to find an author.');
    return;
  }
  try {
    const authorId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('authors').find({ _id: authorId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

const addAuthor = async (req, res) => {
  const author = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthday: req.body.birthday,
    nationality: req.body.nationality
  };
  const response = await mongodb.getDb().db().collection('authors').insertOne(author);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while adding the author.');
  }
};

const updateAuthor = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Verify that it is a valid ID to update an author.');
    return;
  }
  const authorId = new ObjectId(req.params.id);
  const author = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthday: req.body.birthday,
    nationality: req.body.nationality
  };
  const response = await mongodb.getDb().db().collection('authors').replaceOne({ _id: authorId }, author);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(200).send({
      message: 'Author updated'
    });;
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the author.');
  }
};

const deleteAuthor = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Verify that it is a valid ID to delete an author.');
    return;
  }
  const authorId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('authors').deleteOne({ _id: authorId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).send({
        message: 'Author deleted'
      });
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the Author.');
    }
};

module.exports = {
    getAll,
    getSingle,
    addAuthor,
    updateAuthor,
    deleteAuthor
};