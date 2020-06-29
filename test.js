
// Promise.prototype.then = function(onFulfilled, onRejected) {
//     if (this._state === 'fulfilled') { // 若状态为fulfilled则立即执行回调
//         return new Promise((resolve, reject) => {
//             onFulfilled(this._value);
//             resolve(this._value);
//         })
//     }
//     // 若状态为pending则立即执行回调则应将该回调存下来，当状态更改为fulfilled再去执行，因此增加一个_fulfilledCbs作为回调队列的缓存。
//     if (this._state === 'pending') {
//         return new Promise((resolve, reject) => {
//             // 这里要注意需要将当前p2的resolve给传入到当前p1的this._fulfilledCbs中。当p2的构造函数入参执行完后将其调用p2.resolve改变其状态，resolve中继续执行p2._fulfilledCbs的回调，也就是完成p3
//             this._fulfilledCbs.push({
//                 onFulfilled: onFulfilled.bind(this),
//                 resolve
//             });
//         })
//     }
// }

// function Promise(excutor) {
//         this._value = null;
//         this._state = 'pending';
//         this._fulfilledCbs = [];

//         const resolve = (value) => {
//             const then = value.then;
//             if (typeof value === 'object' && then && typeof then === 'function') {
//                 // 若回调是个promise那么我们希望等待当前promise执行完，获取返回该promise的value，调用当前promise的resolve方法继续推动promise-chain。
//                 cbRes.then(this.resolve);
//                 return;
//             }
//             this._state = 'fulfilled';
//             this._value = value;
//             this._fulfilledCbs.forEach( _cb => {
//                 // 若当前then无回调，则将上一个promise的值作为值传递
//                 if (!_cb.onFilfilled) {
//                     _cb.resolve(this._value);
//                 }
//                 const cbRes = _cb.onFilfilled(this._value);
//                 _cb.resolve(cbRes);
//             });
//         };

//         const reject = (value) => {
//             this._state = 'rejected';
//             this._value = value;
//         };
//         excutor(resolve, reject);
// }

// Promise.all = function(promiseArr) {
//     const resultArr = [];
//     let count = 0;
    
//     // console.log(promiseArr[0]);
//     // console.log(promiseArr[0].then);
//     return new Promise((resolve, reject) => {
//         promiseArr.forEach((_p, _i) => {
//             console.log('_p', _p);
//             console.log('_p.prototype', _p.constructor === Promise);
//             _p.then(res => {
//                 console.log('res--', res);
//                 resultArr[_i] = res;
//                 if (++count === promiseArr.length) {
//                     console.log(resultArr);
//                     resolve(resultArr);
//                 }
//             })
//         })
//     });
// }
// // new Promise((resolve) => resolve('p1'))
// //     .then((res) => {
// //         console.log('p2---getRes=', res) // p1
// //         return 'p2';
// //     })
// //     .then((res) => {
// //         console.log('p3---getRes=', res)// p2
// //         console.log('p3')
// //         return 'p3';
// //     })
// //     console.log('test-- end')
// // new Promise((resolve) => resolve('p1')).then(res => {
// //     console.log('res------------', res);
// // }) 
// // console.log()
// Promise.all([new Promise((resolve) => resolve('p1')), new Promise((resolve) => resolve('p2'))]).then(resps => {
//     console.log('resps', resps);
// })


function debounce(funcName, wait, options = {}) {
    var timeout;
    return function (...args) {
        var later = () => {
            timeout = null;
            funcName.call(this, args);
        };
        if (!timeout && options.leading) {
            console.log('options.leading', options.leading);
            funcName.call(this, args);
            later = () => {
                timeout = null;
            };
        }
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

var a = debounce(() => {console.log('111'), 4000});
a();
a();a();a();

setTimeout(a, 2000);