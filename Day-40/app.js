const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const app = express();
const DATA_FILE = path.join(__dirname, "data", "users.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users", async (req, res) => {
  const data = await fs.readFile(DATA_FILE, "utf-8");
  let users = JSON.parse(data);

  const { q } = req.query;
  if (q) {
    const keyword = q.toLowerCase();
    users = users.filter(
      (u) =>
        u.name.toLowerCase().includes(keyword) ||
        u.email.toLowerCase().includes(keyword)
    );
  }

  res.status(200).json(users);
});

app.get("/users/:id", async (req, res) => {
  const data = await fs.readFile(DATA_FILE, "utf-8");
  const users = JSON.parse(data);

  const user = users.find((u) => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });

  res.status(200).json(user);
});

app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email)
    return res.status(400).json({ message: "name and email are required" });

  const data = await fs.readFile(DATA_FILE, "utf-8");
  const users = JSON.parse(data);

  const newUser = {
    id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    name,
    email,
  };

  users.push(newUser);
  await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2), "utf-8");

  res.status(201).json(newUser);
});

app.put("/users/:id", async (req, res) => {
  const data = await fs.readFile(DATA_FILE, "utf-8");
  const users = JSON.parse(data);

  const index = users.findIndex((u) => u.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: "User not found" });

  const { name, email } = req.body;
  if (name) users[index].name = name;
  if (email) users[index].email = email;

  await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2), "utf-8");

  res.status(200).json(users[index]);
});

app.delete("/users/:id", async (req, res) => {
  const data = await fs.readFile(DATA_FILE, "utf-8");
  const users = JSON.parse(data);

  const index = users.findIndex((u) => u.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: "User not found" });

  users.splice(index, 1);
  await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2), "utf-8");

  res.status(200).json({ message: "Deleted successfully" });
});

app.listen(3000, () => {
  console.log("Server đang chạy tại http://localhost:3000");
});