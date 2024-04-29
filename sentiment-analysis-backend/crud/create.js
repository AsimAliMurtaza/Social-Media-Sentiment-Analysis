app.post("/data", (req, res) => {
    const formData = req.body;
    console.log("Received form data:", formData);
    // Handle the form data here (e.g., save it to a database)
    const request = new mssql.Request();
    request
      .query(
        `INSERT INTO users (id, username, role)
                    VALUES ('${formData.id}', '${formData.username}', '${formData.role}')`
      )
      .then(() => console.log("Data inserted successfully"))
      .catch((err) => console.error("Error inserting data:", err));
    res.status(200).send("Form data received successfully");
  });



  