const db = require('../db/index')
const bcryptjs = require('bcryptjs')

exports.getUserInfo = (req, res) => {
    const sql = 'select id,userName,tel from ms_users where id=?'
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取失败')
        res.send({
            status: 0,
            message: '获取成功',
            data: results[0]
        })
    })
}

// 密码重置
exports.updatePassword = (req, res) => {
    // console.log(req.body);
    // 根据id查询用户数据的SQl语句
    const sql1 = 'select * from ms_users where id=?'
    db.query(sql1, req.user.id, (err, results) => {
        console.log(results)
        if (err) return res.cc(err)
        console.log(results.length);
        if (results.length !== 1) return res.cc('用户不存在')
        // 判断旧密码是否正确

        const compareResult = bcryptjs.compareSync(req.body.oldPwd, results[0].userPassword)
        if (!compareResult) return res.cc('原密码错误')

        // 定义新密码
        const sql2 = 'update ms_users set userPassword=? where id=?'
        // 新密码加密
        const newPwd = bcryptjs.hashSync(req.body.newPwd, 10)
        db.query(sql2, [newPwd, req.user.id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新失败')
            res.cc('更新密码成功！请重新登陆！', 0)
        })
    })
}

// 收藏
exports.collectHomestay = (req, res) => {
    // console.log(req.user)
    // console.log(req.query);
    if (!req.user) {
        return res.cc('未登陆，请登录后再试！')
    }
    const sql2 = 'select * from ms_collect where userId=? and homeId=?'
    db.query(sql2, [req.user.id, req.query.homeId], (err, results) => {
        if (err) return res.cc(err)
        if (results.length > 0) return res.cc('收藏过了')
        const sql = 'insert into ms_collect(userId,homeId) values (?,?)'
        db.query(sql, [req.user.id, req.query.homeId], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('添加失败')
            return res.cc('收藏成功', 0)
        })
    })

}

// 取消收藏
exports.cancelCollect = (req, res) => {
    const sql = 'delete from ms_collect where userId =? and homeId =?'
    db.query(sql, [req.user.id, parseInt(req.query.homeId)], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('取消失败')
        return res.cc('取消成功', 0)
    })
}

// 查看是否收藏
exports.watchCollect = (req, res) => {
    // console.log(req.query)
    // console.log(req.user);
    // console.log(req.user)
    // res.send('ok')
    // if (req.user) {
    const sql = 'select * from ms_collect where userId =? and homeId =?'
    db.query(sql, [req.user.id, parseInt(req.query.homeId)], (err, results) => {
        if (err) return res.cc(err)
        if (results.length >= 1) return res.cc('已收藏', 2)
        return res.cc('未收藏', 1)
    })
}

// 获得用户所有收藏
exports.getMyAllCollect = (req, res) => {
    const sql = 'SELECT * from ms_collect mc ,ms_homestays mh WHERE mc.userId =? and mc.homeId =mh.id'
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        return res.send({ status: 0, message: '获得收藏列表成功', result: results })
    })
}

