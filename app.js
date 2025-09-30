const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const formRoutes = require('./routes/formRoutes');
const responseRoutes = require('./routes/responseRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/forms', formRoutes);
app.use('/api/responses', responseRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'public')));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Handle React routing - this should be the last route
app.get(/^(?!\/api).*/, (req, res) => {
  // Serve React app for all non-API routes
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;