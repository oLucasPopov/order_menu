import { Client, QueryResult } from "pg";
import config from "../../../../config/env"

const pghelper = {
  pgClient: undefined as Client | undefined,

  async connect() {
    this.pgClient = new Client({
      user: config.PgUser,
      host: config.PgHost,
      database: config.PgDatabase,
      password: config.PgPassword,
      port: config.PgPort,
    });

    await this.pgClient.connect();
  },

  async disconnect() {
    if (this.pgClient)
      await this.pgClient.end();
  },

  async query(query: string, params: any[]) {
    return await this.pgClient!.query(query, params);
  }
}

export default pghelper