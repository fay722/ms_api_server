// 定义和用户相关的路由处理函数 供/router/user.js模块进行调用

// 导入数据库操作模块
const db = require('../db/index')

// 导入bcryptjs 对密码进行加密
const bcryptjs = require('bcryptjs')
// 用来生成Token字符串
const jwt = require('jsonwebtoken')
// 导入配置文件
const config = require('../config')

// 注册用户的处理函数
exports.regUser = (req, res) => {
    console.log(req.body);
    // 接受表单数据
    const userInfo = req.body
    console.log(userInfo);
    // 判断是否合法
    // if (!userInfo.userName || !userInfo.userPassword) {
    //     // return res.send({status: 1,message: '用户名或密码不能为空！'})
    //     return res.cc('用户名或密码不能为空！')
    // }
    //定义sql语句 判断用户名是否被占用
    const sql1 = 'select * from ms_users where userName=?'
    db.query(sql1, [userInfo.userName], (err, results) => {
        if (err) {
            // return res.send({status: '1',message: err.message})
            return res.cc(err)
        }
        // 用户名已被占用
        if (results.length > 0) {
            // return res.send({status: '1',message: '用户名已被占用' })
            return res.cc('用户名已被占用!')
        }
        // 用户名可用
        // 对用户名密码进行加密 调用bcrypt.hashSync(明文密码, 随机盐的长度)方法 
        userInfo.userPassword = bcryptjs.hashSync(userInfo.userPassword, 10)
        // console.log(userInfo.userPassword);
        // 插入新用户
        const sql2 = 'insert into ms_users set ?'
        db.query(sql2, { userName: userInfo.userName, tel: userInfo.tel, userPassword: userInfo.userPassword }, (err, results) => {
            if (err)
                // return res.send({status: '1',message: err.message})
                return res.cc(err)
            if (results.affectedRows !== 1)
                // return res.send({ status: '1', message: '注册用户失败！' })
                return res.cc('用户名已被占用')
            res.cc('注册成功！', 0)
        })
    })
}

// 登陆的处理函数
exports.login = (req, res) => {
    const userInfo = req.body
    const sql1 = 'select * from ms_users where userName = ?'
    db.query(sql1, userInfo.userName, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('登录失败')
        // 判断用户输入密码是否正确
        // 拿着用户输入密码和数据库中存储的密码进行对比
        const compareResult = bcryptjs.compareSync(userInfo.userPassword, results[0].userPassword)
        if (!compareResult) {
            return res.cc('密码错误，登陆失败！')
        }
        // 登陆成功
        // 剔除用户信息的密码
        const user = { ...results[0], userPassword: '' }
        const tokenStr = jwt.sign(user, config.jwtSecretKey, config.expiresIn)
        res.send({
            status: 0,
            message: '登陆成功',
            userStatus: results[0].status,
            token: 'Bearer ' + tokenStr,
        })
    })
}

// exports.getPermission = (req, res) => {
//     console.log(req.user.token)
// }

// 收藏数
exports.getCollectNum = (req, res) => {
    console.log('req.query');
    const sql = 'SELECT COUNT(*) as num FROM ms_collect WHERE homeId=?'
    db.query(sql, parseInt(req.query.homeId), (err, results) => {
        if (err) return res.cc(err)
        return res.send({
            status: 0,
            message: '查询总数成功',
            result: results[0]
        })
    })
}
