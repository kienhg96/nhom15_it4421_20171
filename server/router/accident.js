// Path "/api"
const { Router } = require('express');
const accident = require(`${r}/controller/api/accident`);
const router = Router();

router.get('/locations', accident.locations);
router.get('/cities', accident.statisticByCity);

module.exports = router;
