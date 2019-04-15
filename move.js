const fs = require("fs");
fs.copyFile("./dist/index.html", "./index.html", error => {
  if (error) {
    console.log(error);
    throw new Error("move index.html failed,please run `npm run build` first!");
  }
});
