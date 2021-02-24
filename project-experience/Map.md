## map含义和基本用法
JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。

## 前言
JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。
const data = {};
const element = document.getElementById('myDiv');
data[element] = 'metadata';
data['[object HTMLDivElement]'] // "metadata"
[上面代码原意是将一个DOM节点作为对象data的键，但是由于对象只接受字符串作为键名，所以element被自动转为字符串[objectHTMLDivElement**********]

## 为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。
1. 使用Map存储对象
const m = new Map();
const o = {p: 'Hello World'};
m.set(o, 'content')
m.get(o)  "content"

m.has(o)  true
m.delete(o)  true
m.has(o)  false
2. 使用Map来存储数组
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);
[此时的map值为:]
{
    {
        0: {"name" => "张三"}
        1: {"title" => "Author"}
    }
    size: 2
}
map.size 2
map.has('name') true
map.get('name') "张三"
map.has('title') true
map.get('title') "Author"

## Map实例的属性和操作方法
1. [size属性]
size属性返回 Map 结构的成员总数。
const map = new Map();
map.set('foo', true);
map.set('bar', false);
map.size 2
2. [操作方法]
[1-set] Map.prototype.set(key, value)
set方法设置键名key对应的键值为value，然后返回整个 Map 结构。如果key已经有值，则键值会被更新，否则就新生成该键。
const m = new Map();
m.set('edition', 6)        键是字符串
m.set(262, 'standard')     键是数值
m.set(undefined, 'nah')    键是 undefined
set方法返回的是当前的Map对象，因此可以采用链式写法。
let map = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');
[2-get] Map.prototype.get(key)
get方法读取key对应的键值，如果找不到key，返回undefined。
const m = new Map();
const hello = function() {console.log('hello');};
m.set(hello, 'Hello ES6!') 键是函数
m.get(hello)  Hello ES6!
[3-has] Map.prototype.has(key)
has方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。
const m = new Map();
m.set('edition', 6);
m.set(262, 'standard');
m.set(undefined, 'nah');
m.has('edition')     true
m.has('years')       false
m.has(262)           true
m.has(undefined)     true
[4-delete] Map.prototype.has(key)
delete方法删除某个键，返回true。如果删除失败，返回false。
const m = new Map();
m.set(undefined, 'nah');
m.has(undefined)     true
m.delete(undefined)
m.has(undefined)       false
[5-clear] Map.prototype.clear()
clear方法清除所有成员，没有返回值。
let map = new Map();
map.set('foo', true);
map.set('bar', false);
map.size 2
map.clear()
map.size 0


## Map 遍历的方法





