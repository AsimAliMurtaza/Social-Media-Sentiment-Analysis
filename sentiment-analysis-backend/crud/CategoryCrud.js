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

exports.CreateCategory = async (req, res) => {
  const { customCategory } = req.body; // Extract customCategory from the request body
  console.log("Category", req.body);
  try {
    const request = new mssql.Request();
    const result = await request.query(`
        INSERT INTO Category (CategoryName) VALUES ('${customCategory}')
      `);
    res.json({ message: "Category added" });
  } catch (error) {
    console.error("Error adding Category:", error);
    res.status(500).json({ error: "Error adding Category" });
  }
};

exports.DeleteCategory = async (req, res) => {
  const { CategoryID } = req.body;
  console.log(req);
  try {
    const request = new mssql.Request();
    const query = await request.query(`
          UPDATE Product SET CategoryID=9 WHERE CategoryID=${CategoryID}
      `);
    const result = await request.query(`
        Delete from Category where CategoryID = '${CategoryID}'
      `);
    res.json({ message: "Category Deleted" });
  } catch (error) {
    console.error("Error deleting Category:", error);
    res.status(500).json({ error: "Error deleting Category" });
  }
};

exports.EditCategory = async (req, res) => {
  const { CategoryID, CategoryName } = req.body;
  console.log("EditCategory", req.body);
  try {
    const request = new mssql.Request();
    const result2 = await request.query(
      `
        UPDATE Category SET CategoryName = '${CategoryName}' WHERE CategoryID = '${CategoryID}'
      `
    );
    res.json({ message: "Category updated" });
  } catch (error) {
    console.error("Error updating Category:", error);
    res.status(500).json({ error: "Error updating Category" });
  }
};
