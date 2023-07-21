const R = require("../result")
const calendar = require("js-calendar-converter")

//自己构建
exports.calendar = (req, res) => {
    const josn = JSON.stringify(calendar.solar2lunar(), null, 4)
    console.log(josn)

    const html = "<h1>${josn}<h1>";

    return res.send(R.buildOk(josn))
}