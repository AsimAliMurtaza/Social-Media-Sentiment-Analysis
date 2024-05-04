import React, { useState } from "react";
import "../../routes/Dashboard.css"; // Import CSS file for styling
import EditCategoryForm from "../InputForm/InputFormEditCategory";
import { Category, Delete, Edit } from "@mui/icons-material";

const ListCategory = ({ item, onEdit, onDelete }) => {
  
  return (
    <li className="list-item">
      <span className="item-details">
        {item.CategoryName}
      </span>
      <button className="edit-button" onClick={() => onEdit(item)}>
        <Edit />
      </button>
      <button className="delete-button" onClick={()=> onDelete(item.CategoryID)}>
        <Delete />
      </button>
    </li>
  );
};



const ListCategories = ({ items, title, onEdit }) => {
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
      const response = await fetch("http://localhost:5000/api/deletecategories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ CategoryID: item }), // Send ProductID for deletion
      });

      if (response.ok) {
        console.log("Category deleted successfully");
      } else {
        console.error("Failed to delete Category");
      }
    } catch (error) {
      console.error("Error deleting Category:", error);
    }
  };

  return (
    <div>
      <h2>{title}</h2>
      <ul className="list">
        {items.map((item) => (
          <ListCategory
            key={item.CategoryID}
            item={item}
            onEdit={handleEdit}
            onDelete={handleDelete} // Pass onDelete function to ListItem
          />
        ))}
      </ul>
      {/* Render the edit form if editItem is not null */}
      {editItem && (
        <EditCategoryForm
          open={true}
          onClose={handleCloseEditForm}
          product={editItem}
          onSave={(editedCategory) => {
            // Handle saving the edited product details
            console.log("Edited Category:", editedCategory);
            handleCloseEditForm(); // Close the edit form after saving
          }}
        />
      )}
    </div>
  );
};
export default ListCategories;
