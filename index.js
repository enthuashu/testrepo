const express = require("express");
const app = express();
const databseconnection = require("./connectors/db");
const USER_MODEL = require("./models/User");

app.use(express.json());

// post request
app.post("/registeremployee", async (req, res) => {
  try {
    // saving in db
    const { name, email, pin, age } = req.body;
    const newuser = new USER_MODEL({ name, email, pin, age });
    await newuser.save();
    res.json({ success: true, data: "User saved in db" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Get request
app.get("/employees", async (req, res) => {
  try {
    // filter tells which data u want
    // projection tells which which fields u want from data
    const users = await USER_MODEL.findOne(
      { name: "Ashutosh" },
      { name: 1, age: 1, _id: 0 }
    );
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// put request
app.put("/updateemployee", async (req, res) => {
  try {
    const { name, pin } = req.body;
    // findOneAndUpdate method is used to update data in db. First bracket tells which data to be updateed, and second bracket tells which update is to be done in dsatabase
    const updateuser = await USER_MODEL.findOneAndUpdate(
      { name }, // which user
      { pin } // what update
    );
    res.json({ success: true, message: "Updated successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// delete request
app.delete("/deleteemployee", async (req, res) => {
  try {
    const { name } = req.body;
    await USER_MODEL.findOneAndDelete({ name: name });
    res.json({ success: true, data: "All delete data" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

databseconnection();
app.listen(8000, () => console.log("Server is running at localhost:8000"));
