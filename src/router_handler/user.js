/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */
const e = require("express")
const db = require("../db/index")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {jwtSecretKey} = require('../config')
const {queryUserByName,insertUser} = require('../mapper/userMapper')
const R = require("../result")

exports.regUser = (req, res) => {
    const userInfo = req.body
    //前面已经校验了 该校验可以取消掉
    // if(!userInfo.name || !userInfo.password){
    //     return res.send({ status: 1,message :'用户名或密码不能为空！'})
    // }
    
    db.query(queryUserByName,userInfo.name, (err,results)=>{
        if(err){
            // return res.send({ status: 1,message : err.message})
            return res.send(R.buildFail(err))
        }
        if(results.length >= 1){
            // return res.send({ status: 1,message : "用户名已经存在！"})
            return res.send(R.buildFail("用户名已经存在！"))
        }

        userInfo.password = bcrypt.hashSync(userInfo.password, 10)

        // db.query(insertUser,[userInfo.name,userInfo.password],(err,results)=>{
        //     if(err){
        //         return res.send({ status: 1,message : err.message})
        //     }
        // })

        db.query(insertUser,{name: userInfo.name,password: userInfo.password},(err,results) => {
            if(err){
                // return res.send({ status: 1, message : err.message})
                return res.send(R.buildFail(err))
            }
            if(results.affectedRows !== 1){
                // return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
                return res.send(R.buildFail('注册用户失败，请稍后再试！'))
            }

            // 注册成功
            // res.send({ status: 0, message: '注册成功！' })
            res.send(R.buildOk('注册成功！'))
        })
    })
}
  
// 登录的处理函数
exports.login = (req, res) => {
    const userInfo = req.body

    db.query(queryUserByName,userInfo.name,(err,results)=>{
        if(err){
            return res.send(R.buildFail(err))
        }
        if(results.length != 1){
            // return R.buildFail("登录失败!")
            return res.send(R.buildFail("登录失败!"))
        }
        //校验密码
        const compareResult = bcrypt.compareSync(userInfo.password,results[0].password)
        if(!compareResult){
            return res.send(R.buildFail("密码错误!"))
        }
        //生产jwt token  es6语法，剔除password
        const user = { ...results[0], password: '', user_pic: '' }

        const tokenStr = jwt.sign(user,jwtSecretKey,{
            expiresIn: '10h' //token有效时间
        })

        res.send(R.buildOk("登录成功！",'Bearer ' + tokenStr))
    })

}