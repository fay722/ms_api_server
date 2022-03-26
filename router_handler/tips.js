const db = require('../db/index')

exports.getTip = (req, res) => {
    if (req.query.days > 10) {
        return res.send({ status: 3, message: '您预定的天数无法为您匹配精准的旅游攻略，祝您旅游愉快！' })
    }
    const sql = 'select * from ms_tips where city=? and days=?'
    // console.log(req.query);
    db.query(sql, [req.query.city, req.query.days], (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.send({status:1, message:'未生成攻略，请您耐心等待，祝您旅游愉快！'})
        res.send({
            status: 0,
            message: '获取成功',
            result: results[0]
        })
    })
    // res.send('getTip');
}