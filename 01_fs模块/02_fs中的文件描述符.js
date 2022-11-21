const fs = require("fs");

// 打开一个文件
fs.open("./bbb.txt", (err, fd) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(fd, "fd"); // 获取文件描述符
  //   fs.readFile(fd); // 通过文件描述符读取文件内容
  fs.fstat(3, (err, stats) => {
    // 读取文件详细信息
    if (err) return;
    console.log(stats, "当前文件的相关状态");
    fs.close(fd); // 手动关闭
  });
});
