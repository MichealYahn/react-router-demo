import cookie from 'react-cookies'
// get
export function httpGet(url,data){
  var result = fetch(url+"?"+params(data));
  return result;
}


// post
export function httpPost(url,data){ // data = {}
    var result = Promise.race([
      fetch(url,{
        method:"post",
        headers: {
           'Accept': 'application/json, text/plain, */*',
           'Content-Type': 'application/x-www-form-urlencoded'
        },
        // body：sring name=iwen&age=20
        body:params(data)
      }),
      new Promise(function(resolve,reject){
          setTimeout(()=> reject(new Error('请求超时')),2000)
      })
    ])

   return result;
}

function params(obj){
  var result = ""; // 接受最后的结果  {name:iwen,age:20}
  var item;
  for(item in obj){
    result += "&"+item+"="+encodeURIComponent(obj[item]);
  }
  var token = cookie.load('token')
  if(token){
    result += "&token="+encodeURIComponent(token);
  }
  if(result){
    result = result.slice(1)
  }
  return result;
}
