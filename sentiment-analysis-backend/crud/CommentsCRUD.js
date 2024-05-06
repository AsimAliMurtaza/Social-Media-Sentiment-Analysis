const mssql = require("mssql/msnodesqlv8");

exports.CreateComment = async (req, res) => {
  try {
    const { commentContent, postId, username, email } = req.body;
    console.log("Comment", req.body);

    const pool = await mssql.connect();

    // Check if the Engager exists
    const checkIfExistsQuery = `
      SELECT EngagerID FROM Engager WHERE UserName = @username and Email = @email;
    `;
    const checkIfExistsResult = await pool
      .request()
      .input("username", mssql.VarChar, username)
      .input("email", mssql.VarChar, email)
      .query(checkIfExistsQuery);

    const engagerId = checkIfExistsResult.recordset[0]?.EngagerID;

    // Insert the comment if Engager exists
    if (engagerId) {
      const insertCommentQuery = `
        INSERT INTO PostComment (Content, EngagerID, PostID)
        VALUES (@commentContent, @engagerId, @postId);
      `;
      await pool
        .request()
        .input("commentContent", mssql.VarChar, commentContent)
        .input("engagerId", mssql.Int, engagerId)
        .input("postId", mssql.Int, postId)
        .query(insertCommentQuery);

      res.json({ message: "Comment added" });
    } else {
      res.status(404).json({ error: "Engager not found" });
    }
  } catch (error) {
    console.error("Error adding Comment:", error);
    res.status(500).json({ error: "Error adding Comment" });
  }
};
