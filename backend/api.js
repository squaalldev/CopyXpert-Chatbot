const express = require('express');
const router = express.Router();
const { chat } = require('./config');
const pool = require('./db');

router.post('/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    res.json({ text: response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
