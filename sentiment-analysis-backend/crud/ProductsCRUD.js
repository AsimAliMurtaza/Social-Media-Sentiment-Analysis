const mssql = require("mssql/msnodesqlv8");

exports.ViewProducts = async (req, res) => {
  try {
    const result = await mssql.query(`
      SELECT p.ProductID, p.ProductName, c.CategoryName
      FROM Product p
      JOIN Category c ON p.CategoryID = c.CategoryID;
    `);
    res.json(result.recordset);
    console.log("ViewProducts", result.recordset);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Error fetching products" });
  }
};


exports.EditProduct = async (req, res) => {
  const { ProductID, ProductName, category } = req.body;
  const newCategoryName = category.CategoryName;
  console.log("EditProduct", req.body);
  try {
    const request = new mssql.Request();
    const result = await request.query(`
      Select CategoryID from Category where CategoryName = '${newCategoryName}'
    `);
    const result2 = await request.query(`
    Update Product set ProductName = '${ProductName}', CategoryID = '${result.recordset[0].CategoryID}' where ProductID = '${ProductID}'
    `);
    res.json({ message: "Product updated" });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Error updating product" });
  }
}

exports.CreateProduct = async (req, res) => {
  const { productName, category } = req.body;
  const newCategoryName = category.CategoryID;
  console.log("Products", req.body);
  try {
    const request = new mssql.Request();
    const result = await request.query(`
      Insert into Product (ProductName, CategoryID) values ('${productName}', '${newCategoryName}')
    `);
    res.json({ message: "Product added" });
  } catch (error) {
    console.error("Error added product:", error);
    res.status(500).json({ error: "Error adding product" });
  }
}


exports.DeleteProduct = async (req, res) => {
  const { ProductID } = req.body;
  console.log(req)
  try {
    const request = new mssql.Request();
    const query = await request.query(`
        UPDATE POST SET ProductID=19032 WHERE ProductID=${ProductID}
    `); 
    const result = await request.query(`
      Delete from Product where ProductID = '${ProductID}'
    `);
    res.json({ message: "Product Deleted" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Error deleting product" });
  }
} 