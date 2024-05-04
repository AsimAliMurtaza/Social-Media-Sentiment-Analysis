import React, { useState } from "react";
import "../../routes/Dashboard.css"; // Import CSS file for styling
import EditProductForm from "../InputForm/InputFormEditProduct"; // Import the EditProductForm component
import { Delete, Edit } from "@mui/icons-material";

const ListItem = ({ item, onEdit, onDelete }) => {
  
  return (
    <li className="list-item">
      <span className="item-details">
        {item.ProductName} - {item.CategoryName}
      </span>
      <button className="edit-button" onClick={() => onEdit(item)}>
        <Edit />
      </button>
      <button className="delete-button" onClick={()=> onDelete(item.ProductID)}>
        <Delete />
      </button>
    </li>
  );
};



const List = ({ items, title, onEdit }) => {
  // State to manage whether the edit form is open or not
  const [editItem, setEditItem] = useState(null);

  // Handler function to open the edit form
  const handleEdit = (item) => {
    setEditItem(item);
  };

  // Handler function to close the edit form
  const handleCloseEditForm = () => {
    setEditItem(null);
  };

  // Handler function to handle successful deletion
  const handleDelete = async (item) => {
    try {
      // Assuming item.ProductID is sent to the backend for deletion
      const response = await fetch("http://localhost:5000/api/deleteproducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ProductID: item }), // Send ProductID for deletion
      });

      if (response.ok) {
        console.log("Product deleted successfully");
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <h2>{title}</h2>
      <ul className="list">
        {items.map((item) => (
          <ListItem
            key={item.ProductID}
            item={item}
            onEdit={handleEdit}
            onDelete={handleDelete} // Pass onDelete function to ListItem
          />
        ))}
      </ul>
      {/* Render the edit form if editItem is not null */}
      {editItem && (
        <EditProductForm
          open={true}
          onClose={handleCloseEditForm}
          product={editItem}
          onSave={(editedProduct) => {
            // Handle saving the edited product details
            console.log("Edited product:", editedProduct);
            handleCloseEditForm(); // Close the edit form after saving
          }}
        />
      )}
    </div>
  );
};
export default List;
