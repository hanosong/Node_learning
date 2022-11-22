# Node.js 是什么

> 是一个基于 V8 JS 引擎的 JS 运行时环境

```markdown
// 浏览器的内核
目的：渲染页面，解析代码
=> 浏览器的排版引擎(layout engine)：包含 js 引擎
// 什么是 JS 运行环境
// 为什么 JS 需要特别的运行环境 / 为什么是 JS 引擎
需要 JS 引擎将 JS 代码翻译成 CPU 指令来执行
// 什么是 V8
Google 开发的 JS 引擎，Chrome 浏览器内置
使用 C++编写，是 JS 和 webAssmebly 引擎
// 引擎和内核的关系
以 webKit 内核为例： webKit = webCore + JScore
webCore： 负责 HTML 解析，布局，渲染
JScore： 解析，执行 JS 代码
```

- 渲染引擎工作流程 / 浏览器解析过程

```
// 为什么不能异步加载执行JS代码
1. JS代码可以操作DOM
2. 浏览器希望能将HTML解析的的DOM和JS操作之后的DOM放到一起生成最终的DOM树，而不是频繁的生成
```

## 浏览器和 Node.js 架构区别

通过中间件（libuv）----连接 v8 引擎和系统调用之间的桥梁----进行操作系统的操作

- 编写的 JS 代码，会经过 v8 引擎，再通过 Node.js 的 Bindings，将任务放到 Libuv 的事件循环中

* Libuv -- unicorn velociraptor 独角伶盗龙，是使用 C 编写的库
* Libuv 提供了事件循环，文件系统读写，网络 IO，线程池等等内容

### 内置模块 fs

> fs --> file system 文件系统
> 借助于 Node 帮我们封装的文件系统，我们可以在任何操作系统上去直接操作文件
> 这就是 node 可以开发服务器的一大原因，并且可以成为前端自动化脚本的热门工具

#### fs 的 API

1. API 提供的三种基本操作方式
   1.1 同步操作文件
   1.2 异步回调函数操作文件，代码不会被阻塞，需要传入回调函数，当获取到结果时，回调函数执行
   1.3 异步 Promise 操作文件，代码不会被阻塞， 通过 fs.promise 方法调用，返回一个 promise，可以通过 then，catch 进行处理

##### 文件描述符 -- fs.readFile 底层实现

file descriptors --- 读取文件时的底层操作

> 常见操作系统上，对于每一个进程，内核都维护着一张当前打开着的文件和资源的表格
> 每个打开的文件都分配了一个成为文件描述符的简单的数字标识符
> 在系统层，所有文件系统操作都使用这些文件描述符来标识和跟踪每个特定的文件
> windows 系统使用了一个虽然不同但概念上类似的机制来跟踪资源

- node 为所有打开的文件分配了一个数字型的文件描述符

* 通过文件描述符打开的文件，默认不会被关闭，需要手动关闭文件 fs.close/结束进程

### 文件的读写

> 注意： 写入的编码格式和读取的编码格式必须保持一致

```js
fs.readFile(path[,options], callback); // 读取文件的内容
fs.writeFile(file,data[,options], callback); // 在文件中写入内容

// option参数--对象
{
    flag:写入的方式 // //打开文件写入，默认值‘w’
    encoding：字符的编码 // 不写默认utf8
}

// flag的参数
w -> 打开文件写入，覆盖操作
w+ -> 可读可写，不存在则创建文件
r -> 读，读取时的默认值
r+ -> 读写，不存在则抛出异常
a -> append,追加写入内容，不存在则创建
a+ -> append,追加写入内容，可读可写，不存在则创建
```

```js
// 如果文件夹里套了多层文件夹 --> 递归操作
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
```

### 文件夹/文件的重命名

```js
// 参数1: oldpath; 参数2：newpath
fs.rename("./rename", "./newname", (err) => {
  console.log(err, "重命名失败"); // null ---> 重命名成功
});
```

## events 模块

- Node 中的核心 api 都是基于异步的事件驱动 ---> 比如客户端上传图片，是以流的形式一步一步传过来的 => 是一点一点读到的，每读到一点，触发一次回调
  - 在这个体系中，某些对象（发射器--Emitters）发出某一个事件
  - 我们可以监听这个事件（监听器 Listeners），并且传入的回调函数，这个回调函数会在监听到事件时被调用

> 等同于 eventBus

### events 常见的方法

- EventEmitter 的实例有一些属性，可以记录一些信息

1. emitter.eventNames() --- 返回当前 EventEmitter 对象注册的事件字符串数组
2. emitter.getMaxListeners() --- 返回当前 EventEmitter 对象的最大监听器数量，可以通过 setMaxListeners()来修改，默认是 10
3. emitter.listenerCount(事件名称) --- 返回当前 EventEmitter 对象某一个事件名称，监听器的个数
4. emitter.listeners(事件名称) --- 返回当前 EventEmitter 对象某个事件监听器上所有的监听器数组

5. emitter.once(eventName,listener) --- 事件监听一次
6. emitter.prependListener() --- 将监听事件添加到最前面
7. emitter.prependOnceListener() --- 将监听事件添加到最前面，但是只监听一次
8. emitter.removeAllListeners([eventName]) --- 无参数：移除所有事件监听，有参数：只移除传递的事件名称的事件监听
