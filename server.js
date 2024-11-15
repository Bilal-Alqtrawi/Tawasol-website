const express = require("express");
const connectDB = require("./config/db");

const app = express();
app.use(express.json()); // Parese Request From Client

// http://localhost:5000/api/users/createUser
// Explain: /api/users/ => main Url and every thing after that will read it from file who required it
app.use("/api/users", require("./routes/users"));
app.use("/api/profiles", require("./routes/profiles"));
app.use("/api/posts", require("./routes/posts"));
connectDB();

// Create Get API
// When call this API Will
app.get("/", (req, res) => res.send("Server Is Working Correctely"));

// In Hourko سيكون في env variable ,الأبلكيشن تبعي راح يقرأ هذا المتغير
const PORT = process.env.PORT || 5000; // Default 5000

// To Start Server run
// Callback function will execute  after listen start
app.listen(PORT, () => {
  console.log(`Server Start On PORT ${PORT}`);
});
