const { Pool } = require("pg");

class DBConnection {
    static pool = (() => {
        const connectionString = `postgresql://postgres:1234@localhost:5432/database_development`;
        return new Pool({
            connectionString: connectionString
        });
    }
    )();
}

module.exports = DBConnection;
