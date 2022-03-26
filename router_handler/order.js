const db = require('../db/index')

exports.postOrder = (req, res) => {
    // console.log(req.user);
    // console.log(req.body);
    const info = {
        userId: req.user.id,
        homeId: req.body.homeId,
        formDate: req.body.formDate,
        reserveDate: req.body.reserveDate,
        checkOutDate: req.body.checkOutDate,
        days: req.body.days,
        person: req.body.person,
        tel: req.body.tel,
        peoples: req.body.peoples,
    }
    console.log(info);
    const sql = 'insert into ms_order set ?'
    db.query(sql, info, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc(err)
        res.cc('预定成功，快去看看生成的攻略吧！', 0)
    })
}

exports.getOrder = (req, res) => {
    const sql1 = 'select * from ms_order where userId = ?'
    const sql3 = 'select * from ms_homestays where id in (select homeId from ms_order where userId =?) '
    const info = []
    db.query(sql1, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        db.query(sql3, req.user.id, (err, homeInfo) => {
            if (err) return res.cc(err)
            for (let i = 0; i < homeInfo.length; i++) {
                info[i] = { ...results[i], ...homeInfo[i], orderId: results[i].id }
            }
            res.send({
                status: '0',
                message: '获取成功',
                info: info,
            })
        })
    })
}

// 更改状态 to 2 退订
exports.orderStatus2 = (req, res) => {
    const sql = 'update ms_order set orderStatus=2 where id=?'
    db.query(sql, [req.query.id], (err, results) => {
        if (err) return res.cc(err)
        return res.send({ status: 0, message: '退订成功！订单状态已更改！' })
    })
}


