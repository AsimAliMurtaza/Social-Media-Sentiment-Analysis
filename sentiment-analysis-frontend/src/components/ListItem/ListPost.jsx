import React from "react";
import { List, ListItem, ListItemText, Divider } from "@mui/material";

function ListPost({ posts }) {
  return (
    <div>
      <h1>View Posts</h1>
      <List>
        {posts.map((post) => (
          <div key={post.PostID}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={"Post " + post.PostID}
                secondary={post.PostContent}
              />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
}

export default ListPost;
