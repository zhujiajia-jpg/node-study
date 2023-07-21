const express = require('express')
const {getUserInfo} = require('../router_handler/userInfo')

const router = express.Router()

router.get("/userInfo", getUserInfo)

module.exports = router