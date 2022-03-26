const express = require('express')
const router = express.Router()

const tipsHandler = require('../router_handler/tips')

router.get('/getTip',tipsHandler.getTip)

module.exports =router