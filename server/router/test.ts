import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();

router.get('/hello', (req: Request, res: Response) => {
  return res.send('world');
});

module.exports = router;
