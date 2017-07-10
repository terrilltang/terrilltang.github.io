> ***闲时重新复习和整理一下 Object 对象的属性***



| `Object.prototype` 属性的属性特性：（听起来似乎有点拗口的样子） |       |
| ---------------------------------------- | ----- |
| writable（可写）                             | false |
| enumerable （可枚举）                         | false |
| configurable （可配置）                       | false |



#### Object.prototype(property)

Object.prototype 是 object 的一个原型对象，在 javascript 语言中，几乎所有的对象的方法和属性都继承自 Object.prototype ,继承者也都可以把继承来的方法全部覆盖重写，除了 Object.create(null) (以 null 为原型的对象，不存在原型和继承)



#### Object.prototype.\__proto__(property)

该属性包含一个 getter 和 setter 方法，读取或者设置对象的隐式原型对象

Object.prototype.\__proto__ 对象的隐式原型对象，访问对象内容的 [[prototype]] 

Object.prototype.\__proto__ `属性`等价于 ES6 中的 Object.getPrototypeOf 和 Object.setPrototypeOf `方法`

```javascript
var obj1=function(){}
obj1.b=3;
obj1.prototype.getb=function(){
  console.log(this.b);
}

var c=new obj2();
c.b=8;
c.getb()//8
//c的 __proto__ 继承自 Object
c.__proto__==obj1.prototype //true , Object.getPrototypeOf(c)==a.prototype


var obj2=function(){}

obj2.b=4;
obj2.prototype.getb=function(){
  console.log(this.b*this.b)
}

c.b=9;
c.__proto__=obj2.prototype; // Object.setPrototypeOf(c,d.prototype);
//d.prototype==Object {getb: function, constructor: function}
c.getb();
```



#### Object.prototype.constructor (property)

返回一个指向创建了该对象原型的函数引用。需要注意的是，该属性的值是那个函数本身，而不是一个包含函数名称的字符串。对于原始值（如1，`true` 或 "`test`"），该属性为只读。

```javascript
var obj3=function(){};
var tempObj=new obj3();
tempObj.constructor==obj3;
```


