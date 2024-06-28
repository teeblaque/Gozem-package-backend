const app = require("./src/app");
const port = process.env.PORT || 9000;

//start the server
init();

async function init() {
  try {
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (error) {
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}
