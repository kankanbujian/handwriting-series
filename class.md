---
description: class --- hand writing
---
今天重看了es6里的class，发现类方法也就是静态方法，竟然能被继承。
```
    class Super {
        static staticFn() {
            console.log('I am a static function');
        };
    }
    class Sub extends Super {}
    Sub.staticFn(); //output:  I am a static function
```
瞬间回忆了一下es5，也就是通过改变原型链指进行继承而不是通过class语法糖的继承。
```
    function Super() {};
    Super.staticFn = function staticFn() {
        console.log('I am a static function');
    }
    function Sub() {};
    Sub.prototype = new Super();
    Sub.prototype.constructor =Sub;
    Sub.staticFn(); // output: Uncaught TypeError: Sub.staticFn is not a function
```
打开调试器一试，理所当然不行，要实现这样也简单
```
    Sub.staticFn = Super.staticFn;
```
于是就想去看看es6的class是如何实现的
```
    var Sub = /*#__PURE__*/function (_Super) {
    _inherits(Sub, _Super);

    var _super = _createSuper(Sub);

    function Sub() {
        _classCallCheck(this, Sub);

        return _super.apply(this, arguments);
    }

    return Sub;
    }(Super);

    Sub.staticFn(); 
```
核心代码如上，我们来分布拆解
```
    /*
        1、将子类原型成为父类的实例，从而可以通过原型链继承父类中原型的方法。
    */
    function _inherits(subClass, superClass) {
        subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); 
        if (superClass) _setPrototypeOf(subClass, superClass); 
    }
    /*
        这里还有es6的继承可以继承静态方法的重要语句,相当于让Super构造函数成为了Sub构造函数的原型，使得Sub也继承了Super即subClass.__proto__ = superClass;
        则当Sub.staticFn在Sub中找不到staticFn方法时也能通过其原型链subClass.__proto__在superClass找到staticFn，
    */
    _setPrototypeOf(subClass, superClass);
```
![Alt text](https://github.com/kankanbujian/handwriting-series/blob/master/illustrations/class_extends.svg)
