// @ts-ignore
const express = require('express');
const router = express.Router();

const pluginDir = __dirname + '\\router\\';
const fs = require('fs');

fs.readdirSync(pluginDir).forEach((file: any) => {
  router.use('/', require(pluginDir + file));
});

module.exports = router;
