const mongodb = require('../data/database');
const ObjectId =require('mongodb').ObjectId;

const getALL = async (req, res) => {

    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((contacts) => {
       res.setHeader('Content-Type','application/json');
       res.status(200).json(contacts);
    });

};


const getSingle = async (req, res) => {
   
    const contactsId =new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('contacts').find({_id: contactsId});
     result.toArray().then((contacts) => {
        res.setHeader('Content-Type','application/json');
        res.status(200).json(contacts[0]);
   });
  
};



module.exports = {
    getALL,
    getSingle,
    

};