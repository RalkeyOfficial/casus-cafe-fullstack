import { Request, Response } from 'express';
import { z } from 'zod';
import ConnectDataBase from '../DB/mysql_connection';
const express = require('express');
const router = express.Router();

const connectDataBase = new ConnectDataBase('easytiger_db');

router.post('/genre', async (req: Request, res: Response, next: Function) => {
  // TODO - add "is logged in" verification

  const bandSchema = z.object({
    name: z.string(),
  });

  const verifiedBody = bandSchema.safeParse(req.body);

  if (!verifiedBody.success) return res.send(verifiedBody.error);

  try {
    const results = await connectDataBase.sendPreparedQuery('INSERT INTO genre (naam) VALUES (?)', [
      verifiedBody.data.name,
    ]);

    return res.send(verifiedBody.data.name);
  } catch (error) {
    return next(error);
  }
});

router.get('/genre', async (req: Request, res: Response, next: Function) => {
  try {
    const results = await connectDataBase.sendPreparedQuery('SELECT * FROM genre');

    const _results: string[] = [];
    results.map((result: any) => {
      _results.push(result.naam);
    });

    return res.json(_results);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
