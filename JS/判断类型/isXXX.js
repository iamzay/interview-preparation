function isArray(obj){
  if(typeof obj==="object")
    return Object.prototype.toString.call(obj)==="[object Array]";
  return false;
}

function isFunction(arg){
  if(!arg)
    return false;
  if(typeof (/./) ==="function")
    return Object.prototype.toString.call(arg)==="[object Function]";
  return typeof arg==="function";
}
