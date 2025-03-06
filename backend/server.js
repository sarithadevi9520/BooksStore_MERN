const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bookRoutes = require("./routes/bookRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection (without env)
mongoose
  .connect("mongodb://localhost:27017/bookstore") 
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((error) => console.error("❌ MongoDB Connection Error:", error.message));



app.get("/", (req, res) => {
    res.send("Welcome to the Bookstore API");
 });
// Routes
app.use("/api", bookRoutes);

const PORT = 5001;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
