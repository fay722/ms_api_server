const express = require('express')
const router = express.Router()

const homestaysHandler = require('../router_handler/homestays')

// 首页 获取民宿信息
router.get('/homestays', homestaysHandler.getHomestays)

// 获取民宿详细信息
router.get('/homestays/details', homestaysHandler.getDetails)

// 根据城市获取民宿
router.get('/cityHomestays/', homestaysHandler.getCityHomestays)

// 查询 
router.get('/searchHomestay', homestaysHandler.getSearchHomestay)

// 更改民宿状态 0 为预定 1已预定
router.get('/editHomestayStatus', homestaysHandler.editHomestayStatus)
// 退订 更改状态为1
router.get('/editTuidingStatus',homestaysHandler.editTuidingStatus)


module.exports = router