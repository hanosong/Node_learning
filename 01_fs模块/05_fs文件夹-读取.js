const fs = require("fs");

// 读取文件
// 1. 读取文件夹，获取到的是文件夹中文件的字符串
// fs.readdir("./readtest", (err, files) => {
//   console.log(files, "files"); // [ 'aaa', 'bbb' ]
// });

// 2. 读取文件夹，并且获取文件夹中文件的信息
fs.readdir("./readtest", { withFileTypes: true }, (err, files) => {
  console.log(files, "files");
  /**
   * 2: 文件夹， 1：文件
   * [
        Dirent { name: 'aaa', [Symbol(type)]: 2 },
        Dirent { name: 'bbb', [Symbol(type)]: 2 }
     ] 
   */
});
