// --- Áp dụng Factory Pattern ---
class DBConnection {
    connect() {
        throw new Error("Phương thức connect() phải được ghi đè!");
    }
}

class MySQLConnection extends DBConnection {
    connect() {
        console.log("Kết nối đến MySQL database thành công.");
    }
}

class PostgreSQLConnection extends DBConnection {
    connect() {
        console.log("Kết nối đến PostgreSQL database thành công.");
    }
}

// --- Áp dụng Singleton Pattern và Factory ---
class DBManager {
    constructor() {
        if (DBManager.instance) {
            return DBManager.instance;
        }
        DBManager.instance = this;
        console.log("Khởi tạo DBManager (Singleton) thành công.");
    }

    // Factory Method
    getConnection(type) {
        switch (type) {
            case 'MySQL':
                return new MySQLConnection();
            case 'PostgreSQL':
                return new PostgreSQLConnection();
            default:
                throw new Error("Loại database không được hỗ trợ.");
        }
    }
}

// --- Chạy thử nghiệm ---
const manager1 = new DBManager(); // In ra thông báo khởi tạo
const conn1 = manager1.getConnection('MySQL');
conn1.connect();

const manager2 = new DBManager(); // Trả về instance cũ, KHÔNG in ra thông báo
const conn2 = manager2.getConnection('PostgreSQL');
conn2.connect();

console.log("manager1 có giống manager2 không?:", manager1 === manager2); // true