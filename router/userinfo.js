// 用户基本信息
const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')

const userinfo_handler = require('../router_handler/userinfo')
// 导入需要的验证规则对象
const { update_password_schema } = require('../schema/user')

// 获取用户的基本信息
router.get('/userinfo', userinfo_handler.getUserInfo)

// 修改密码
router.post('/updatePwd', expressJoi(update_password_schema), userinfo_handler.updatePassword)

// 收藏民宿
router.get('/collectHomestay', userinfo_handler.collectHomestay)

// 取消收藏
router.get('/cancelCollect', userinfo_handler.cancelCollect)

// 查看是否收藏
router.get('/watchCollect', userinfo_handler.watchCollect)

// 查看用户的收藏列表
router.get('/getMyAllCollect', userinfo_handler.getMyAllCollect)

module.exports = router