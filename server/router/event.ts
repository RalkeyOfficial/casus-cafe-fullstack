import { Request, Response } from 'express';
import ConnectDataBase from '../DB/mysql_connection';
const express = require('express');
const router = express.Router();

const connectDataBase = new ConnectDataBase('easytiger_db');

router.post('/event', async (req: Request, res: Response, next: Function) => {
  console.log(req);

  try {
    const fesults = await connectDataBase.sendExecuteQuery('show tables');
    return res.send(fesults);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
