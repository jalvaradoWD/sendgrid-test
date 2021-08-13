import express from 'express';

import emailRouter from './email/email.controller';

const PORT = 5000;

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send('Hello world');
});

server.use('/email', emailRouter);

server.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});
