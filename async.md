---
    description: async - hand writing
---

#### what does asyns do ?
async return a promsie as result, and if use await inside, it will wait until the await return result;

```
    const async = function(fb) {
        var asyncCbs = [];
        var _value = null;
        function await(asyncFb, resolve) {
            resolve(asyncFb(_value));
        }
        fb();
        return new Promise((resolve, reject) => {
            
        }).then((res) => {

        })

    }
```