import React, { useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

function ViewPosts() {
  // Sample data of posts
  const [posts, setPosts] = useState([
    { id: 1, title: "Post 1", content: "Content of Post 1" },
    { id: 2, title: "Post 2", content: "Content of Post 2" },
    { id: 3, title: "Post 3", content: "Content of Post 3" },
  ]);

  return (
    <div>
      <h1>View Posts</h1>
      <List>
        {posts.map((post) => (
          <div key={post.id}>
            <ListItem alignItems="flex-start">
              <ListItemText primary={post.title} secondary={post.content} />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
}

export default ViewPosts;
