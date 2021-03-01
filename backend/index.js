const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

// Connect Database

connectDB();

// Init middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("API running!");
});

app.use("/users", require("./routes/users"));
app.use("/auth", require("./routes/auth"));
app.use("/posts", require("./routes/posts"));
app.use("/doctors", require("./routes/doctor"));



const port = process.env.PORT || "5000";

app.listen(port, () => console.log(`Server started on port ${port}`));
