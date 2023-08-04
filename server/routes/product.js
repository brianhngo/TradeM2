const express = require('express');
const router = express.Router();

//assuming auth middleware path const auth = require('../../src/Forms');
//still need to update

router.get('/:userId', async (req, res) => {
  //check if logged in user's id matches req.params.id
  //if not 403 forbidden
  //other, fetch user's product from database and response sent
});

router.post('/:userId', async (req, res) => {
  //check if logged in user's id matches req.params.id
  //if not 403 forbidden
  //other, add new product to database and send reesponse
});

router.patch('/:id', async (req, res) => {
  //fetch product from database
  //check if logged in user's id matches req.params.id
  //if not 403 forbidden
  //other, update product in database and send response
});

router.delete('/:id', async (req, res) => {
  //fetch product from database
  //check if logged in user's id matches req.params.id
  //if not 403 forbidden
  //other, delete product from database and send response
});

module.exports = router;
