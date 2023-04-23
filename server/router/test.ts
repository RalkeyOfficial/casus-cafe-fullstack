import { Request, Response } from 'express';
import ConnectDataBase from '../DB/mysql_connection';
const express = require('express');
const router = express.Router();

const connectDataBase = new ConnectDataBase('easytiger_db');

router.get('/test', async (req: Request, res: Response, next: Function) => {
  try {
    const [rows, fields] = await connectDataBase.sendExecuteQuery('show tables', []);
    return res.send(rows);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
