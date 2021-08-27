import express from 'express';
import {config} from 'dotenv';
import path from 'path';
import fs from 'fs';
import sgMail, {MailDataRequired} from '@sendgrid/mail';
config();

sgMail.setApiKey(process.env.SENGRID_API!);

import emailRouter from './email/email.controller';

const PORT = process.env.PORT || 5000;

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  const msg: MailDataRequired = {
    to: 'hanktheiii1337@gmail.com',
    from: 'josealvarado1337@gmail.com',
    subject: 'test',
    text: 'Hello world',
    html: fs.readFileSync(
      path.join(__dirname, '..', 'public', 'index.html'),
      'utf-8'
    ),
    dynamicTemplateData: {},
  };
  sgMail.send(msg);
  res.json('Message sent');
});

server.use('/email', emailRouter);

server.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});
