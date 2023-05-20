require("dotenv").config();
// require("dotenv").config({ path: "/custom/path/to/.env" });
const { app } = require("./app");

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
