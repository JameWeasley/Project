const mysql = require('mysql2/promise');

let connection 
(async () => {
    connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'project'
    })
    
}) 

exports.userSelect = async (user , password) => {
    const [result] = await connection.query(
        'SELECT * FROM users_tb WHERE user_name = ? AND user_password = ?',[
            user , password
        ]
    )
    if (result.length > 0) {
        return true
    } else {
        console.log("Not Connect");
        return false
    }
}