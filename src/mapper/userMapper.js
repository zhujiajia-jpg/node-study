
exports.queryUserByName = "select * from user where name = ?"
// const insertUser = "insert into user (name,password) values (?,?)"
exports.insertUser = "insert into user set ?"

exports.queryUserById = `select id, name, nickname, email, user_pic from user where id=?`