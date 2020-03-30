# 手写防抖

防抖动 

```text
function(funcName, time) {
    var timeout;
    return function () {
        if (timeout) {
            return ;
        }
        timeout = setTimeout(funcName, time);
    };
}
```

