const mssql = require("mssql/msnodesqlv8");

// exports.CreateProfile = async (req, res) => {
//   const { username, platformID, email, gender } = req.body;

//   // console.log("Profile", req.body);

//   try {
//     const request = new mssql.Request();
//     // Check if the username or email already exists
//     const checkIfExistsQuery = `
//         SELECT EngagerID FROM Engager WHERE UserName = '${username}' and Email = '${email}';
//       `;

//     const checkIfExistsQuery2 = `SELECT [ProfileID] FROM [Profile] WHERE [ProfileName] = '${username}';`
//     const checkIfExistsResult = await request.query(checkIfExistsQuery);
//     const checkIfExistsResult2 = await request.query(checkIfExistsQuery2);
//     const existingEngagerId = checkIfExistsResult.recordset[0]?.EngagerId;
//     const existingProfileId = checkIfExistsResult2.recordset[0]?.ProfileID;

//     if (existingProfileId) {
//       res.json({ message: "Profile already exists", profileId: existingProfileId });
//     }
//     else if (existingEngagerId) {
//       // If the username or email already exists, return the existing engagerId
//       res.json({ message: "Engager/Admin already exists", engagerId: existingEngagerId });
//     } else {
//       let insertQuery = "";
//       let tableName = "";

//       if (email === null && gender === null) {
//         // Insert into Profile table only
//         tableName = "Profile";
//         insertQuery = `
//           INSERT INTO Profile (ProfileName, PlatformId) VALUES ('${username}', '${platformID}');
//           SELECT SCOPE_IDENTITY() AS ProfileId;
//         `;
//         const result = await request.query(insertQuery);
//         console.log(result);

//       } else {
//         // Insert into Engager table
//         tableName = "Engager";
//         // Assign value 9 for male and 10 for female
//         const genderValue = gender === "male" ? 9 : 10;
//         insertQuery = `
//           INSERT INTO Engager (UserName, Email, Gender)
//           VALUES ('${username}', '${email}', '${genderValue}');
//           SELECT SCOPE_IDENTITY() AS engagerId;
//         `;
//         const userid = `Select * from Engager where UserName = '${username}' AND Email = '${email}'`;
//         const result = await request.query(insertQuery);
//         const EngagerIDD = await request.query(userid);
//         console.log(EngagerIDD);
//       }

//       // Execute the insert query and get the engagerId
//       const result = await request.query(`Select * from Engager where UserName = '${username}' AND Email = '${email}'`);
//       const engagerId = result.recordset[0].EngagerID;
//       console.log(engagerId);

//       if (engagerId) {
//         res.json({ message: `${tableName} added`, engagerId });
//       } else {
//         res.status(500).json({ error: `Failed to add ${tableName}` });
//       }
//     }
//   } catch (error) {
//     console.error("Error adding Profile/Engager:", error);
//     res.status(500).json({ error: "Error adding Profile/Engager" });
//   }
// };

exports.CreateProfile = async (req, res) => {
  const { username, platformID, email, gender } = req.body;

  let genderValue;
  switch (gender) {
    case "male":
      genderValue = 9;
      break;
    case "female":
      genderValue = 10;
      break;
    default:
      genderValue = 11;
      break;
  }

  try {
    const pool = await mssql.connect();

    let result;
    if (email === null && gender === null) {
      result = await pool
        .request()
        .input("username", mssql.VarChar, username)
        .input("platformID", mssql.Int, platformID).query(`
          INSERT INTO Profile (ProfileName, PlatformId)
          VALUES (@username, @platformID);
          SELECT SCOPE_IDENTITY() AS ProfileId;
        `);
    } else {
      result = await pool
        .request()
        .input("username", mssql.VarChar, username)
        .input("email", mssql.VarChar, email)
        .input("gender", mssql.Int, genderValue).query(`
          INSERT INTO Engager (UserName, Email, Gender)
          VALUES (@username, @email, @gender);
          SELECT SCOPE_IDENTITY() AS EngagerId;
        `);
    }

    if (result.recordset.length > 0) {
      res.json({
        message:
          email === null && gender === null ? "Profile added" : "Engager added",
        id:
          email === null && gender === null
            ? result.recordset[0].ProfileId
            : result.recordset[0].EngagerId,
      });
    } else {
      res.status(500).json({ error: "Error adding Profile/Engager" });
    }
  } catch (error) {
    console.error("Error adding Profile/Engager:", error);
    res.status(500).json({ error: "Error adding Profile/Engager" });
  }
};
