import React from "react";
import "../../routes/Dashboard.css"; // Import CSS file for styling
import EditProductForm from "../InputForm/InputFormEditProduct"; // Import the EditProductForm component

const ListItem = ({ item, onEdit, onDelete }) => {
  return (
    <li className="list-item">
      <span className="item-details">
        {item.name} - {item.description}
      </span>
      <button className="edit-button" onClick={() => onEdit(item)}>
        Edit
      </button>
      <button className="delete-button" onClick={() => onDelete(item.id)}>
        Delete
      </button>
    </li>
  );
};

const List = ({ items, onEdit, onDelete }) => {
  // State to manage whether the edit form is open or not
  const [editItemId, setEditItemId] = React.useState(null);

  // Handler function to open the edit form
  const handleEdit = (itemId) => {
    setEditItemId(itemId);
  };

  // Handler function to close the edit form
  const handleCloseEditForm = () => {
    setEditItemId(null);
  };

  return (
    <div>
      <h2>Products</h2>
      <ul className="list">
        {items.map((item) => (
          <ListItem
            key={item.id}
            item={item}
            onEdit={handleEdit} // Pass the handleEdit function as prop
            onDelete={onDelete}
          />
        ))}
      </ul>
      {/* Render the edit form if editItemId is not null */}
      {editItemId && (
        <EditProductForm
          open={true}
          onClose={handleCloseEditForm}
          product={items.find((item) => item.id === editItemId)}
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