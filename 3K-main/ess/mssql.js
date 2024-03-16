import date_time from './datetime';
const sql = require('mssql');

const config = {
    user: 'sa',
    password: 'fsn123456',
    server: 'localhost', // เช่น 'localhost'
    database: 'Account',
    options: {
        encrypt: false, // ถ้าใช้เป็น true ในการเชื่อมต่อกับ SQL Server ที่ใช้ Encryption
    },
};

// ใช้ async/await หรือ .then() เพื่อรอให้การเชื่อมต่อเสร็จสิ้น
async function connectToDatabase() {
    try {
        const pool = await sql.connect(config);
        console.log('Connected to database');
        return pool;
    } catch (error) {
        console.error('Error connecting to database:', error);
        throw error;
    }
}

// เรียกใช้งานฟังก์ชันเพื่อเชื่อมต่อกับฐานข้อมูล
const poolPromise = connectToDatabase();

export { poolPromise };


