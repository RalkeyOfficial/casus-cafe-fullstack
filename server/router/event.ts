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
  // fuck fuck fuck fuck fuck

  try {
    const results = await connectDataBase.sendPreparedQuery(`
		SELECT 
			*, 
			evenement.naam, 
			evenement.idevenement AS id,
			band.naam AS band_naam,
			genre.naam AS genre_naam 
		FROM evenement 
		
		LEFT JOIN evenement_has_band
			ON evenement.idevenement = evenement_has_band.evenement_idevenement
		LEFT JOIN band
			ON evenement_has_band.band_idband = band.idband

		LEFT JOIN band_has_genre
			ON band.idband = band_has_genre.band_idband
		LEFT JOIN genre
			ON band_has_genre.genre_naam = genre.naam
	`);

    // format results in a way that makes sorta sense
    /*
      {
        ...rest of the results,
        bands: [
          {
            band: "band name",
            genre: "genre name"
          },
          {
            band: "band name",
            genre: "genre name"
          }
        ]
      }
	*/
    const _results = results.map((result: any) => {
      const newResult = {
        ...result,
        bands: results
          .filter(({ id }: any) => id === result.id)
          .map((result: any) => {
            if (!result.band_naam) return;
            return { band: result.band_naam, genre: result.genre_naam };
          }),
      };

      delete newResult.genre_naam;
      delete newResult.band_naam;
      delete newResult.idevenement;

      return newResult;
    });

    // filter duplicate objects with same ID
    const ids = _results.map((result: any) => result.id);
    const _resultsFiltered = _results.filter(
      ({ id }: any, index: any) => !ids.includes(id, index + 1)
    );

    return res.json(_resultsFiltered);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
