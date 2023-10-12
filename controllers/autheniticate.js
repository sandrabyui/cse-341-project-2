
const express = require("express");
const router = express.Router();
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAuthors = async (req, res) => {
    //#swagger.tags=["Authors"]
    const result = await mongodb.getDatabase().db().collection("authors").find();
    result.toArray().then((authors) => {
       res.setHeader("Content-Type", "application/json");
       res.status(200).json(authors);
    });
}

const getAuthor = async (req, res) => {
    //#swagger.tags=["Authors"]
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("authors").find({_id: userId});
    result.toArray().then((authors) => {
        if (authors.length > 0) {
            const author = authors[0];
            res.status(200).json({ author });
        } else {
            res.status(404).json("Author not found");
        }
    });
};


const createAuthor = async (req, res) => {
    //#swagger.tags=["Author"]
    const author = {
        name: req.body.name,
        birthYear: parseInt(req.body.birthYear),
        nationality: req.body.nationality,
        publishedBooks: req.body.publishedBooks
    };
    const response = await mongodb.getDatabase().db().collection("authors").insertOne(author);
    if (response.acknowledged > 0) {
        res.status(204).send();
     } else {
        res.status(500).json(response.error || "Some error occurred while updating the author.");
    }
};

const updateAuthor = async (req, res) => {
    //#swagger.tags=["Authors"]
    const userId = new ObjectId(req.params.id);
    const author = {
        name: req.body.name,
        birthYear: parseInt(req.body.birthYear),
        nationality: req.body.nationality,
        publishedBooks: req.body.publishedBooks

    };

    const response = await mongodb.getDatabase().db().collection("authors").replaceOne({ _id: userId } ,author);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Some error occurred while updating the author.");
        };
}  

const deleteAuthor = async (req, res) => {
    //#swagger.tags=["Authors"]
    try {
      const userId = new ObjectId(req.params.id);
      console.log("Deleting author with ID:", userId); // line for debugging
      const response = await mongodb.getDatabase().db().collection("authors").deleteOne({ _id: userId });
  
      if (response.deletedCount > 0) {
        res.status(204).send();
      } else {
        res.status(404).json("author not found");
      }
    } catch (error) {
      console.error("Error deleting author:", error);
      res.status(500).json("Some error occurred while deleting the author.");
    }
  };
  


module.exports = {
    getAuthors,
    getAuthor,
    createAuthor,
    updateAuthor,
    deleteAuthor,
};