import { Request, Response } from 'express';
import { z } from 'zod';
import ConnectDataBase from '../DB/mysql_connection';
const express = require('express');
const router = express.Router();

const connectDataBase = new ConnectDataBase('easytiger_db');

router.post('/band', async (req: Request, res: Response, next: Function) => {
  // TODO - add "is logged in" verification

  const bandSchema = z.object({
    name: z.string(),
    genre: z.string(),
  });

  const result = bandSchema.safeParse(req.body);

  if (!result.success) return res.send(result.error);

  try {
    await connectDataBase.sendPreparedPoolQueries(
      ['INSERT INTO band (naam) VALUES (?)', [result.data.name]],
      ['SET @band_id = LAST_INSERT_ID()'],
      [
        'INSERT INTO band_has_genre (band_idband, genre_naam) VALUES(@band_id, ?)',
        [result.data.genre],
      ]
    );

    const newData = await connectDataBase.sendPreparedQuery(`SELECT * FROM band 
		RIGHT OUTER JOIN band_has_genre
		ON band.idband = band_has_genre.band_idband
	`);

    return res.json(newData);
  } catch (error) {
    return next(error);
  }
});

router.get('/band', async (req: Request, res: Response, next: Function) => {
  try {
    const results = await connectDataBase.sendPreparedQuery(`SELECT * FROM band 
		RIGHT OUTER JOIN band_has_genre
		ON band.idband = band_has_genre.band_idband
	`);

    return res.json(results);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
