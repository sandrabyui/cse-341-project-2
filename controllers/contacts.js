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
   
    const contactId =new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('contacts').find({_id: contactId});
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type','application/json');
        res.status(200).json(contacts[0]);
   });
  
};

const createContacts =async (req,res) =>{
    const contact = {
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        address:req.body.address,
        birthdate:req.body.birthday,
        email:req.body.email

    };
    const response = await mongodb.getDatabase().db().collection(contact).insertOne(contact);
    if (response.acknowledge) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error ||'Some error occurred while updating the contacts.');  
    }

};

const updateContacts =async (req,res) =>{

    const contactId = new ObjectId(req.params.id);
    const contact ={
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        address:req.body.address,
        birthdate:req.body.birthday,
        email:req.body.email
      };
      const response =await mongodb.getDatabase().db().collection('contacts.js').repaceOne({_id: contactId},contact);
      if (response.modifiedCount > 0){
        res.status(204).send();
      } else {
        res.status(500).json(response.error ||'Some error occurred while updating the contacts.');

      }
    
    };

    const deleteContacts =async (req,res) => {
        const contactId = new ObjectId(req.params._id);
        const response = await mongodb.getDatabase().db().collection('contacts').deletOne({_id: contactId},);
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the contacts.')
        }
    };


module.exports = {
    getALL,
    getSingle,
    createContacts,
    updateContacts,
    deleteContacts
    

};