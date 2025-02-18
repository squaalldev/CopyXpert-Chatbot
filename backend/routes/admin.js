const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
    res.json({success: true});
  } else {
    res.status(401).json({error: 'Invalid credentials'});
  }
});

module.exports = router;
