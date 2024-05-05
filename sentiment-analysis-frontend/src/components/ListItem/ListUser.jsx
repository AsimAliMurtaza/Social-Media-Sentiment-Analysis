import React, { useState } from "react";
import "../../routes/Dashboard.css"; // Import CSS file for styling
import { Delete, Edit } from "@mui/icons-material";
import EditUserForm from "../InputForm/InputEditUsers"; // Import the EditUserForm component

const ListUser = ({ item, onEdit, onDelete }) => {
  return (
    <li className="list-item">
      <span className="item-details">
        {item.UserName} - {item.Email} - {item.LookUpName}
      </span>
      <button className="edit-button" onClick={() => onEdit(item)}>
        <Edit />
      </button>
      <button
        className="delete-button"
        onClick={() => onDelete(item.EngagerID)}
      >
        <Delete />
      </button>
    </li>
  );
};

const ListUsers = ({ items, title, onEdit, onDelete }) => {
  // State to manage whether the edit form is open or not
  const [editItemId, setEditItemId] = useState(null);

  // Handler function to open the edit form
  const handleEdit = (item) => {
    setEditItemId(item.EngagerID);
  };

  // Handler function to close the edit form
  const handleCloseEditForm = () => {
    setEditItemId(null);
  };

  // Handler function to handle successful deletion
  const handleDelete = async (EngagerID) => {
    try {
      const response = await fetch("http://localhost:5000/api/deleteusers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ EngagerID: EngagerID }), // Send UserId for deletion
      });

      if (response.ok) {
        console.log("User deleted successfully");
        // Optionally, you can remove the deleted user from the state
        onDelete(EngagerID);
      } else {
        console.error("Failed to delete User");
      }
    } catch (error) {
      console.error("Error deleting User:", error);
    }
  };

  return (
    <div>
      <h2>{title}</h2>
      <ul className="list">
        {items.map((item) => (
          <ListUser
            key={item.EngagerID}
            item={item}
            onEdit={handleEdit} // Pass the handleEdit function as prop
            onDelete={onDelete} // Pass the onDelete function as prop
          />
        ))}
      </ul>
      {/* Render the edit form if editItemId is not null */}
      {editItemId && (
        <EditUserForm
          open={true}
          onClose={handleCloseEditForm}
          user={items.find((item) => item.EngagerID === editItemId)} // Pass the user object to the EditUserForm
          onSave={(editedUser) => {
            // Handle saving the edited user details
            console.log("Edited user:", editedUser);
            handleCloseEditForm(); // Close the edit form after saving
          }}
        />
      )}
    </div>
  );
};

export default ListUsers;
