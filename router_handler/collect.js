const db = require('../db/index')

// 获取所有民宿收藏数量
exports.getCollectNum = (req, res) => {
    const sql = 'SELECT mh.id,mh.title,t.nums from ms_homestays mh,( SELECT homeId ,count(*) nums from  ms_collect GROUP BY homeId) t where mh.id=t.homeId'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({ status: 0, results: results })
    })
}

exports.getCollectUser = (req, res) => {
    const sql = 'SELECT * from ms_collect mc,ms_users mu where homeId=? and mc.userId=mu.id'
    db.query(sql, req.query.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length === 0) return res.cc('无用户')
        return res.send({ status: 0, results: results })
    })
}