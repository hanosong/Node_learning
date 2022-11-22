const EventEmitter = require("events");
const ee = new EventEmitter();

// 1. once -- 只在第一次发射事件的时候进行监听 => 内部做了移除操作
ee.once("haha", () => {
  console.log("on监听haha");
});
ee.on("haha", () => {
  console.log("on监听haha2");
});

ee.prependListener("haha", () => {
  console.log("on监听haha3");
});

ee.emit("haha");
ee.emit("haha");
ee.emit("haha");
