const express = require("express");
const app = express();
const jobroutes = require("./routes/jobrouter");
const connectToDb = require("./config/mongodb");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
app.use(cors()); 
app.use(express.json());
app.use(jobroutes);

const PORT = process.env.PORT || 3001;
connectToDb; 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
