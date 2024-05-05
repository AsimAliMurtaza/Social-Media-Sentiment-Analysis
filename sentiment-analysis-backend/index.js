const express = require("express");
const mssql = require("mssql/msnodesqlv8");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const {
  ViewProducts,
  EditProduct,
  DeleteProduct,
  CreateProduct,
} = require("./crud/ProductsCRUD");
const {
  ViewCategory,
  CreateCategory,
  DeleteCategory,
  EditCategory,
} = require("./crud/CategoryCrud");
const {
  ViewUsers,
  EditUser,
  DeleteUser,
  CreateUser,
} = require("./crud/UsersCRUD");
const {
  ViewPost,
  DeletePost,
  EditPost,
  CreatePost,
} = require("./crud/PostsCRUD");

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

// Routes
app.get("/api/products", ViewProducts);
app.post("/api/editproducts", EditProduct);
app.post("/api/createproducts", CreateProduct);
app.post("/api/deleteproducts", DeleteProduct);

app.get("/api/viewcategories", ViewCategory);
app.post("/api/createcategories", CreateCategory);
app.post("/api/deletecategories", DeleteCategory);
app.post("/api/editcategories", EditCategory);

app.get("/api/viewusers", ViewUsers);
app.post("/api/createusers", CreateUser);
app.post("/api/deleteusers", DeleteUser);
app.post("/api/editusers", EditUser);

app.get("/api/viewposts", ViewPost);
app.post("/api/deleteposts", DeletePost);
app.post("/api/editposts", EditPost);
app.post("/api/createposts", CreatePost);



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
