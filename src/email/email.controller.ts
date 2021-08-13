import {Router} from 'express';
import {config} from 'dotenv';
import sgMail from '@sendgrid/mail';
import fs from 'fs';
import path from 'path';
config();

const router = Router();

router.get('/', async (req, res) => {
  try {
    const htmlFile = fs.readFileSync(
      path.join(__dirname, './something.html'),
      'utf-8'
    );
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
    const sentMessage = await sgMail.send({
      from: 'josealvarado1337@gmail.com',
      to: 'jalvarado1337@lavabit.com',
      html: htmlFile,
      subject: 'Test Email',
    });
    return res.json(sentMessage);
  } catch (error) {
    console.error(error);
    return res.json(error);
  }
});

export default router;
