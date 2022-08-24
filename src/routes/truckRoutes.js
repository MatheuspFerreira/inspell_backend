const express = require('express');
const truckController = require("../controllers/truckController");
const router = express.Router();

router 
    .get('/', truckController.getAll)
    .get('/getone/:id', truckController.getOne)
    .post('/create', truckController.create)
    .put('/update/:id', truckController.update)
    .delete('/delete/:id', truckController.delete)


    module.exports = router;