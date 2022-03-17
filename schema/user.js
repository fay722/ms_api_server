// 用户信息验证模块
// 导入@hapi/joi（版本@17.1.0
const joi = require('joi')

/*
    * string() 值必须是字符串
    * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
    * min(length) 最小长度
    * max(length) 最大长度
    * required() 值是必填项，不能为 undefined
    * pattern(正则表达式) 值必须符合正则表达式的规则
*/

// 用户验证规则
const userName = joi.string().min(3).max(10).required()
// 密码验证规则
const userPassword = joi.string().pattern(/^[\S]{6,12}/).required()

// 注册和登录表单验证规则对象
exports.reg_login_schema = {
    // 需要对req.body中的数据进行验证
    body: {
        userName,
        userPassword
    }
}

