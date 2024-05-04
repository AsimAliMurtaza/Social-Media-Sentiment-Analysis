const express = require("express");
const mssql = require("mssql/msnodesqlv8");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const { ViewProducts, EditProduct, DeleteProduct, CreateProduct } = require("./crud/ProductsCRUD");
const { ViewCategory, CreateCategory, DeleteCategory, EditCategory } = require("./crud/CategoryCrud");
const { ViewUsers, EditUser, DeleteUser, CreateUser } = require("./crud/UsersCRUD");

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

// Route to view products
app.get("/api/products", ViewProducts);
app.post("/api/editproducts", EditProduct);
app.post("/api/createproducts", CreateProduct);
app.post("/api/deleteproducts", DeleteProduct);

app.get("/api/viewcategories", ViewCategory);
app.post("/api/createcategories", CreateCategory);
app.post("/api/deletecategories", DeleteCategory);
app.post("/api/editcategories", EditCategory);

app.get("/api/viewusers", ViewUsers);




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
app.post("/fb-form-signup", async (req, res) => {
  const formData = req.body;
  console.log("Received form data:", formData);

  const {
    username,
    PlatformId,
    "outlined-adornment-password": password,
  } = formData;

  try {
    // Check if the username already exists in the database
    const request = new mssql.Request();
    const result = await request.query(
      `SELECT * FROM Profile WHERE ProfileName = '${username}'`
    );

    if (result.recordset.length > 0) {
      // If the username already exists, send a response to the frontend
      res.status(400).send("Username already exists");
    } else {
      // If the username does not exist, insert the new profile data into the database
      await request.query(
        `INSERT INTO Profile (ProfileName, password, PlatformId)
                  VALUES ('${username}', '${password}', '${PlatformId}')`
      );
      console.log("Profile data inserted successfully");
      res.status(200).send("Sign-up data received and processed successfully");
    }
  } catch (error) {
    console.error("Error inserting user data:", error);
    res.status(500).send("Internal server error");
  }
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

  const { username, "outlined-adornment-password": password } = formData;
  console.log("Username:", username);
  console.log("Password:", password);

  // Assuming you have established a connection to your MSSQL database
  const request = new mssql.Request();

  // Check if the username exists in the users table
  request
    .query(`SELECT * FROM Profile WHERE ProfileName = '${username}'`)
    .then((result) => {
      if (result.recordset.length > 0) {
        // If the username exists, check if the password is correct
        request
          .query(
            `SELECT * FROM Profile WHERE ProfileName = '${username}' AND Password = '${password}'`
          )
          .then((loginResult) => {
            if (loginResult.recordset.length > 0) {
              console.log("Login successful");
              res.status(200).send("Login successful");
            } else {
              console.log("Incorrect password");
              res.status(401).send("Incorrect password");
            }
          })
          .catch((loginErr) => {
            console.error("Error querying user data:", loginErr);
            res.status(500).send("Internal server error");
          });
      } else {
        console.log("User does not exist");
        res.status(404).send("User does not exist");
      }
    })
    .catch((err) => {
      console.error("Error querying user data:", err);
      res.status(500).send("Internal server error");
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
