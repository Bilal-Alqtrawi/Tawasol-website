const express = require("express");

const app = express();

// Create Get API
// When call this API Will
app.get("/", (req, res) => res.send("Server Is Working Correctely"));

// In Hourko سيكون في env variable ,الأبلكيشن تبعي راح يقرأ هذا المتغير
const PORT = process.env.PORT || 5000; // Default 5000

// To Start Server run
// Callback function will execute after listen start
app.listen(PORT, () => {
  console.log(`Server Start On PORT ${PORT}`);
});
