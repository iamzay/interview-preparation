let JSONP={
  rand(){
    return Math.random().toString().substr(2);
  }

  parseData(data){
    let str="";
    for(let key of Object.keys(data)){
      str+="&"+key+"="+data[key];
    }
    /* 加时间戳，防止缓存 */
    str+="&_time="+Date.now();
    return str.substr(1);
  }

  getJSON(url,data,func){
    url=url+(url.indexOf("?")===-1?"?":"&")+this.parseData(data);
    /* 是否有callback参数 */
    let funcName="";
    let match=/callback=(\w+)/i;
    let res=match.exec(url);
    if(res)
      funcName=res[1];
    else {
      funcName=this.rand();
      url+="&callback="+funcName;
    }

    /* 构造script标签 */
    let script=documetn.createElement("script");
    script.src=url;
    script.type="text/javascript";
    script.id="jsonp";
    document.body.appendChild(script);

    /* 构造全局函数funcName */
    window[funcName]=function(json){
      window[funcName]=undefined;
      /* 删除script标签 */
      let script=document.querySelector("#jsonp");
      if(script)
        script.parentNode.removeChild(script);
      /* 调用callback */
      func(json);
    }
  }
}

let data = {
  from: "北京",
  count: 27,
  output: "json"
};

JSONP.getJSON("http://api.com",data,function(json){console.log(json)});
