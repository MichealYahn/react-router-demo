// get
export function httpGet(url,data){
  var result = fetch(url+"?"+params(data),{
    headers: {
       'Accept': 'application/json, text/plain, */*',
       'Content-Type': 'application/x-www-form-urlencoded',
       'Authorization': window.localStorage.getItem('token')
    }
  });
  return result;
}


// post
export function httpPost(url,data){
    var result = Promise.race([
      fetch(url,{
        method:"post",
        headers: {
           'Accept': 'application/json, text/plain, */*',
           'Content-Type': 'application/x-www-form-urlencoded',
           'Authorization': window.localStorage.getItem('token')
        },
        credentials: 'include',
        body:params(data)
      }),
      new Promise(function(resolve,reject){
          setTimeout(()=> reject(new Error('请求超时')),2000)
      })
    ])

   return result;
}

function params(obj){
  var result = "";
  var item;
  for(item in obj){
    result += "&"+item+"="+encodeURIComponent(obj[item]);
  }
  if(result){
    result = result.slice(1)
  }
  return result;
}
