const express = require("express");
const mssql = require("mssql/msnodesqlv8");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;

// Database configuration
const config = {
  server: "DESKTOP-UIFCNNO",
  database: "CLassProject",
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true,
  },
};

// Connect to the database and log a message
mssql
  .connect(config)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Error connecting to database:", err));

// Route to fetch products
app.get("/get-products", async (req, res) => {
  try {
    const request = new mssql.Request();
    const result = await request.query(
      "select top(2) ProductName, ProductID from Product"
    );
    res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to fetch products by category
app.get("/products", async (req, res) => {
  const { category } = req.query;

  try {
    const request = new mssql.Request();
    const result = await request.query(
      `SELECT * FROM Products WHERE Category = '${category}'`
    );
    const products = result.recordset;
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to fetch categories
app.get("/get-categories", async (req, res) => {
  try {
    const request = new mssql.Request();
    const result = await request.query("select CategoryName from Category");
    res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to handle sign-up/ CREATE operation
app.post("/fb-form-signup", (req, res) => {
  const formData = req.body;
  console.log("Received form data:", formData);

  const { username, password, PlatformId } = formData;

  // Assuming you have established a connection to your MSSQL database
  const request = new mssql.Request();

  // Insert username and password into the users table
  request
    .query(
      `INSERT INTO Profile (ProfileName, Password, PlatformId)
                VALUES ('${username}', '${password}', '${PlatformId}')`
    )
    .then(() => console.log("Profile data inserted successfully"))
    .catch((err) => console.error("Error inserting user data:", err));
  res.status(200).send("Sign-up data received and processed successfully");
});

app.post("/fb-form-addproducts", (req, res) => {
  // Insert category into the categories table
  request
    .query(
      `INSERT INTO Category (CategoryName)
                VALUES ('${category}')`
    )
    .then(() => console.log("Category inserted successfully"))
    .catch((err) => console.error("Error inserting category:", err));

  // Insert product details into the products table
  request
    .query(
      `INSERT INTO Product (ProductName, CategoryId)
                VALUES ('${productName}', (SELECT CategoryId FROM Category WHERE CategoryName = '${category}'))`
    )
    .then(() => console.log("Product data inserted successfully"))
    .catch((err) => console.error("Error inserting product data:", err));
});

// Route to handle login/ READ operation
app.post("/fb-form-login", (req, res) => {
  const formData = req.body;
  console.log("Received form data:", formData);

  const { username, password } = formData;

  // Assuming you have established a connection to your MSSQL database
  const request = new mssql.Request();

  // Check if the username and password exist in the users table
  request
    .query(
      `SELECT * FROM Profile WHERE ProfileName = '${username}' AND password = '${password}'`
    )
    .then((result) => {
      if (result.recordset.length > 0) {
        console.log("Login successful");
        res.status(200).send("Login successful");
      } else {
        console.log("Login failed");
        res.status(401).send("Login failed");
      }
    })
    .catch((err) => console.error("Error querying user data:", err));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
