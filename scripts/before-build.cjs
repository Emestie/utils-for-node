const fse = require("fs-extra");

fse.removeSync("./dist");

console.log("before-build : done");
