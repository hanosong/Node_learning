// events模块中的事件总线
const EventEmitter = require("events"); // 导入的是一个类

// 创建EventEmitter的实例
const emitter = new EventEmitter();

// 监听事件
function handleHaFn() {
  console.log("监听haha事件");
}
emitter.on("haha", handleHaFn);

// 发射事件
setTimeout(() => {
  emitter.emit("haha");

  // 取消事件监听
  emitter.off("haha", handleHaFn);
}, 2000);
