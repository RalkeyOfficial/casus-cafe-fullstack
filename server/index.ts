import { Request, Response } from 'express';
// @ts-ignore
const express = require('express');
const app = express();
const port = process.env.SERVER_PORT || 3001;

const routes = require('./routes');

require('dotenv').config();

app.use('/api', routes);

app.get('/', (req: Request, res: Response) => {
  res.send('api usage starts with /api/');
});

app.listen(port, (err?: unknown) => {
  if (err) throw err;
  console.log(`[server] Ready on http://localhost:3001`);
});
