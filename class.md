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
        var _this;

        _classCallCheck(this, Sub);

        _this = _super.call(this);
        _this.name = 'Sub';
        return _this;
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
![avator](https://github.com/kankanbujian/handwriting-series/blob/master/illustrations/class_extends.png)

```
    // 这里实际是看是否支持反射来获取了父类的构造方法
    function _createSuper(Derived) { 
        var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { 
            var Super = _getPrototypeOf(Derived), result; 
            if (hasNativeReflectConstruct) { 
                var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); 
            } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); 
        }; 
    }
    // 最后也就是先执行父类构造函数来继承父类的属性，然后再执行自己本身的构造函数初始化自身。
    function Sub() {
        var _this;

        _classCallCheck(this, Sub);

        _this = _super.call(this);
        _this.name = 'Sub';
        return _this;
    }

    return Sub;
```
总结： 所以我们可以看到class的继承做了这几件事情：
1. 将来子类构造器的prototype指向父类，也就是将子类实例的原型链；__proto__属性指向父类原型，从而获取到父类的方法。
此外，通过setPrototype(Sub, Super)会将子类构造器的原型链指向父类构造器，从而将父类的静态方法继承过来。
2. 获取到父类的构造函数，待子类实例化时候调用。
3. 子类实例化时，也就是子类构造器执行时，先执行父类构造器方法，从而继承父类构造器中执行的属性。然后再执行自己构造器中的代码，获取自身属性。

想到这里我又回想了一下es5中的继承实现，索性也做个总结。
1. 在子类构造函数先执行父类构造函数，从而获取属性的继承。再执行自身的构造函数
```
    function Sub() {
        Super.call(this, arguments);
        this.subProps = ....;
    }
```
2. 将子类的原型指向父类原型，从而通过原型链继承到父类原型中的方法。
```
    Sub.prototype = new Super() // 当然也可以 Object.create(Super.prototype);
    /* 
        切记，这样的话Sub.prototype指向Super原型，因此Sub.prototype.constructor会指向Super.prototype.constructor也就是Super，所以需要修改constructor
    */
    Sub.prototype.constructor = Sub;
```
