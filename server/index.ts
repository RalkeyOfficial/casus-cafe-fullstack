import { Request, Response } from 'express';

// @ts-ignore
const express = require('express');
const app = express();
const port = process.env.SERVER_PORT || 3001;

const routes = require('./routes');

require('dotenv').config();

app.use('/*', function (req: Request, res: Response, next: Function) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  );
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', routes);

app.get('/', (req: Request, res: Response) => {
  res.send('api usage starts with /api/');
});

app.listen(port, (err?: unknown) => {
  if (err) throw err;
  console.log(`[server] Ready on http://localhost:3001`);
});
