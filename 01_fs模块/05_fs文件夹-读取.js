const fs = require("fs");

// 读取文件
// 1. 读取文件夹，获取到的是文件夹中文件的字符串
// fs.readdir("./readtest", (err, files) => {
//   console.log(files, "files"); // [ 'aaa', 'bbb' ]
// });

// 2. 读取文件夹，并且获取文件夹中文件的信息
// fs.readdir("./readtest", { withFileTypes: true }, (err, files) => {
//   console.log(files, "files");
//   /**
//    * 2: 文件夹， 1：文件
//    * [
//         Dirent { name: 'aaa', [Symbol(type)]: 2 },
//         Dirent { name: 'bbb', [Symbol(type)]: 2 }
//      ]
//    */
// });

// 2.2 如果文件夹里套了多层文件夹 --> 递归操作
function readDirectory(path) {
  fs.readdir(path, { withFileTypes: true }, (err, files) => {
    files.forEach((item) => {
      // 如果拿到的又是一个文件夹
      if (item.isDirectory()) {
        readDirectory(`${path}/${item.name}`);
      } else {
        console.log("获取到文件的名字是:", item.name);
      }
    });
  });
}

readDirectory("./readtest");
// 获取到文件的名字是: aaa.txt
// 获取到文件的名字是: bbb.txt
// 获取到文件的名字是: ccc.tst
