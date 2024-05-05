import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,

  Snackbar,
} from "@mui/material";

function PostForm() {
  const [content, setContent] = useState(""); // State to track the content of the text field
  const [selectedImages, setSelectedImages] = useState([]); // State to track selected images
  const [isSnackbarOpen, setSnackbarOpen] = useState(false); // State to control snackbar visibility
  const [error, setError] = useState("");
  const [postType, setPostType] = useState(""); // State to track post type (media or non-media)
  const [productID, setProductID] = useState(null); // State to track product ID
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
          console.log("Products fetched successfully:", data);
        } else {
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  const handleChange = (event) => {
    setContent(event.target.value); // Update the content state with the new value
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedImages(Array.from(files));
    setPostType("media"); // Set post type to media
  };

  const handleInsertMedia = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".jpg";
    fileInput.multiple = true;
    fileInput.onchange = handleFileChange;
    fileInput.click();
  };

  const handleSearchProducts = (products) => {
    // Extract product names from the products array
    const productNames = products.map((product) => product.ProductName);
    console.log("Product names:", productNames);
    // Search for product names in the post content
    const foundProduct = productNames.find((productName) =>
      content.includes(productName)
    );
    console.log("Found product:", foundProduct);

    if (foundProduct) {
      // If a product is found, get its ID from the products array
      const foundProductID = products.find(
        (product) => product.ProductName === foundProduct
      ).ProductID;

      // Set the productID state
      setProductID(foundProductID);
      console.log("Product ID:", foundProductID);
    }
  };

  const handleCreatePost = async (event) => {
    event.preventDefault();

    // Set the post type based on whether there are selected images
    const newPostType = selectedImages.length > 0 ? "media" : "text";
    setPostType(newPostType);

    try {
      const data = {
        PostContent: content,
        PostType: newPostType, // Use the updated postType state
        ProductID: productID,
      };

      const response = await fetch("http://localhost:5000/api/createposts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Data sent successfully");
        setContent(""); // Clear content after successful submission
        setSelectedImages([]); // Clear selected images
        setProductID(null); // Reset product ID
        setError("");
      } else {
        const responseData = await response.json();
        if (
          responseData.error &&
          responseData.error.includes("duplicate key")
        ) {
          setError("This Post already exists!");
        } else {
          setError("Error sending data");
        }
      }
    } catch (error) {
      setError("Error sending data");
      console.error("Error sending data:", error);
    }
  };

  return (
    <div style={{ height: "50vh", padding: "10px" }}>
      <h1>Create Post</h1>
      <TextField
        id="post-content"
        label="Write your post content here"
        multiline
        fullWidth
        rows={4}
        onChange={handleChange} // Call handleChange function on change
        onchange={handleSearchProducts}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "8px",
        }}
      >
        <Typography
          variant="body1"
          color="textSecondary"
          style={{ fontSize: "14px" }}
        >
          {content.length}/500
        </Typography>
        <div>
          <Button
            variant="contained"
            style={{
              marginRight: "8px",
              backgroundColor: "#000000",
              color: "#FFFFFF",
            }}
            onClick={handleCreatePost}
          >
            Create Post
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "#000000", color: "#FFFFFF" }}
            onClick={handleInsertMedia}
          >
            Insert Media
          </Button>
        </div>
      </div>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Typography variant="body1" color="textSecondary">
          {selectedImages.length > 0
            ? "Media Post Created!"
            : "Text Post Created!"}
        </Typography>
      </Snackbar>
    </div>
  );
}

export default PostForm;
