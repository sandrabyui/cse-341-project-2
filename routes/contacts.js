const express =require('express');
const router =express.Router();

const contactsController =require('../controllers/contacts');

router.get('/', contactsController.getALL);

router.get('/:id', contactsController.getSingle);

router.post('/', contactsController.createContacts);

router.put('/', contactsController.updateContacts);

router.delete('/', contactsController.deleteContacts);


module.exports = router;
