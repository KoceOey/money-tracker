const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();
const upload = multer();

// Middleware
app.use(cors());
app.use(upload.none());

// Routes
const routes = require('./routes');
app.use(routes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
