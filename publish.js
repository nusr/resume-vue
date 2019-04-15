const fs = require("fs");
fs.copyFile("./dist/index.html", "./index.html", error => {
  if (error) {
    console.log(error);
  }
});
