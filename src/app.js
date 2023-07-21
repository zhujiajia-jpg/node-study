const express = require('express')
const userRouter = require('./router/user')
const cors = require('cors')
const joi = require("joi")
const R = require('./result')
const expressJWT = require('express-jwt')
const config =require('./config')
const userInfoRouter = require('./router/userInfo');
const calendarRouter = require("./router/calendar")

const app = express()

app.use(cors())
//通过如下的代码，配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件：
app.use(express.urlencoded({ extended: false}))

//全局中间件，给res对象注册cc函数，输出错误
// app.use((req,res,next) => {
//     // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
//     res.sendMessage = (err,status = status.INTERNAL_SERVER_ERROR)=>{
//         if(err instanceof Error){
//             res.send(R.buildFail(err,status))
//         }    
//     },
//     next()
// })

//全局日志
app.use((req,res,next)=>{
    console.log("url:",req.url)
    console.log("params:",req.params)
    console.log("body:",req.body)
    next()
})

//全局校验jwttoken
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))

//router对象注册的接口、注册router
app.use("/api",userRouter)
app.use("/user",userInfoRouter)
app.use("/api/calendar",calendarRouter)

//自己注册的接口
app.get("/api/sayHello", (req,res) =>{
    console.log("hello")
    res.send("hello my friend")
})


//全局中间件，全据异常捕获\  需要放到路由后
app.use((err,req,res,next) =>{
    if(err instanceof joi.ValidationError) {
        return res.send(R.buildFail(err));
    }

    if(err.name === 'UnauthorizedError'){
        return res.send(R.buildFail('身份认证失败！'));
    }

    console.log("其他错误")
    return res.send(R.buildFail(err));
})


app.listen(8080,function(){
    console.log("api server runing at http://127.0.0.1:8080")
})