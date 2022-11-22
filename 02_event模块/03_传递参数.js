// events模块中的事件总线
const EventEmitter = require("events"); // 导入的是一个类

// 创建EventEmitter的实例
const emitter = new EventEmitter();

// 监听事件 --- 也可以直接用参数接收 => handleHaFn(name，age)
function handleHaFn(...args) {
  console.log("监听haha事件", args);
}
emitter.on("haha", handleHaFn);

// 发射事件的同时传递参数  "hanosong", 18
setTimeout(() => {
  emitter.emit("haha", "hanosong", 18);

  // 取消事件监听
  emitter.off("haha", handleHaFn);
}, 2000);
