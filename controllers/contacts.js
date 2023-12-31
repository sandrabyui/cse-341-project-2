const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAllContacts = async (req, res) => {
    //#swagger.tags=["Contacts"]
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((contact) => {
       res.setHeader("Content-Type", "application/json");
       res.status(200).json(contact);
    });
}


const getSingleContact = async (req, res) => {
    //#swagger.tags=['Users]
    const contactId =new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('contacts').find({_id: contactId});
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type','application/json');
        res.status(200).json(contacts[0]);
    });
  
};

const createContact = async (req, res) => {
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        birthdate: req.body.birthdate,
        email: req.body.email
    };
    try {
        const response = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);
        res.status(201).json(response.ops[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateContact = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    const updatedContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        birthdate: req.body.birthdate,
        email: req.body.email
    };
    try {
        const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({ _id: contactId }, updatedContact);
        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Contact updated successfully.' });
        } else {
            res.status(404).json({ message: 'Contact not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteContact = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: contactId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Contact not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllContacts,
    getSingleContact,
    createContact,
    updateContact,
    deleteContact
};
