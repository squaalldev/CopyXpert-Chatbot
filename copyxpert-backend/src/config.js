require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not configured');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getModel('gemini-1.0-pro');

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200
};

module.exports = { model, corsOptions };
