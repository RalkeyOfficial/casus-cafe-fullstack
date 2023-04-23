const mysql = require('mysql2/promise');
require('dotenv').config();

class ConnectDataBase {
  private database: string;

  constructor(database: string) {
    this.database = database;
  }

  sendExecuteQuery = async (executeQuery: string, data: any[]) => {
    const connection = await mysql.createConnection({
      host: process.env.DATABASE_URL,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: this.database,
    });

    const [rows, fields] = await connection.execute(executeQuery);

    return [rows, fields];
  };
}

export default ConnectDataBase;
