import express from "express";
import http from "http";
import client from "./db.js";
// console.log(client);
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/rooms", async (req, res) => {
  const { fields = "*" } = req.query;
  const data = await client.query(`SELECT ${fields} FROM rooms`);
  res.json({ data: data.rows });
});

app.get("/rooms/:room_id([0-9]+)", async (req, res) => {
  const { room_id } = req.params;
  const data = await client.query(`SELECT * FROM rooms WHERE room_id = $1`, [
    room_id,
  ]);
  res.json({ data: data.rows });
});

app.post("/rooms", async (req, res) => {
  const { name, num_occupancy } = req.body;

  const data = await client.query(
    `INSERT INTO rooms(name, num_occupancy) VALUES($1, $2)`,
    [name, num_occupancy]
  );
  res.json({ data: data });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));
