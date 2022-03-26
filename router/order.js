const express = require('express')
const router = express.Router()

const orderHandler = require('../router_handler/order')

router.post('/postOrder', orderHandler.postOrder)
router.get('/getOrder', orderHandler.getOrder)

// 更改状态 to 2 退订
router.get('/orderStatus2', orderHandler.orderStatus2)

module.exports = router