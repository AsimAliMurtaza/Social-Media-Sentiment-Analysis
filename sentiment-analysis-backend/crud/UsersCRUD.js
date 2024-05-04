const mssql = require("mssql/msnodesqlv8");

exports.ViewUsers = async (req, res) => {
  try {
    const result = await mssql.query(`
      SELECT EngagerID, Engager.UserName, Engager.Email, LookUp.LookUpName
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

exports.CreateUser = async (req, res) => {
  try {
    const { UserName, Email, Gender } = req.body;
    console.log("User", req.body);

    const request = new mssql.Request();
    const result = await request.query(`
            INSERT INTO Engager (UserName, Email, Gender)
            VALUES ('${UserName}', '${Email}', (SELECT LookUpID FROM LookUp WHERE LookUpName = '${Gender}'))
        `);

    res.json({ message: "User added" });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Error adding user" });
  }
};

exports.DeleteUser = async (req, res) => {
  const { EngagerID } = req.body;
  console.log(req);
  try {
    const request = new mssql.Request();

    const result = await request.query(`
        Delete from Engager where EngagerID = '${EngagerID}'
      `);
    res.json({ message: "Engager Deleted" });
  } catch (error) {
    console.error("Error deleting Engager:", error);
    res.status(500).json({ error: "Error deleting Engager" });
  }
};

exports.EditUser = async (req, res) => {
    const { EngagerID, UserName, Email, Gender } = req.body;
    console.log("EditUser", req.body);
    try {
      const request = new mssql.Request();
      const result = await request.query(`
          Update Engager set UserName = '${UserName}', Email = '${Email}', 
          Gender = (SELECT LookUpID FROM LookUp WHERE LookUpName = '${Gender}') where EngagerID = '${EngagerID}'
          `);
      res.json({ message: "User updated" });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Error updating user" });
    }
  };
  