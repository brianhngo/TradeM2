const express = require('express');
const router = express.Router();

//assuming auth middleware path const auth = require('../../src/Forms');
//still need to update

router.get('/:id', async (req, res) => {
  //check if logged in user's id matches req.params.id
  //if not 403 forbidden
  //other, fetch userdata from database and response sent
});

router.patch('/:id', async (req, res) => {
  //check if logged in user's id matches req.params.id
  //if not 403 forbidden
  //other, update user profile img in database and send reponse
});

module.exports = router;
