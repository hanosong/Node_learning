// events模块中的事件总线
const EventEmitter = require("events"); // 导入的是一个类

// 创建EventEmitter的实例
const emitter = new EventEmitter();

// 监听事件
emitter.on("haha", () => {
  console.log("监听haha事件"); // 2s 后打印监听haha事件
});

// 发射事件
setTimeout(() => {
  emitter.emit("haha");
}, 2000);
