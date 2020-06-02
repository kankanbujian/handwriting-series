---
description: Promise - hand writing
---

# Promise

其实可以将Promise，参考函数式编程中的容器和map的概念

```text
function Container(value) {
    this._value = value;
    function map(fn) {
        return new Container(fn(this._value));
    }
}

new Container(1).map((value) =>  value + 1) // Container(2)
```

将Promise看做容器，内部包含

a. state：状态等待中pending、成功fulfilled，失败rejected状态值;

b.  \_value：当前值

c. resolve，reject函数，提供给回调用于控制内部状态state的变化

d. Promise.prototype.then，then可以接受两个参数，前者用于promise状态变为fulfilled的回调，后者为状态变未reject的回调，同容器的map方法，产生一个新的promise容器。promise.then\(fn1, fn2\);  
catch则同then没区别，只不过他只接受一个参数promise.catch\(fn\) === promise.then\(null, fn\)  


这里很类似函数式编程中的Either容器

```text
function then(fn1, fn2) {
    if (this._state === 'reject') {
        return new Promise(fn2(this_value))
    } 
    return new Promise(f1(this_value))
}
```

```text
class Promise {
    constructor(cb) {
        this.cb = cb;
        this.state = 'pending',
        this._value;
        cb(this.resolve, this.reject);
    }
    resolve(value) {
        this.state = 'fullfilled';
        this.value = value;
    }
    reject(err) {
        this.state = 'reject';
        this.value = err;
    }
    then(cb) {
        return this;
    }
}
```

