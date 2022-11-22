const EventEmitter = require("events");
const ee = new EventEmitter();

ee.on("haha", () => {});
ee.on("haha", () => {});
ee.on("haha", () => {});
ee.on("haha", () => {});
ee.on("james", () => {});
ee.on("james", () => {});

// 1.获取所有监听事件的名称
console.log(ee.eventNames()); // [ 'haha', 'james' ]

// 2.获取监听器最大的监听个数
console.log(ee.getMaxListeners()); // 10

// 3.获取某一个事件名称对应的监听个数
console.log(ee.listenerCount("haha")); // 4

// 4.获取某一个事件名称对应的监听器函数（数组）
console.log(ee.listeners("haha")); // 拿到4个匿名函数Function (anonymous)数组
/**
 * [
    [Function (anonymous)],
    [Function (anonymous)],
    [Function (anonymous)],
    [Function (anonymous)]
    ]
 */
