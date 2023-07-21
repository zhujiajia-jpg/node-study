const status = require('http-status')

const R = {
    build: (code,message,data)=>{
        return {    
            code: code,
            message: message,
            data: data, 
        }
    },
    buildOk: (message,data) => {
        return {
            code: status.OK,
            message: message,
            data: data,
        }
    },
    buildFail: (err) => {
        return {
            code: status.INTERNAL_SERVER_ERROR,
            message: err instanceof Error ? err.message : err,
        }
    },
    buildCustomize: (code,message)=>{
        return {
            code: code,
            message: message,
        }
    }
}

module.exports = R