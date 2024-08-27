var express = require('express');
var router = express.Router();

const route_V1 = require('./v1/routes.mhs')

router.use('/v1', route_V1)

module.exports = router;
