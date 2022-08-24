const express = require('express');
const localidadeController = require("../controllers/localidadeController");
const router = express.Router();

router 
    .get('/', localidadeController.getAll)
    .post('/create', localidadeController.create)



    module.exports = router;