// get
export function httpGet(url){
  var result = fetch(url);
  return result;
}


// post
export function httpPost(url,data){ // data = {}
   var result = fetch(url,{
     method:"post",
     headers: {

        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/x-www-form-urlencoded'
     },
     // body：sring name=iwen&age=20
     body:params(data)
   })
   return result;
}

function params(obj){
  var result = ""; // 接受最后的结果  {name:iwen,age:20}
  var item;
  for(item in obj){
    result += "&"+item+"="+encodeURIComponent(obj[item]);
  }
  if(result){
    result = result.slice(1)
  }
  return result;
}
