## 所谓 Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。

## Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

Promise 实例具有 then 方法，也就是说，then 方法是定义在原型对象 Promise.prototype 上的。它的作用是为 Promise 实例添加状态改变时的回调函数。前面说过，then 方法的第一个参数是 resolved 状态的回调函数，第二个参数是 rejected 状态的回调函数，它们都是可选的。
[then 方法返回的是一个新的 Promise 实例（注意，不是原来那个 Promise 实例）。因此可以采用链式写法，即 then 方法后面再调用另一个 then 方法。************************]

```javascript
getJSON("/posts.json").then(function(json) {
  return json.post;
}).then(function(post) {
  // ...
});
上面的代码使用then方法，依次指定了两个回调函数。第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数。
采用链式的then，可以指定一组按照次序调用的回调函数。这时，前一个回调函数，有可能返回的还是一个Promise对象（即有异步操作），这时后一个回调函数，就会等待该Promise对象的状态发生变化，才会被调用。
getJSON("/post/1.json").then(function(post) {
  return getJSON(post.commentURL);
}).then(function (comments) {
  console.log("resolved: ", comments);
}, function (err){
  console.log("rejected: ", err);
});
上面代码中，第一个then方法指定的回调函数，返回的是另一个Promise对象。这时，第二个then方法指定的回调函数，就会等待这个新的Promise对象状态发生变化。如果变为resolved，就调用第一个回调函数，如果状态变为rejected，就调用第二个回调函数。
如果采用箭头函数，上面的代码可以写得更简洁。
getJSON("/post/1.json").then(
  post => getJSON(post.commentURL)
).then(
  comments => console.log("resolved: ", comments),
  err => console.log("rejected: ", err)
);
```

## Promise.all
1. 只有全部状态都为fulfilled才会是resolve 只要有一个是reject就会返回reject的值

```javascript
promises1 = [2, 3, 5, 7, 11, 13].map(function (id) {
  return getJSON(id);
});
Promise.all(promises1)
  .then(function (posts) {
    console.log("posts", posts);
  })
  .catch(function (reason) {
    // ...
  });
function getJSON(data) {
  return new Promise((resolve, reject) => {
    resolve(data);
  });
}
// 输出为 posts (6) [2, 3, 5, 7, 11, 13]

promises1 = [2, 3, 5, 7, 11, 13].map(function (id) {
  return getJSON(id);
});
Promise.all(promises1)
  .then(function (posts) {
    console.log("posts", posts);
  })
  .catch(function (reason) {
    console.log("reason", reason);
  });
function getJSON(data) {
  return new Promise((resolve, reject) => {
    if (data === 2) {
      resolve(data);
    } else {
      reject(data);
    }
  });
}
// 输出为 reason 3

```

## Promise.race()
接收一个数组
只要有一个执行完毕就会返回结果
```javascript
1. 
const p = Promise.race([
  fetch('/resource-that-may-take-a-while'),
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000)
  })
]);
p
.then(console.log)
.catch(console.error);
上面代码中，如果 5 秒之内fetch方法无法返回结果，变量p的状态就会变为rejected，从而触发catch方法指定的回调函数。

```

## Promise.allSettled()
Promise.allSettled()方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。
只有等到所有这些参数实例都返回结果，不管是fulfilled还是rejected，包装实例才会结束。该方法由 ES2020 引入。


```javascript
const resolved = Promise.resolve(42);
const rejected = Promise.reject(-1);
const allSettledPromise = Promise.allSettled([resolved, rejected]);
allSettledPromise.then(function (results) {
  console.log(results);
});
// [
//    { status: 'fulfilled', value: 42 },
//    { status: 'rejected', reason: -1 }
// ]

上面代码中，Promise.allSettled()的返回值allSettledPromise，状态只可能变成fulfilled。它的监听函数接收到的参数是数组results。
该数组的每个成员都是一个对象，对应传入Promise.allSettled()的两个 Promise 实例。每个对象都有status属性，该属性的值只可能是字符串fulfilled或字符串rejected。fulfilled时，
对象有value属性，rejected时有reason属性，对应两种状态的返回值。


下面是返回值用法的例子。
const promises = [ fetch('index.html'), fetch('https://does-not-exist/') ];
const results = await Promise.allSettled(promises);
// 过滤出成功的请求
const successfulPromises = results.filter(p => p.status === 'fulfilled');
// 过滤出失败的请求，并输出原因
const errors = results
  .filter(p => p.status === 'rejected')
  .map(p => p.reason);
```


## Promise.any() 
```javascript
ES2021 引入了Promise.any()方法。该方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例返回。
只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。
上面代码中，Promise.any()方法的参数数组包含三个 Promise 操作。其中只要有一个变成fulfilled，Promise.any()返回的 Promise 对象就变成fulfilled。
如果所有三个操作都变成rejected，那么await命令就会抛出错误。
Promise.any()抛出的错误，不是一个一般的错误，而是一个 AggregateError 实例。它相当于一个数组，每个成员对应一个被rejected的操作所抛出的错误。

下面是一个例子。
var resolved = Promise.resolve(42);
var rejected = Promise.reject(-1);
var alsoRejected = Promise.reject(Infinity);
Promise.any([resolved, rejected, alsoRejected]).then(function (result) {
  console.log(result); // 42
});
Promise.any([rejected, alsoRejected]).catch(function (results) {
  console.log(results); // [-1, Infinity]
});
```



## Promise.resolve()
有时需要将现有对象转为 Promise 对象，Promise.resolve()方法就起到这个作用。
```javascript
const jsPromise = Promise.resolve($.ajax('/whatever.json'));
上面代码将 jQuery 生成的deferred对象，转为一个新的 Promise 对象。

Promise.resolve()等价于下面的写法。
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))

Promise.resolve()方法的参数分成四种情况。
1. 参数是一个 Promise 实例
如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。
2. 参数是一个thenable对象
thenable对象指的是具有then方法的对象，比如下面这个对象。
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};
Promise.resolve()方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then()方法。
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};
let p1 = Promise.resolve(thenable);
p1.then(function (value) {
  console.log(value);  // 42
});
上面代码中，thenable对象的then()方法执行后，对象p1的状态就变为resolved，从而立即执行最后那个then()方法指定的回调函数，输出42。
3. 参数不是具有then()方法的对象，或根本就不是对象
如果参数是一个原始值，或者是一个不具有then()方法的对象，则Promise.resolve()方法返回一个新的 Promise 对象，状态为resolved。
const p = Promise.resolve('Hello');
p.then(function (s) {
  console.log(s)
});
// Hello
上面代码生成一个新的 Promise 对象的实例p。由于字符串Hello不属于异步操作（判断方法是字符串对象不具有 then ，返回 Promise 实例的状态从一生成就是resolved，所以回调函数会立即执行。Promise.resolve()方法的参数，会同时传给回调函数。
4. 不带有任何参数
Promise.resolve()方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。
所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用Promise.resolve()方法。
const p = Promise.resolve();
p.then(function () {
  // ...
});
上面代码的变量p就是一个 Promise 对象。


需要注意的是，立即resolve()的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时。 微任务
setTimeout(function () {
  console.log('three');
}, 0);
Promise.resolve().then(function () {
  console.log('two');
});
console.log('one');
// one
// two
// three
上面代码中，setTimeout(fn, 0)在下一轮“事件循环”开始时执行，Promise.resolve()在本轮“事件循环”结束时执行，console.log('one')则是立即执行，因此最先输出。

```


## Promise.reject()
```javascript
Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。
const p = Promise.reject('出错了');
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'))
p.then(null, function (s) {
  console.log(s)
});
// 出错了
上面代码生成一个 Promise 对象的实例p，状态为rejected，回调函数会立即执行。
Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数。
Promise.reject('出错了')
.catch(e => {
  console.log(e === '出错了')
})
// true
上面代码中，Promise.reject()方法的参数是一个字符串，后面catch()方法的参数e就是这个字符串。
```


## Generator 函数与 Promise 的结合
```javascript
使用 Generator 函数管理流程，遇到异步操作的时候，通常返回一个Promise对象。
function getFoo () {
  return new Promise(function (resolve, reject){
    resolve('foo');
  });
}
const g = function* () {
  try {
    const foo = yield getFoo();
    console.log(foo);
  } catch (e) {
    console.log(e);
  }
};
function run (generator) {
  const it = generator();

  function go(result) {
    if (result.done) return result.value;

    return result.value.then(function (value) {
      return go(it.next(value));
    }, function (error) {
      return go(it.throw(error));
    });
  }
  go(it.next());
}
run(g);
上面代码的 Generator 函数g之中，有一个异步操作getFoo，它返回的就是一个Promise对象。函数run用来处理这个Promise对象，并调用下一个next方法
```