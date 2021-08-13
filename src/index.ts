import express from 'express';
import {config} from 'dotenv';

config();

import emailRouter from './email/email.controller';
import QuickChart from 'quickchart-js';

const PORT = process.env.PORT || 5000;

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
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
  const test = {
    type: 'line',
    data,
    options: {},
  };
  const myChart = new QuickChart();
  myChart
    .setConfig(test)
    .setWidth(800)
    .setHeight(400)
    .setBackgroundColor('transparent');

  res.send(myChart.getUrl());
});

server.use('/email', emailRouter);

server.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});
