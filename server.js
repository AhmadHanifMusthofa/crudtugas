const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);

app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Backend berjalan di http://0.0.0.0:${port}`);
});
