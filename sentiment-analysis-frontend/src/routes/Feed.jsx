import React, { useState, useEffect } from "react";
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
  LinkedIn,
} from "@mui/icons-material";
import { useLocation } from "react-router-dom";

const EngagerPage = () => {
  const location = useLocation();
  const [engagerId, setEngagerId] = useState(null);
  const [platformId, setPlatformId] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Extract engagerId and platformId from location state
    console.log(location);
    if (location.state) {
      const { platformId, username, email } = location.state;
      setPlatformId(platformId);
      setUsername(username);
      setEmail(email);
      console.log("platformId", platformId);
      console.log("username", username);
      console.log("email", email);
    }
  }, [location.state]);
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [reactedPosts, setReactedPosts] = useState([]);
  const [commentingOnPostId, setCommentingOnPostId] = useState(null);
  const [reactions, setReactions] = useState([]);

  const sendCommentToBackend = async (
    postId,
    username,
    email,
    commentContent
  ) => {
    try {
      const response = await fetch("http://localhost:5000/api/addcomment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: postId,
          username: username,
          email: email,
          commentContent: commentContent,
        }),
      });
      if (response.ok) {
        console.log("Comment added successfully");
        // You can perform additional actions here if needed
      } else {
        console.error("Failed to add comment");
      }
    } catch (error) {
      console.error("Error sending comment:", error);
    }
  };

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("http://localhost:5000/api/viewposts");
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
          console.log("posts fetched successfully:", data);
        } else {
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, []);

  const reactToPost = async (postId, reactionType) => {
    if (!reactedPosts.includes(postId)) {
      try {
        const response = await fetch("http://localhost:5000/api/reacttopost", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postId: postId,
            username: username,
            email: email,
            platformId: platformId,
            reactionType: reactionType,
          }),
        });
        if (response.ok) {
          console.log("Reaction added successfully");
          // Update UI or perform additional actions if needed
        } else {
          console.error("Failed to add reaction");
        }
      } catch (error) {
        console.error("Error sending reaction:", error);
      }

      // const updatedPosts = posts.map((post) => {
      //   if (post.PostID === postId) {
      //     return {
      //       ...post,
      //       reactions: {
      //         ...post.reactions,
      //         [reactionTypeMap[reactionType]]:
      //           post.reactions[reactionTypeMap[reactionType]] + 1,
      //       },
      //     };
      //   }
      //   return post;
      // });
      // setPosts(updatedPosts);
      setReactedPosts([...reactedPosts, postId]);
    }
  };

  const handleSubmitComment = async (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, commentText],
        };
      }
      return post;
    });
    setPosts(updatedPosts);
    setCommentText("");

    // Send comment to backend
    await sendCommentToBackend(postId, username, email, commentText);
  };

  const reactionTypeMap = {
    1: "angry",
    2: "sad",
    3: "wow",
    4: "haha",
    5: "like",
    6: "love",
  };

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
            key={post.PostID}
            style={{
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ flex: 1 }}>
              <Typography variant="body1" style={{ marginBottom: "10px" }}>
                {post.PostContent}
              </Typography>
              <div>
                <IconButton
                  disabled={reactedPosts.includes(post.PostID)}
                  onClick={() => reactToPost(post.PostID, "like")}
                >
                  <ThumbUp />
                </IconButton>
                <IconButton
                  disabled={reactedPosts.includes(post.PostID)}
                  onClick={() => reactToPost(post.PostID, "love")}
                >
                  <Favorite />
                </IconButton>
                <IconButton
                  disabled={reactedPosts.includes(post.PostID)}
                  onClick={() => reactToPost(post.PostID, "sad")}
                >
                  <MoodBad />
                </IconButton>
                <IconButton
                  disabled={reactedPosts.includes(post.PostID)}
                  onClick={() => reactToPost(post.PostID, "angry")}
                >
                  <SentimentVeryDissatisfied />
                </IconButton>
                <IconButton
                  disabled={reactedPosts.includes(post.PostID)}
                  onClick={() => reactToPost(post.PostID, "wow")}
                >
                  <Mood />
                </IconButton>
                <IconButton
                  disabled={reactedPosts.includes(post.PostID)}
                  onClick={() => reactToPost(post.PostID, "haha")}
                >
                  <EmojiEmotions />
                </IconButton>
              </div>
            </div>
            <div>
              <Button
                variant="outlined"
                color="primary"
                endIcon={<Comment />}
                onClick={() => setCommentingOnPostId(post.PostID)}
              >
                Comment
              </Button>
              {commentingOnPostId === post.PostID && (
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
                    onClick={() => handleSubmitComment(post.PostID)}
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
