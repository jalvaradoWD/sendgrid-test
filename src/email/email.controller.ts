import {Router} from 'express';
import {config} from 'dotenv';
import sgMail from '@sendgrid/mail';
import fs from 'fs';
import path from 'path';
import QuickChart from 'quickchart-js';
config();

const router = Router();

router.get('/', async (req, res) => {
  try {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June'];
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [0, 10, 5, 2, 20, 30, 45],
        },
      ],
    };
    const config = {
      type: 'line',
      data,
      options: {},
    };
    const myChart = new QuickChart();
    myChart
      .setConfig(config)
      .setWidth(800)
      .setHeight(400)
      .setBackgroundColor('transparent');

    const htmlFile = fs.readFileSync(
      path.join(__dirname, './something.html'),
      'utf-8'
    );

    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
    const sentMessage = await sgMail.send({
      from: 'josealvarado1337@gmail.com',
      to: 'jalvarado1337@lavabit.com',
      templateId: 'd-89440f5bc55a41ee891a26c6836675c9',
      subject: 'Test Email',
      dynamicTemplateData: {
        quickChartUrl: myChart.getUrl(),
      },
    });
    return res.json(sentMessage);
  } catch (error) {
    console.error(error);
    return res.json(error);
  }
});

export default router;
