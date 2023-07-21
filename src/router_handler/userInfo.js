const db = require('../db/index')
const R = require("../result")

const {queryUserById ,insertUser} = require('../mapper/userMapper')

exports.getUserInfo = (req, res) => {
    db.query(queryUserById, req.user.id, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.send(R.buildFail(err))
        // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
        if (results.length !== 1) return res.send(R.buildFail('获取用户信息失败！'))
      
        // 3. 将用户信息响应给客户端
        res.send(R.buildOk('获取用户基本信息成功！',results[0]))
    })
}