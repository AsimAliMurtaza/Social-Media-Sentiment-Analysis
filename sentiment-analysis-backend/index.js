const express = require('express');
const mssql = require('mssql/msnodesqlv8');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(bodyParser.json());
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

app.post('/data', (req, res) => {
  const formData = req.body;
  console.log('Received form data:', formData);
  // Handle the form data here (e.g., save it to a database)
  res.status(200).send('Form data received successfully');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

