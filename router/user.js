// 用户路由模块
const express = require('express')
const router = express.Router()

// 导入用户路由处理函数模块
const userHandler = require('../router_handler/user')

// 1.导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2.导入需要的验证规则对象
const { reg_login_schema } = require('../schema/user')

// 注册新用户
// 在注册新用户的路由中 声明局部中间件 对当前请求中携带的数据进行验证
// 数据验证通过 会把这次请求流转给后面的路由处理函数
// 数据验证失败 终止后续代码 并抛出全局的Error错误 进入全局错误级别中间件进行处理
router.post('/register', expressJoi(reg_login_schema), userHandler.regUser)
// router.post('/register', userHandler.regUser)


// 登陆
router.post('/login', expressJoi(reg_login_schema), userHandler.login)


// 将路由对象共享出去
module.exports = router;