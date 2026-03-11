import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

// Load environment variables
dotenv.config(); // Make sure this is not commented

const PORT = process.env.PORT;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    
    });
  })
  .catch((err) => {
    console.error("MONGODB CONNECTION FAILED !!!", err);
    
    process.exit(1); 
  });
