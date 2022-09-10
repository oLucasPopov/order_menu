import { Client } from "pg";
import config from "../../../../config/env"

const pghelper = {
  pgClient: new Client({
    user: config.PgUser,
    host: config.PgHost,
    database: config.PgDatabase,
    password: config.PgPassword,
    port: config.PgPort,
  }),

  connect() {
    this.pgClient.connect();
  },

  async disconnect() {
    await this.pgClient.end();
  },
  query(query: string, params: any[]) {
    return this.pgClient.query(query, params);
  }
}

export default pghelper