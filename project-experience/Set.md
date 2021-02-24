## 前言
ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。Set 结构没有键名，只有键值（或者说键名和键值是同一个值

## Set属性和方法
Set 实例的属性和方法
[Set结构的实例有以下属性]
Set.prototype.constructor：构造函数，默认就是Set函数。
Set.prototype.size：返回Set实例的成员总数。
[Set实例的方法分为两大类]：操作方法（用于操作数据）和遍历方法（用于遍历成员）。
## 下面先介绍四个操作方法。
Set.prototype.add(value)：添加某个值，返回 Set 结构本身。
Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。
Set.prototype.clear()：清除所有成员，没有返回值。
## eg: 
s.add(1).add(2).add(2);
注意2被加入了两次
s.size 2
s.has(1) true
s.has(2) true
s.has(3) false
s.delete(2);
s.has(2) false
## 遍历操作
Set.prototype.keys()：返回键名的遍历器
Set.prototype.values()：返回键值的遍历器
Set.prototype.entries()：返回键值对的遍历器
Set.prototype.forEach()：使用回调函数遍历每个成员
keys方法、values方法、entries方法返回的都是遍历器对象（详见《Iterator 对象》一章）。由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。
## eg
1. 扩展运算符（...）内部使用for...of循环，所以也可以用于 Set 结构。
let set = new Set(['red', 'green', 'blue']);
let arr = [...set];
['red', 'green', 'blue']
2. 扩展运算符和 Set 结构相结合，就可以去除数组的重复成员。
let arr = [3, 5, 2, 2, 5, 5];
let unique = [...new Set(arr)];
[3, 5, 2]
3. 而且，数组的map和filter方法也可以间接用于 Set 了。
let set = new Set([1, 2, 3]);
set = new Set([...set].map(x => x * 2));
返回Set结构：{2, 4, 6}
let set = new Set([1, 2, 3, 4, 5]);
set = new Set([...set].filter(x => (x % 2) == 0));
返回Set结构：{2, 4}
4. 因此使用 Set 可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）。
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);
并集
let union = new Set([...a, ...b]);
Set {1, 2, 3, 4}
交集
let intersect = new Set([...a].filter(x => b.has(x)));
set {2, 3}
（a 相对于 b 的）差集
let difference = new Set([...a].filter(x => !b.has(x)));
Set {1}
5. 如果想在遍历操作中，同步改变原来的 Set 结构，目前没有直接的方法，但有两种变通方法。一种是利用原 Set 结构映射出一个新的结构，然后赋值给原来的 Set 结构；另一种是利用Array.from方法
[方法一]
let set = new Set([1, 2, 3]);
set = new Set([...set].map(val => val * 2));
set的值是2, 4, 6
[方法二]
let set = new Set([1, 2, 3]);
set = new Set(Array.from(set, val => val * 2));
set的值是2, 4, 6


## 什么是 for…of 循环
for...of 语句创建一个循环来迭代可迭代的对象。在 ES6 中引入的 for...of 循环，以替代 for...in 和 forEach() ，并支持新的迭代协议。for...of 允许你遍历 Arrays（数组）, Strings（字符串）, Maps（映射）, Sets（集合）等可迭代的数据结构等。
语法
for (variable of iterable) {
    statement
}
variable：每个迭代的属性值被分配给该变量。
iterable：一个具有可枚举属性并且可以迭代的对象。