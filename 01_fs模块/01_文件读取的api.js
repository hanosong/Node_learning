const fs = require("fs"); // node中使用单独的模块，要单独导入--浏览器不认识requi

// 1. 同步读取 --- 代码阻塞
const result = fs.readFileSync("./abc.txt", {
  encoding: "utf-8", // 如果不传，则默认为2进制文件读取---自动会转成16进制Buffer
});
// console.log(result, "同步读取成功");
// console.log("必须等待前面结束，才会打印");

// 2. 异步读取 --- 回调地狱

// fs.readFile(
//   "./abc.txt",
//   {
//     encoding: "utf-8",
//   },
//   (err, data) => {
//     // err： 读取文件错误
//     if (err) {
//       new Error("文件读取错误");
//       console.log(err);
//       return;
//     }
//     console.log(data, "读取成功");
//   }
// );
console.log("后续代码正在进行");

// 3. 异步读取 --- promise
fs.promises
  .readFile("./abc.txt", {
    encoding: "utf8",
  })
  .then((res) => {
    console.log(res, "编码成功");
  })
  .catch((res) => {
    console.log(res, "err");
  });

// 监听
//   http.creatSearver();
