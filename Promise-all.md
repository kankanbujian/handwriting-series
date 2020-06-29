---
description: Promise - all
---

```
    Promise.prototype.all = function(...promiseArr) {
        const resultArr = [];
        let count = 0;
        return Promise((resolve, reject) => {
            promiseArr.forEach((_p, _i) => {
                _p.then(res => {
                    resultArr[_i] = res;
                    if (++count === promiseArr.length) {

                    }
                }).catch(e => {
                    reject(e);
                })
            })
        });
    }
```