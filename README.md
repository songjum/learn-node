# learn-node
leran nodeJS and coding some demo
1、基于commonJs 规范，实现模块管理系统
2、npm包管理工具
3、控制并发
async  控制并发
async(https://github.com/caolan/async ) 的使用
详细的 async demo 演示：https://github.com/alsotang/async_demo

 async 的 mapLimit(arr, limit, iterator, callback) 接口

常用的控制并发连接数的接口 queue(worker, concurrency)

当你需要去多个源(一般是小于 10 个)汇总数据的时候，用 eventproxy 方便；当你需要用到队列，需要控制并发数，或者你喜欢函数式编程思维时，使用 async。

4、测试用例：mocha，should，istanbul
main.js: 其中有个 fibonacci 函数。fibonacci 的介绍见：http://en.wikipedia.org/wiki/Fibonacci_number 
	1. 学习使用测试框架 mocha : http://mochajs.org/
	2. 学习使用断言库 should : https://github.com/tj/should.js
	3. 学习使用测试率覆盖工具 istanbul : https://github.com/gotwarlost/istanbul
	简单 Makefile 的编写 : http://blog.csdn.net/haoel/article/details/2886
	
5、nodemon  node监控代码变化自动重启
6、《正则表达式30分钟入门教程》：http://deerchao.net/tutorials/regex/regex.htm
7、《正则表达式之：零宽断言不『消费』》：http://fxck.it/post/50558232873
8、s 中的正则表达式与 pcre(http://en.wikipedia.org/wiki/Perl_Compatible_Regular_Expressions ) 的区别
