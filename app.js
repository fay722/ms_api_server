// 导入express模块
const express = require('express')
const app = express()

// 配置cors跨域
const cors = require('cors')
const bodyParser = require('body-parser')
app.use(cors())
app.use(bodyParser.json())

// 配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }))

// 配置解析Token中间件
// 导入配置文件
const config = require('./config')
// 解析token中间件
const expressJWT = require('express-jwt')
// 使用.unless({path:[/^\/api\//]})指定哪些接口不需要身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))

// const qw = (req, res, next) => {
//     console.log(req.body)

// }

// 响应数据的中间件
app.use(function (req, res, next) {
    res.cc = (err, status = 1) => {
        // console.log('2');
        return res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

// 导入并注册用户路由组件
const userRouter = require('./router/user')
app.use('/api', userRouter)


const joi = require('joi')
// 错误中间件
app.use((err, req, res, next) => {
    // 验证失败导致的错误
    if (err.name === 'ValidationError') return res.cc(err, 2)
    // 身份认证失败后的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
    // 未知的错误
    res.cc(err)
})

// 启动web服务器
app.listen(3007, () => {
    console.log('http://127.0.0.1:3007');
})