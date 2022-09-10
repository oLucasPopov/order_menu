const config = {
  PgUser: process.env.PG_USER || "postgres",
  PgHost: process.env.PG_HOST || "localhost",
  PgDatabase: process.env.PG_DATABASE || "ctrl_enc2",
  PgPassword: process.env.PG_PASSWORD || "senha123",
  PgPort: (process.env.PG_PORT || 5432) as number,
}

export default config