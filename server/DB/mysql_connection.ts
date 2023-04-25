const mysql = require('mysql2');
const mysqlPromise = require('mysql2/promise');
require('dotenv').config();

class ConnectDataBase {
  private database: string;

  constructor(database: string) {
    this.database = database;
  }

  private createConnection = async () => {
    return await mysqlPromise.createConnection({
      host: process.env.DATABASE_URL,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: this.database,
    });
  };

  sendQuery = async (executeQuery: string) => {
    const connection = await this.createConnection();

    const [results] = await connection.query(executeQuery);

    return results;
  };

  sendPreparedQuery = async (preparedQuery: string, data?: any[]) => {
    const connection = await this.createConnection();

    const [results] = await connection.execute(preparedQuery, data);

    return results;
  };

  sendPreparedPoolQueries = async (...preparedQueryAndData: [string, any[]?][]) => {
    const pool = mysql.createPool({
      host: process.env.DATABASE_URL,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: this.database,
    });
    const promisePool = pool.promise();

    for (let queryAndDate of preparedQueryAndData) {
      await promisePool.execute(queryAndDate[0], queryAndDate[1]);
    }
  };

  sendPoolQueries = async (...queries: string[]) => {
    const pool = mysql.createPool({
      host: process.env.DATABASE_URL,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: this.database,
    });
    const promisePool = pool.promise();

    for (let query of queries) {
      await promisePool.query(query);
    }
  };
}

export default ConnectDataBase;
