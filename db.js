// node-postgres Documentation: https://node-postgres.com/
import pg from "pg";

const config = {
  //   host: "localhost",
  //   port: 5432,
  //   database: "pg_hotel",
  //   user: "postgres",
  //   password: "admin",
  connectionString: "postgres://postgres:admin@localhost:5432/pg_hotel",
};

const client = new pg.Pool(config);

export default client;
