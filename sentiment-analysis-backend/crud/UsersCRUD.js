const mssql = require("mssql/msnodesqlv8");

exports.ViewUsers = async (req, res) => {
  try {
    const result = await mssql.query(`
      SELECT Engager.UserName, Engager.Email, LookUp.LookUpName
      FROM Engager
      INNER JOIN LookUp ON Engager.Gender = LookUp.LookUpID;
    `);
    res.json(result.recordset);
    console.log("Users", result.recordset);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
};
