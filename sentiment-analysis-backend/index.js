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
const {
  CreateProfile
} = require("./crud/ProfileCRUD");

const {
  fetchPostReactions
} = require("./crud/ReactionsCRUD");

const {
  CreateComment
} = require("./crud/CommentsCRUD");

const {
  AddReaction
} = require("./crud/ReactionsCRUD");


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
  database: "ClassProject",
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

app.post("/api/profile", CreateProfile);

app.get("/api/fetchreactions", fetchPostReactions);

app.post("/api/addcomment", CreateComment);

app.post("/api/reacttopost", AddReaction);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
