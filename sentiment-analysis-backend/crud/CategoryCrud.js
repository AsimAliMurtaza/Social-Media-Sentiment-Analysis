const mssql = require("mssql/msnodesqlv8");

exports.ViewCategory = async (req, res) => {
  try {
    const result = await mssql.query(`
      SELECT * from Category;
    `);
    res.json(result.recordset);
    console.log("Category", result.recordset);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Error fetching categories" });
  }
};