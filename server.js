// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const path = require("path"); // Untuk melayani file statis

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Aktifkan CORS untuk semua origin
app.use(express.json()); // Untuk parsing body JSON

// Melayani file statis dari folder 'public'
app.use(express.static(path.join(__dirname, "public")));

// Rute API
app.use("/users", userRoutes);

// Rute root untuk index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
