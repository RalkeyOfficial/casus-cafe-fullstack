const mysql = require('mysql2/promise');
require('dotenv').config();

class ConnectDataBase {
  private database: string;

  constructor(database: string) {
    this.database = database;
  }

  private createConnection = async () => {
    return await mysql.createConnection({
      host: process.env.DATABASE_URL,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: this.database,
	  multipleStatements: true,
    });
  };

  sendExecuteQuery = async (executeQuery: string, data?: any[]) => {
    const connection = await this.createConnection();

    const [results, fields] = await connection.execute(executeQuery, data);

    return results;
  };
}

export default ConnectDataBase;
