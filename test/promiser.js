const promise = new Promise(function(resolve, reject) {
    // ... some code
    let value = "1111"
    if (1){
      resolve(value);
    } else {
      reject(error);
    }
  });
  promise.then(function(data) { console.log("data", data);}, function(err) {
      console.log("erre", err);
  })
  var getJSON = function(url) {
    return new Promise((resolve, reject) => {
        var handle = function () {
            if(this.readyState != 4) {
                return;
            }
            if(this.status === 200) {
                resolve(this.response)
            } else {
                reject(new Error(this.statusText))
            }
        };
        const client = new XMLHttpRequest();
        client.open("GET", url);
        client.onreadystatechange = handle;
        client.responseType = "json";
        client.setRequestHeader("Accept", "application/json");
        client.send(null);
    })
  } 
  getJSON("/post.json").then(function(json) {
      console.log("Contents", json);
  }, function(error) {
      console.error("出错啦", error);
  })

  p  = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("2秒后执行")
      }, 2000);
  })
  