const mssql = require("mssql/msnodesqlv8");

exports.fetchPostReactions = async (req, res) => {
  try {
    const request = new mssql.Request();
    const result = await request.query(`
        SELECT PostID, ReactionType, COUNT(*) AS ReactionCount
        FROM Reaction
        GROUP BY PostID, ReactionType
      `);

    // Organize the reaction counts by post
    const reactionsByPost = {};
    result.recordset.forEach((row) => {
      const { PostID, ReactionType, ReactionCount } = row;
      if (!reactionsByPost[PostID]) {
        reactionsByPost[PostID] = {};
      }
      reactionsByPost[PostID][ReactionType] = ReactionCount;
    });

    res.json({ reactionsByPost });
    console.log(reactionsByPost);
  } catch (error) {
    console.error("Error fetching post reactions:", error);
    res.status(500).json({ error: "Error fetching post reactions" });
  }
};


exports.AddReaction = async (req, res) => {
  const { postId, username, email, platformId, reactionType } = req.body;

  try {
    // Perform whatever action you need with the reaction data
    console.log("Post ID:", postId);
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Platform ID:", platformId);
    console.log("Reaction Type:", reactionType);


    let reactionTypeValue;
    switch (reactionType) {
      case "angry":
        reactionTypeValue = 1;
        break;
      case "sad":
        reactionTypeValue = 2;
        break;
      case "wow":
        reactionTypeValue = 3;
        break;
      case "haha":
        reactionTypeValue = 4;
        break;
      case "like":
        reactionTypeValue = 5;
        break;
      case "love":
        reactionTypeValue = 6;
        break;
      default:
        reactionTypeValue = 5;
        break;
    }




    const pool = await mssql.connect();
    const result = await pool
      .request()
      .input("postId", mssql.Int, postId)
      .input("username", mssql.VarChar, username)
      .input("email", mssql.VarChar, email)
      .input("platformId", mssql.Int, platformId)
      .input("reactionTypeValue", mssql.Int, reactionTypeValue)
      .query(`
        INSERT INTO Reaction (PostID, EngagerID, ReactionType)
        VALUES (@postId, (SELECT EngagerID FROM Engager WHERE UserName = @username AND Email = @email), @reactionTypeValue);
      `);

    // Respond with success message
    res.json({ message: "Reaction added successfully" });
  } catch (error) {
    console.error("Error adding reaction:", error);
    res.status(500).json({ error: "Error adding reaction" });
  }
};
