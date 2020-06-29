# 手写防抖

---
    debounce(func, [wait=0], [options={}])
    创建一个防抖函数，
    参数
    func (Function): 要防抖动的函数。
    [wait=0] (number): 需要延迟的毫秒数。
    [options={}] (Object): 选项对象。
    [options.leading=false] (boolean): 指定在延迟开始前调用。
    [options.maxWait] (number): 设置 func 允许被延迟的最大值。
    [options.trailing=true] (boolean): 指定在延迟结束后调用。
---



```
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
```
测试
```

```

