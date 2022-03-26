const express = require('express')
const router = express.Router()

const adminHandler = require('../router_handler/admin')

const expressJoi = require('@escook/express-joi')
const { reg_login_schema } = require('../schema/user')
// 验证权限
router.get('/getPermission', adminHandler.getPermission)

const pv = (req, res, next) => {
    // console.log(req.user)
    if (req.user.status === 1) {
        next()
    } else {
        return res.cc('无权限')
    }
}

// 获取所有用户
router.get('/allUser', pv, adminHandler.getAllUser)

// 修改用户资料
router.post('/editUser', pv, adminHandler.editUser)

// 删除用户
router.get('/delUser', adminHandler.delUser)

// 搜索用户
router.get('/searchUser', adminHandler.searchUser)

// 上传民宿信息
router.post('/addHomestays', adminHandler.addHomestays)

// 删除民宿
router.get('/delHomestays', adminHandler.delHomestays)


// 获取所有攻略
router.get('/getAllTips', adminHandler.getAllTips)

// 添加攻略
router.post('/addTip', adminHandler.addTip)

// 删除攻略
router.get('/delTip', adminHandler.delTip)

// 修改攻略
router.post('/editTip', adminHandler.editTip)

// 搜索攻略
router.post('/searchTip', adminHandler.searchTip)

module.exports = router