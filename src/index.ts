import express from 'express';

const PORT = 5000;

const server = express();

server.get('/', (req, res) => {
  res.send('Hello world');
});

server.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});
