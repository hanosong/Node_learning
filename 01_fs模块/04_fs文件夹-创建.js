const fs = require("fs");

// 创建文件夹  dir --> directory
fs.mkdir("./haha", (err) => {
  console.log(err); // null
});
