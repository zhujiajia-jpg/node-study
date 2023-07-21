const express = require('express')
//处理器
const userHandler = require('../router_handler/user')
//校验模块
const expressJoi = require('@escook/express-joi')
//用户表单校验
const {reg_login_schema} = require('../schema/user')

const router = express.Router()


// 注册新用户
// 3. 在注册新用户的路由中，声明局部中间件，对当前请求中携带的数据进行验证
// 3.1 数据验证通过后，会把这次请求流转给后面的路由处理函数
// 3.2 数据验证失败后，终止后续代码的执行，并抛出一个全局的 Error 错误，进入全局错误级别中间件中进行处理
// 参数列表是一个、一个往下面执行的
// router.post('/reguser', expressJoi(reg_login_schema) ,(req,res)=>{
//     userHandler.regUser(req,res)
// })

/**
 * 别的写法
 * 
 */
router.post("/reguser",expressJoi(reg_login_schema),userHandler.regUser)

// router.post('/login',(req,res)=>{
//     userHandler.login(req,res)
// })
router.post("/login",expressJoi(reg_login_schema),userHandler.login)

module.exports = router