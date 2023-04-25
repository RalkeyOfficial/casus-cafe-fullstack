import { Request, Response } from 'express';
import { z } from 'zod';
import ConnectDataBase from '../DB/mysql_connection';
const express = require('express');
const router = express.Router();

const connectDataBase = new ConnectDataBase('easytiger_db');

router.post('/event', async (req: Request, res: Response, next: Function) => {
  // TODO - add "is logged in" verification

  const eventSchema = z.object({
    name: z.string(),
    price: z.string().regex(/^(([1-9]\d*)|0)?\.\d{1,2}$/),
    time: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/),
    date: z.string().regex(/^(19[0-9]{2}|[2-3][0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/),
  });

  const result = eventSchema.safeParse(req.body);

  if (!result.success) return res.send(result.error);

  try {
    const results = await connectDataBase.sendPreparedQuery(
      'INSERT INTO evenement (naam, datum, aanvangstijd, entree_kosten) VALUES (?, ?, ?, ?)',
      [result.data.name, result.data.date, result.data.time, result.data.price]
    );
    return res.send(results);
  } catch (error) {
    return next(error);
  }
});

router.get('/event', async (req: Request, res: Response, next: Function) => {
  try {
    const results = await connectDataBase.sendPreparedQuery(`
		SELECT 
			*, 
			evenement.naam, 
			band.naam AS band_naam 
		FROM evenement 
		INNER JOIN evenement_has_band
			ON evenement.idevenement = evenement_has_band.evenement_idevenement
		INNER JOIN band
			ON evenement_has_band.band_idband = band.idband
	`);

    return res.json(results);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
