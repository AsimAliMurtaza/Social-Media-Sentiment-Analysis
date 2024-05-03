import React, { useState } from 'react';
import { TextField, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar } from "@mui/material";
import CustomCard from "../../components/Card/CustomCard";

function PostForm() {
    const [content, setContent] = useState(""); // State to track the content of the text field
    const [selectedImages, setSelectedImages] = useState([]); // State to track selected images
    const [isSnackbarOpen, setSnackbarOpen] = useState(false); // State to control snackbar visibility

    const handleChange = (event) => {
        setContent(event.target.value); // Update the content state with the new value
    };

    const handleFileChange = (event) => {
        const files = event.target.files;
        setSelectedImages(Array.from(files));
    };

    const handleInsertMedia = () => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = ".jpg";
        fileInput.multiple = true;
        fileInput.onchange = handleFileChange;
        fileInput.click();
    };

    const handleCreatePost = () => {
        if (selectedImages.length > 0) {
            // Media post
            setSnackbarOpen(true);
        } else {
            // Text post
            setSnackbarOpen(true);
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
            />
            
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
                <Typography variant="body1" color="textSecondary" style={{ fontSize: "14px" }}>
                    {content.length}/500
                </Typography>
                <div>
                    <Button variant="contained" style={{ marginRight: "8px", backgroundColor: "#000000", color: "#FFFFFF" }} onClick={handleCreatePost}>
                        Create Post
                    </Button>
                    <Button variant="contained" style={{ backgroundColor: "#000000", color: "#FFFFFF" }} onClick={handleInsertMedia}>
                        Insert Media  
                    </Button>
                </div>
            </div>
            <Snackbar open={isSnackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
                <Typography variant="body1" color="textSecondary">
                    {selectedImages.length > 0 ? "Media Post Created!" : "Text Post Created!"}
                </Typography>
            </Snackbar>
           
        </div>
    );
}

export default PostForm;
