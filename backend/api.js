const express = require('express');
const { model, SYSTEM_PROMPT } = require('./config');

const router = express.Router();

router.post('/generate', async (req, res) => {
  try {
    const { prompt, file } = req.body;
    const fullPrompt = `${SYSTEM_PROMPT}\n\nUsuario: ${prompt}\n\nAsistente:`;
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    res.json({ text: response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
