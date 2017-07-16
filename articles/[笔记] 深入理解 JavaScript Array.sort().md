> Array.sort() 方法排序，默认为升序排序，如 `1，2，3，4` 这样的排列，可以传一个`对比方法`做为排序的参数，也可以不传，则为按照字符的逐个 unicode 排序。

#### 简单默认排序

第一步，创建一个 array.sort.js, 里面写下以下内容并保存

```javascript
let array_a=[1,12,11,123,9,10,2];声明一个数字数组

array_a.sort();
//调用数组排序

console.log(array_a);
//输出排序后的数组
```

第二步，在命令行下运行

```shell
node array.sort.js
```

第三步，查看运行结果

```shell
[ 1, 10, 11, 12, 123, 2, 9 ]
```



**笔记**

1. 纯数字的数组的排序结果，并没有按照 `1，2，9，10，11，12，123`这样输出。
2. Arrary 的默认排序是按照字符的 unicode point 来排序，字符的第一位 unicode 越小，该字符越靠前，排序后的字符在数组中相应的索引值越小。
3. 字符首位相同的情况下，第二位 unicode 越小，相应字符更靠前。



以上涉及到一个字符的 unicode 转换问题，这里不多扩展，写一段代码运行过程做笔记

```javascript
let str1='1',str2='中国',unicode_arr=[];
console.log(str1.charCodeAt(0));//0 代表字符中的第一位，str1 是只有长度 1 的字符; 输出 '49'

for(let i=0;i<str2.length;i++){//字符长度为不确定时
  let temp_str=str2.charCodeAt(i);
  unicode_arr.push(temp_str);//放入一个数组中。
  console.log(temp_str);
}

/**** 转 unicode 为字符 ****/

let str3='';
for(let i=0;i<unicode_arr.length;i++){
  let temp_str=String.fromCharCode(unicode_arr[i]);
  str3+=temp_str;
  console.log(temp_str);
}

console.log(str3);//输出 '中国'

```





#### 传入`对比方法`排序

第一步，在以上的代码基础上，追加下面的代码到 array.sort.js 中

```javascript
let array_b=[
  {key:0,val:9},
  {key:1,val:6},
  {key:2,val:8},
  {key:3,val:7},
  {key:4,val:9},
  {key:5,val:10}
];
```

第二步，添加以下`对比方法`做数组 array_b 的排序

```javascript

array_b.sort((a,b)=>{
  
  console.log(`array_b now is: --  ${JSON.stringify(array_b)}`);
  //输出上一轮排序后的数组，第一次运行未排序
  
  console.log(`current a is: --  ${JSON.stringify(a)}`);
  //对比中的 a 是数组 array_b 中的哪一个
  console.log(`a's index is:-- ${array_b.indexOf(a)}`);
  //对比中的 a 在数组中的索引值
  
  console.log(`current b is: -- ${JSON.stringify(b)}`);
  //对比中的 b 是数组 array_b 中的哪一个
  console.log(`b's index is: -- ${array_b.indexOf(b)}`);
  //对比中的 b 在数组中的索引值

  console.log(b.val-a.val);
  //输出方法返回值
  
  return b.val-a.val;
  //对比方法返回值，采用了降序排列
  //如果大于 0，a 的索引值要大于 b 的索引值，
  //如果小于 0，a 的索引值要小于 b 的索引值，
  //如果行于 0，a，b 的索引值都保持不变
  
});

console.log(array_b);//查看排序结果
/*[ 
  { key: 5, val: 10 },
  { key: 0, val: 9 },
  { key: 4, val: 9 },
  { key: 2, val: 8 },
  { key: 3, val: 7 },
  { key: 1, val: 6 } 
]*/
```

第三步，运行以下命令行

```shell
node array.sort.js
```

第四步，查看排序过程

```Javascript
array_b now is:--  [{"key":0,"val":9},{"key":1,"val":6},{"key":2,"val":8},{"key":3,"val":7},{"key":4,"val":9},{"key":5,"val":10}]
//数组初始化时。

current a is:--  {"key":0,"val":9}
a index is:-- 0
current b is:-- {"key":1,"val":6}
b index is:-- 1
-3
//开始从数组索引 0 开始，与索引 1 对比。

array_b now is:--  [{"key":0,"val":9},{"key":1,"val":6},{"key":2,"val":8},{"key":3,"val":7},{"key":4,"val":9},{"key":5,"val":10}]
//第一次运行后，返回值为 -3， 小于 0 ，所以 a,b 的索引值未变化，a index < b index。

current a is:--  {"key":1,"val":6}
a index is:-- 1
current b is:-- {"key":2,"val":8}
b index is:-- 2
2
//开始从数组索引 1 开始，与索引 2 对比。

array_b now is:--  [{"key":0,"val":9},{"key":1,"val":6},{"key":1,"val":6},{"key":3,"val":7},{"key":4,"val":9},{"key":5,"val":10}]
//第二次运行后，由于返回值为 2，大于 0，所以 索引 1 的值暂时填充索引 2 的值，并把索引 2 的值从数组中取出，与数组中比索引 1 小的索引 0 的值对比，在对比稳定后，确定取出的索引 2 的值 放在数组的索引 1，或者索引 2 的位置

current a is:--  {"key":0,"val":9}
a index is:-- 0
current b is:-- {"key":2,"val":8}
b index is:-- -1
-1
//开始从数组索引 0 开始与取出的原索引 2 对比。

array_b now is:--  [{"key":0,"val":9},{"key":2,"val":8},{"key":1,"val":6},{"key":3,"val":7},{"key":4,"val":9},{"key":5,"val":10}]
//第三次运行后，由于返回值为 -1，小于 0，所以索引 0 保持不变，取出的原索引 2，变为数组索引 1

current a is:--  {"key":1,"val":6}
a index is:-- 2
current b is:-- {"key":3,"val":7}
b index is:-- 3
1
//最后一次的索引起始为 1，在第二次，第三次对比稳定后，从数组索引 2 开始与索引 3 对比

array_b now is:--  [{"key":0,"val":9},{"key":2,"val":8},{"key":1,"val":6},{"key":1,"val":6},{"key":4,"val":9},{"key":5,"val":10}]
//第四次运行后，由于返回值为 1，大于 0，索引 2 与索引 3 要发生索引对换，取出索引 3 ，并由索引 2 填充索引 3 的位置，

current a is:--  {"key":2,"val":8}
a index is:-- 1
current b is:-- {"key":3,"val":7}
b index is:-- -1
-1
//开始从比索引 2 小的索引 1 与取出的原索引 3 对比。

array_b now is:--  [{"key":0,"val":9},{"key":2,"val":8},{"key":3,"val":7},{"key":1,"val":6},{"key":4,"val":9},{"key":5,"val":10}]
//第五次运行后，对比稳定后，取出的索引 3 放在数组索引 2 的位置

current a is:--  {"key":1,"val":6}
a index is:-- 3
current b is:-- {"key":4,"val":9}
b index is:-- 4
3
//从索引 3 开始与索引 4 对比

array_b now is:--  [{"key":0,"val":9},{"key":2,"val":8},{"key":3,"val":7},{"key":1,"val":6},{"key":1,"val":6},{"key":5,"val":10}]
//第六次运行后，取出索引 4 ，由索引 3 填充索引 4

current a is:--  {"key":3,"val":7}
a index is:-- 2
current b is:-- {"key":4,"val":9}
b index is:-- -1
2
//索引 2 与原索引 4 对比

array_b now is:--  [{"key":0,"val":9},{"key":2,"val":8},{"key":3,"val":7},{"key":3,"val":7},{"key":1,"val":6},{"key":5,"val":10}]
//第七次运行后，原索引 4 比索引 2 要大，索引 3，由索引 2 填充，索引 3 与索引 2 等待对比稳定后确定

current a is:--  {"key":2,"val":8}
a index is:-- 1
current b is:-- {"key":4,"val":9}
b index is:-- -1
1
//索引 1与原索引 4 对比

array_b now is:--  [{"key":0,"val":9},{"key":2,"val":8},{"key":2,"val":8},{"key":3,"val":7},{"key":1,"val":6},{"key":5,"val":10}]
//第八次运行后，原索引 4 比索引 1 要大，索引 2，由索引 1 填充，索引 2 与索引 1 等待对比稳定后确定

current a is:--  {"key":0,"val":9}
a index is:-- 0
current b is:-- {"key":4,"val":9}
b index is:-- -1
0
//索引 0 与原索引 4 对比

array_b now is:--  [{"key":0,"val":9},{"key":4,"val":9},{"key":2,"val":8},{"key":3,"val":7},{"key":1,"val":6},{"key":5,"val":10}]
//第九次运行后，原索引 4 与原索引 0 相当，把原索引 4 放在索引 1 的位置填充，……对比到索引 0，终于稳定。

current a is:--  {"key":1,"val":6}
a index is:-- 4
current b is:-- {"key":5,"val":10}
b index is:-- 5
4
//从上次取出的索引 4 的位置开始，与索引 5 对比

array_b now is:--  [{"key":0,"val":9},{"key":4,"val":9},{"key":2,"val":8},{"key":3,"val":7},{"key":1,"val":6},{"key":1,"val":6}]
//第十次运行后，返回值为 4 大于 0，索引 4 与索引 5 要发生位置对调，索引 5 由索引 4 填充，并取出索引 5 与索引 3，2，1，0 对比，不断由对比的索引起点填充索引起点+1 的位置，在对比稳定后，确认当前的起始索引还是对比的起始索引+1的位置放置取出的原索引 5

//以下为不断的不稳定对比，不断的 a 填充 b，并且起点索引-1 与取出的值对比的过程。
current a is:--  {"key":3,"val":7}
a index is:-- 3
current b is:-- {"key":5,"val":10}
b index is:-- -1
3

array_b now is:--  [{"key":0,"val":9},{"key":4,"val":9},{"key":2,"val":8},{"key":3,"val":7},{"key":3,"val":7},{"key":1,"val":6}]
current a is:--  {"key":2,"val":8}
a index is:-- 2
current b is:-- {"key":5,"val":10}
b index is:-- -1
2

array_b now is:--  [{"key":0,"val":9},{"key":4,"val":9},{"key":2,"val":8},{"key":2,"val":8},{"key":3,"val":7},{"key":1,"val":6}]
current a is:--  {"key":4,"val":9}
a index is:-- 1
current b is:-- {"key":5,"val":10}
b index is:-- -1
1
array_b now is:--  [{"key":0,"val":9},{"key":4,"val":9},{"key":4,"val":9},{"key":2,"val":8},{"key":3,"val":7},{"key":1,"val":6}]
current a is:--  {"key":0,"val":9}
a index is:-- 0
current b is:-- {"key":5,"val":10}
b index is:-- -1
1
```



**笔记 **

1. `对比方法`的运行次数不确定，完全由初始数组的长度与运算值复杂度相关
2. 在对比过程中，如果有发生索引更改，会由 a 来填充 b，组成新数组，并在下一轮对比中把索引起点-1，由上一轮的对比中的 a 前面的一位与取出的值做对比，取 a 前面一位的值做为 a，取出的值为 b;
3. 循环2的过程，直至发生对比的 a 的索引为 0，最后在数组中确定取出的数组项该填充在数组哪个位置。
4. 被取出数组的为下一轮对比中的 b





> 此篇为个人学习理解的笔记，为了更好的理解和掌握，欢迎留言。