const db = require('../db/index')

exports.getHomestays = (req, res) => {
    const sql = 'select * from ms_homestays'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        return res.send(results)
    })
}

exports.getDetails = (req, res) => {
    // console.log(req.query)
    const homestaysId = req.query.id
    // console.log(homestaysId);
    const sql = 'select * from ms_homestays where id =?'
    db.query(sql, [homestaysId], (err, results) => {
        // console.log(results.length);
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc(err)
        res.send(results)
    })
}

exports.getCityHomestays = (req, res) => {
    // console.log(req.query);
    const sql = 'select * from ms_homestays where city =?'
    db.query(sql, [req.query.city], (err, results) => {
        if (err) return res.cc(err)
        if (results.length === 0) return res.cc('没有该城市的民宿信息')
        res.send(results)
    })
}

exports.getSearchHomestay = (req, res) => {
    // console.log(req.query)
    const sql = 'select * from ms_homestays where title like ? or city like ?'
    db.query(sql, ["%" + req.query.key + "%", "%" + req.query.key + "%"], (err, results) => {
        if (err) return res.cc(err)
        // console.log(results);
        res.send({
            status: 0,
            message: '查找成功',
            results: results
        })
    })
}

// 更改民宿状态 0 为预定 1已预定
exports.editHomestayStatus = (req, res) => {
    const sql = 'update ms_homestays set status=1 where id=?'
    db.query(sql, [req.query.id], (err, results) => {
        if (err) return res.cc(err)
        return res.send({ status: 0, message: '预定成功！状态已更改！' })
    })
}
// 退订 更改为0
exports.editTuidingStatus = (req, res) => {
    const sql = 'update ms_homestays set status=0 where id=?'
    db.query(sql, [req.query.id], (err, results) => {
        if (err) return res.cc(err)
        return res.send({ status: 0, message: '退订成功！状态已更改！' })
    })
}

