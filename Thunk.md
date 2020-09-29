
## Thunk

在调用函数时我们的传参可以是表达式，那么该表达式到底什么时候被运行？
 1. 传值调用: 顾名思义，在函数调用前将表达式的值计算出来传入函数。在上例子中也就是先计算a+2 = 3;然后调用fn(3);
 2. 传名调用: 直接将表达式传入函数体内，函数执行时才调用，也就是传入fn(a+2); 
```
    function fn(x) {
        return x + 1;
    }
    var a = 1;
    fn(a + 2);
```
Thunk也就是一种用于传名函数的实现。

```
    var a = 1;
    function thunk() {
        return a + 2;
    }
    function fn(t) {
        return t() + 1;
    }
    fn(thunk)
```