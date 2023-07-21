const express = require('express')
//处理器
const calendarHandler = require('../router_handler/calendar')

const router = express.Router()

router.get("/get",calendarHandler.calendar)

module.exports = router