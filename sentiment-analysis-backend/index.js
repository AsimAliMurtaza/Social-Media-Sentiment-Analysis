const express = require('express');
const mssql = require('mssql/msnodesqlv8');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));

const PORT = process.env.PORT || 5000;

// Database configuration
const config = {
  server: 'DESKTOP-UIFCNNO',
  database: 'northwind',
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true
  }
};

// Connect to the database
mssql.connect(config)
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Error connecting to database:', err));

app.get('/products', async (req, res) => {
  try {
    const request = new mssql.Request();
    const result = await request.query('select top(2) ProductName, UnitPrice from Products');
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
