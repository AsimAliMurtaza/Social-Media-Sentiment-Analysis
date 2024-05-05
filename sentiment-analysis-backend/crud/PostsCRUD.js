const mssql = require("mssql/msnodesqlv8");

exports.ViewPost = async (req, res) => {
  try {
    const result = await mssql.query(`
      SELECT top(50) PostID, PostContent from Post;
    `);
    res.json(result.recordset);
    console.log("posts", result.recordset);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Error fetching posts" });
  }
};

exports.EditPost = async (req, res) => {
  const { PostID, PostContent } = req.body;
  console.log("EditPost", req.body);
  try {
    const request = new mssql.Request();
    const result2 = await request.query(`
      Update Post set PostContent = '${PostContent}' where PostID = '${PostID}'
      `);
    res.json({ message: "Post updated" });
  } catch (error) {
    console.error("Error updating Post:", error);
    res.status(500).json({ error: "Error updating Post" });
  }
};

exports.CreatePost = async (req, res) => {
  const { PostContent, PostType, ProductID } = req.body;
  console.log("post", req.body);

  // Determine the PostTypeID based on the PostType
  const postTypeID = PostType === "text" ? 8 : 7;

  // Generate a random PlatformId between 12 and 13
  const platformId = Math.floor(Math.random() * 2) + 12;

  try {
    const request = new mssql.Request();
    const result = await request.query(`
        INSERT INTO Post (PostContent, PostType, ProductID, PlatformId, PostCreated) 
        VALUES ('${PostContent}', ${postTypeID}, ${ProductID}, ${platformId}, GETDATE())
      `);
    res.json({ message: "Post added" });
  } catch (error) {
    console.error("Error adding post:", error);
    res.status(500).json({ error: "Error adding post" });
  }
};

exports.DeletePost = async (req, res) => {
  const { PostID } = req.body;
  console.log(req);
  try {
    const request = new mssql.Request();

    const result = await request.query(`
          Delete from Post where PostID = '${PostID}'
        `);
    res.json({ message: "Post Deleted" });
  } catch (error) {
    console.error("Error deleting Post:", error);
    res.status(500).json({ error: "Error deleting Post" });
  }
};
