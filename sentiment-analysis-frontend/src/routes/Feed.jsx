import React, { useState } from "react";
import {
  Paper,
  Grid,
  Typography,
  IconButton,
  Divider,
  Button,
  TextField,
} from "@mui/material";
import {
  ThumbUp,
  Favorite,
  MoodBad,
  SentimentVeryDissatisfied,
  Mood,
  EmojiEmotions,
  Comment,
} from "@mui/icons-material";

const EngagerPage = () => {
  // Sample list of posts with reactions and comments
  const [posts, setPosts] = useState([
    {
      id: 1,
      content: "This is post 1",
      reactions: {
        like: 0,
        love: 0,
        sad: 0,
        angry: 0,
        wow: 0,
        haha: 0,
      },
      comments: [],
    },
    {
      id: 2,
      content: "This is post 2",
      reactions: {
        like: 0,
        love: 0,
        sad: 0,
        angry: 0,
        wow: 0,
        haha: 0,
      },
      comments: [],
    },
    {
      id: 3,
      content: "This is post 3",
      reactions: {
        like: 0,
        love: 0,
        sad: 0,
        angry: 0,
        wow: 0,
        haha: 0,
      },
      comments: [],
    },
  ]);

  // State for managing comment text
  const [commentText, setCommentText] = useState("");

  // State for managing which posts the user has reacted to
  const [reactedPosts, setReactedPosts] = useState([]);

  // Function to handle reacting to a post
  const reactToPost = (postId, reaction) => {
    // Check if the user has already reacted to this post
    if (!reactedPosts.includes(postId)) {
      // Find the post by postId
      const updatedPosts = posts.map((post) => {
        if (post.id === postId) {
          // Increment the reaction count
          return {
            ...post,
            reactions: {
              ...post.reactions,
              [reaction]: post.reactions[reaction] + 1,
            },
          };
        }
        return post;
      });

      // Update the state with the new reactions and mark the post as reacted
      setPosts(updatedPosts);
      setReactedPosts([...reactedPosts, postId]);
    }
  };

  // Function to handle submitting a comment
  const handleSubmitComment = (postId) => {
    // Find the post by postId
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        // Add the comment to the post
        return {
          ...post,
          comments: [...post.comments, commentText],
        };
      }
      return post;
    });

    // Update the state with the new comments
    setPosts(updatedPosts);

    // Clear comment text
    setCommentText("");
  };

  // State for managing which post is being commented on
  const [commentingOnPostId, setCommentingOnPostId] = useState(null);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh", background: "#f8f9fa" }}
    >
      <Paper
        elevation={3}
        style={{
          padding: "40px",
          width: "80%",
          maxWidth: "800px",
          background: "white",
          borderRadius: "20px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{ marginBottom: "20px" }}
        >
          Engager Dashboard
        </Typography>
        <Divider style={{ marginBottom: "20px" }} />
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ flex: 1 }}>
              <Typography variant="body1" style={{ marginBottom: "10px" }}>
                {post.content}
              </Typography>
              <div>
                <IconButton
                  disabled={reactedPosts.includes(post.id)}
                  onClick={() => reactToPost(post.id, "like")}
                >
                  <ThumbUp />
                </IconButton>
                <IconButton
                  disabled={reactedPosts.includes(post.id)}
                  onClick={() => reactToPost(post.id, "love")}
                >
                  <Favorite />
                </IconButton>
                <IconButton
                  disabled={reactedPosts.includes(post.id)}
                  onClick={() => reactToPost(post.id, "sad")}
                >
                  <MoodBad />
                </IconButton>
                <IconButton
                  disabled={reactedPosts.includes(post.id)}
                  onClick={() => reactToPost(post.id, "angry")}
                >
                  <SentimentVeryDissatisfied />
                </IconButton>
                <IconButton
                  disabled={reactedPosts.includes(post.id)}
                  onClick={() => reactToPost(post.id, "wow")}
                >
                  <Mood />
                </IconButton>
                <IconButton
                  disabled={reactedPosts.includes(post.id)}
                  onClick={() => reactToPost(post.id, "haha")}
                >
                  <EmojiEmotions />
                </IconButton>
              </div>
              <Typography
                variant="body2"
                style={{ marginTop: "10px", color: "#888" }}
              >
                Reactions:
                {Object.entries(post.reactions).map(([reaction, count]) => (
                  <span key={reaction} style={{ marginLeft: "5px" }}>
                    {`${reaction}: ${count}`}
                  </span>
                ))}
              </Typography>
            </div>
            <div>
              <Button
                variant="outlined"
                color="primary"
                endIcon={<Comment />}
                onClick={() => setCommentingOnPostId(post.id)}
              >
                Comment
              </Button>
              {commentingOnPostId === post.id && (
                <div style={{ display: "flex", marginTop: "10px" }}>
                  <TextField
                    variant="outlined"
                    placeholder="Add a comment..."
                    fullWidth
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    style={{ marginRight: "10px" }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSubmitComment(post.id)}
                  >
                    Submit
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </Paper>
    </Grid>
  );
};

export default EngagerPage;
