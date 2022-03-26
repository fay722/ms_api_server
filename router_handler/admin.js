const db = require('../db/index')
exports.getPermission = (req, res) => {
    console.log(req.user);
    if (req.user.status === 1) {
        return res.send({
            status: 1,
            message: '获得管理员权限'
        })
    } else if (req.user.status === '0') {
        return res.send({
            status: 0,
            message: '无权限访问'
        })
    } else {
        return res.send('err')
    }
}

exports.getAllUser = (req, res) => {
    const sql = 'SELECT * from ms_users'
    db.query(sql, (err, results) => {
        // console.log(results.shift());
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取成功',
            result: results
        })
    })
}

exports.editUser = (req, res) => {
    console.log(req.body)
    const sql = 'update ms_users set userName=?,tel=? where id=?'
    db.query(sql, [req.body.userName, req.body.tel, req.body.id], (err, results) => {
        if (err) return res.cc(err)
        return res.send({
            status: 0,
            message: '修改成功'
        })
    })
}

exports.delUser = (req, res) => {
    // console.log(req.query);
    const sql = 'delete from ms_users where id=?'
    db.query(sql, [req.query.id], (err, results) => {
        if (err) return res.cc(err)
        return res.send({
            status: 0,
            message: '删除成功！'
        })
    })
}

exports.searchUser = (req, res) => {
    // console.log('%' + req.query.userName + '%');
    // res.send('ok')
    const sql = 'select * from ms_users where userName like ? or tel like ?'
    db.query(sql, ['%' + req.query.userName + '%', '%' + req.query.userName + '%'], (err, results) => {
        // console.log(results);
        if (err) return res.cc(err)
        if (results.length === 0) return res.cc('无搜索结果')
        res.send({
            status: 0,
            result: results
        })
    })
}

// 上传民宿信息
exports.addHomestays = (req, res) => {
    const sql = 'insert into ms_homestays set ?'
    db.query(sql, req.body, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('添加失败')
        res.send({
            status: 0,
            message: '添加成功'
        })
    })
}

// 删除民宿信息
exports.delHomestays = (req, res) => {
    const sql = 'delete from ms_homestays where id =?'
    db.query(sql, req.query.id, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '删除成功！'
        })
    })
}

// 获取所有攻略
exports.getAllTips = (req, res) => {
    const sql = 'select * from ms_tips'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({ status: 0, message: '获取所有攻略成功', results: results })
    })
}

// 添加攻略
exports.addTip = (req, res) => {
    // console.log('1');
    // console.log(req.body.city, req.body.days)
    const sql2 = 'select * from ms_tips where city =? and days=?'
    db.query(sql2, [req.body.city, req.body.days], (err, results) => {
        // console.log(results.length);
        if (err) return res.cc(err)
        if (results.length === 1) return res.cc('已存在')
        const sql = 'insert into ms_tips set ?'
        db.query(sql, req.body, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('添加失败')
            return res.send({ status: 0, message: '添加成功' })
        })
    })

}

// 删除攻略
exports.delTip = (req, res) => {
    const sql = 'delete from ms_tips where id =?'
    db.query(sql, req.query.id, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '删除成功！'
        })
    })
}

// 修改攻略
exports.editTip = (req, res) => {
    console.log(req.body.content);
    const sql = 'update ms_tips set content=? where id=?'
    db.query(sql, [req.body.content, req.body.id], (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '修改成功'
        })
    })
}

// 搜索攻略
exports.searchTip = (req, res) => {
    console.log(req.body);
    const sql = 'select * from ms_tips where city like ? or days=?'
    db.query(sql, ['%' + req.body.search + '%', req.body.search], (err, results) => {
        if (err) return res.cc(err)
        if (results.length === 0) return res.cc('无搜索结果')
        res.send({
            status: 0,
            results: results
        })
    })
}