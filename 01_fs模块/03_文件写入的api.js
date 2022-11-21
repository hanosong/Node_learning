const fs = require("fs");

// 1. 有一段内容--> 客户端传过来的
const content = "hello word, i am sleppy";

// 2. 文件的写入操作
// 当路径不存在该文件时，会自动创建
// fs.writeFile("ccc.txt", content, {
//     encoding:'utf-8',
//     flag: 'w', //打开文件写入，默认值
// },(err) => {
//   if (err) return;
//   console.log("写入成功");
// });

fs.writeFile(
  "ccc.txt",
  content,
  {
    encoding: "utf-8",
    flag: "a", //打开文件写入，默认值
  },
  (err) => {
    if (err) return;
    console.log("写入成功");
  }
);
