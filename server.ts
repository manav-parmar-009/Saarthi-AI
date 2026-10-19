import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { handleGeminiApi } from './server/geminiHandler';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Gemini Server-side Proxy
app.use('/api/gemini', (req, res) => {
  handleGeminiApi(req, res);
});

// Serve Vite production build assets
const distPath = path.resolve(__dirname, 'dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Saarthi AI server running on http://0.0.0.0:${PORT}`);
});
