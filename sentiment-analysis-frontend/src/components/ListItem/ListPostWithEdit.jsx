import React, { useState } from "react";
import "../../routes/Dashboard.css"; // Import CSS file for styling
import EditPostsForm from "../InputForm/InputEditPosts"; // Import the EditProductForm component
import { Delete, Edit } from "@mui/icons-material";

const ListItem = ({ item, onEdit, onDelete }) => {
  return (
    <li className="list-item">
      <span className="item-details">
        {item.PostID} - {item.PostContent}
      </span>
      <button className="edit-button" onClick={() => onEdit(item)}>
        <Edit />
      </button>
      <button className="delete-button" onClick={() => onDelete(item.PostID)}>
        <Delete />
      </button>
    </li>
  );
};

const ListPostWithEdit = ({ items, title, onEdit }) => {
  const [editItem, setEditItem] = useState(null);

  const handleEdit = (item) => {
    setEditItem(item);
  };

  const handleCloseEditForm = () => {
    setEditItem(null);
  };

  const handleDelete = async (item) => {
    try {
      // Assuming item.ProductID is sent to the backend for deletion
      const response = await fetch("http://localhost:5000/api/deleteposts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ PostID: item }), // Send ProductID for deletion
      });

      if (response.ok) {
        console.log("Post deleted successfully");
      } else {
        console.error("Failed to delete Post");
      }
    } catch (error) {
      console.error("Error deleting Post:", error);
    }
  };

  return (
    <div>
      <h2>{title}</h2>
      <ul className="list">
        {items.map((item) => (
          <ListItem
            key={item.PostID}
            item={item}
            onEdit={handleEdit}
            onDelete={handleDelete} // Pass onDelete function to ListItem
          />
        ))}
      </ul>
      {/* Render the edit form if editItem is not null */}
      {editItem && (
        <EditPostsForm
          open={true}
          onClose={handleCloseEditForm}
          product={editItem}
          onSave={(editedPost) => {
            // Handle saving the edited product details
            console.log("Edited Post:", editedPost);
            handleCloseEditForm(); // Close the edit form after saving
          }}
        />
      )}
    </div>
  );
};
export default ListPostWithEdit;
