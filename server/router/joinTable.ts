import { Request, Response } from 'express';
import { z } from 'zod';
import ConnectDataBase from '../DB/mysql_connection';
const express = require('express');
const router = express.Router();

const connectDataBase = new ConnectDataBase('easytiger_db');

router.post('/joinTable', async (req: Request, res: Response, next: Function) => {
  // TODO - add "is logged in" verification

  const joinSchema = z.object({
    band: z.string(),
    event: z.string(),
  });

  const result = joinSchema.safeParse(req.body);

  if (!result.success) return res.send(result.error);

  try {
    await connectDataBase.sendPreparedPoolQueries([
      'INSERT INTO evenement_has_band (evenement_idevenement, band_idband) VALUES(?, ?)',
      [req.body.event, req.body.band],
    ]);

    return res.status(200);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
