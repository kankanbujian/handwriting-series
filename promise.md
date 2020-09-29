---
    description: Promise - hand writing
---

# Promise

```
    new Promise((resolve, reject) => {
        setTimeout(() => {resolve('p1--resolve')}, 1000);
    }).then(res1 => {
        console.log('get--res--', res); 
        return 'p2--resolve';
    }).then(res2 => {console.log(res)});
```
看上述的小例子,我们来看promise的几个特质,看看如何来实现
1. 我们知道一点，promise一旦创建就会执行无法取消。
2. 其次我们可以看出作为一个promise容器，隐藏了所有的内部值，比如当前promise_state：状态等待中pending、成功fulfilled，失败rejected状态值; 以及内部_value;
3. Promise的参数为一个函数，其接受两个参数，resolve和reject方法，这两个方法用于改变promise内部状态。
4. 存在then方法,会在当前promise状态发生变化时，再异步回调then中的回调函数，也就是在resolve或reject调用后调用；因此显而易见我们应该有地方存储then中的回调，当执行resolve或reject的时候再去执行该回调。
```
    function Promise(excutor) {
        this._value = null;
        this._state = 'pending';
        this._fulfilledCbs = [];
        this._rejectedCbs = [];
        // 使用箭头函数可以让this绑定在词法作用域所定义的外层this也就是Promise，防止this乱指。
        const resolve = (value) => {
            this._state = 'fulfilled';
            this._value = value;
            this._fulfilledCbs.forEach( _cb => _cb(this._value));
        };
        const reject = (value) => {
            this._state = 'rejected';
            //... 同resolve
        };
        excutor(resolve, reject);
    }

    Promise.prototype.then = function(onFulfilled, onRejected) {
        if (this._state === 'fulfilled') { // 若状态为fulfilled则立即执行回调
            onFulfilled();
        }
        // 若状态为pending则立即执行回调则应将该回调存下来，当状态更改为fulfilled再去执行，因此增加一个_fulfilledCbs作为回调队列的缓存。
        if (this._state === 'pending') {
            this._fulfilledCbs.push(onFulfilled.bind(this)); 
        }
    }
    // test:
    new Promise((resolve, reject) => {
        setTimeout(() => {resolve('p1--resolve')}, 1000);
        console.log('p1---start');
    }).then(res1 => {
        console.log('get--res1--', res1); 
    })
    /* 
        output: 
        p1---start
        get--res1-- p1--resolve
    */
```
我们完成了promise的异步执行回调。
总体思路：
promise1创建 => promise1执行入参函数 => promise1.then执行  
这里promise1.then 判断promise1状态：'pending'则塞入_fulfilledCbs，'fulfilled'则执行回调。  
promise1执行入参函数异步执行完成 => 调用promise1.resolve => 更改内部状态、内部值 => 
调用promise1.then中塞入的_fulfilledCbs；  

### 链式实现
Promise在我看来就是函数式编程中的容器, 其then方法也就是容器中map的概念。可以通过map来根据传入的函数来对内部值进行修改，每次都返回一个新的容器来继续。想要了解函数式编程的入口：https://legacy.gitbook.com/book/llh911001/mostly-adequate-guide-chinese
```text
function Container(value) {
    this._value = value;
    function map(fn) {
        return new Container(fn(this._value));
    }
}
new Container(1).map(value =>  value + 1).map( value => value +2) // Container(4)
```
所以Promise应该可以通过then来返回新的promise实例，从而新的promise通过newPromise.then()构建下一个promise实例，以及配合自身的newPromise.resolve来更改自身状态从而继续推动整个promise链条执行， 用例如下：
```
    new Promise((resolve) => resolve('p1'))
    .then((res) => {
        console.log('p2---getRes=', res) // p1
        return 'p2';
    })
    .then((res) => {
        console.log('p3---getRes=', res)// p2
        console.log('p3')
    })
```
p1.constructor => p1入参执行异步函数 => p1.then(在这里创建新的promise) => p2.constructor => p2入参执行异步函数(也就是p1.then的回调) => p2.then(在这里创建新的promise3) => p1入参执行异步函数完成，p1.resolve || p1.reject执行 =>


```
Promise.prototype.then = function(onFulfilled, onRejected) {
    if (this._state === 'fulfilled') { // 若状态为fulfilled则立即执行回调
        return new Promise((resolve, reject) => {
            onFulfilled();
            resolve(this._value);
        })
    }
    // 若状态为pending则立即执行回调则应将该回调存下来，当状态更改为fulfilled再去执行，因此增加一个_fulfilledCbs作为回调队列的缓存。
    if (this._state === 'pending') {
        return = new Promise((resolve, reject) => {
            // 这里要注意需要将当前p2的resolve给传入到当前p1的this._fulfilledCbs中。当p2的构造函数入参执行完后将其调用p2.resolve改变其状态，resolve中继续执行p2._fulfilledCbs的回调，也就是完成p3
            this._fulfilledCbs.push({
                onFulfilled: onFulfilled.bind(this),
                resolve
            });
        })
    }
}

const resolve = (value) => {
    /* 若回调是个promise那么我们希望等待当前promise执行完，获取返回该promise的value，调用当前promise的resolve方法继续推动promise-chain。*/
    if (value && typeof value === 'object' ) {
        const then = value.then; 
        if (then && typeof then === 'function') {
            /* 
                这里注意了，相当于value是promise，value.then(this.resolve),则此时value的resolve执行后会执行this.resolve(value._value);
                从而即使等待value这个promise执行完，又返回了该promise的内部值_value;
            */
            then.call(value, this.resolve.bind(this));
            return;
        }
    }
    this._state = 'fulfilled';
    this._value = value;
    this._fulfilledCbs.forEach( _cb => {
        // 若当前then无回调，则将上一个promise的值作为值传递
        if (!_cb.onFilfilled) {
            _cb.resolve(this._value);
        }
        const cbRes = _cb.onFilfilled(this._value);
        _cb.resolve(cbRes);
    });
};

function Promise(excutor) {
        this._value = null;
        this._state = 'pending';
        this._fulfilledCbs = [];

        const resolve = (value) => {
            const then = value.then;
            if (typeof value === 'object' && then && typeof then === 'function') {
                // 若回调是个promise那么我们希望等待当前promise执行完，获取返回该promise的value，调用当前promise的resolve方法继续推动promise-chain。
                cbRes.then(this.resolve);
                return;
            }
            this._state = 'fulfilled';
            this._value = value;
            this._fulfilledCbs.forEach( _cb => {
                // 若当前then无回调，则将上一个promise的值作为值传递
                if (!_cb.onFilfilled) {
                    _cb.resolve(this._value);
                }
                const cbRes = _cb.onFilfilled(this._value);
                _cb.resolve(cbRes);
            });
        };

        const reject = (value) => {
            this._state = 'rejected';
            this._value = value;
        };
        excutor(resolve, reject);
}
```

