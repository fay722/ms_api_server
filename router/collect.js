const express = require('express')
const router = express.Router()

const collectHandler = require('../router_handler/collect')

// 获取收藏数量
router.get('/getCollectNum', collectHandler.getCollectNum)


// 获取民宿收藏的用户情况
router.get('/getCollectUser', collectHandler.getCollectUser)

module.exports = router