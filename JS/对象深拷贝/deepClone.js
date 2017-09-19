/* JS中的对象有不同类型，比如dom节点、正则、日期等，
 * 对于这些类型要使用特定的方法重新构造元素，
 * 对于object和array则要遍历其所有的元素*/
function deepClone(obj){
  if(!obj||typeof obj!=="object")
    return obj;

  const _toString=Object.prototype.toString;
  /* 是否为Date */
  if(_toString.call(obj)==="[object Date]")
    return new Date(obj.getTime());
  /* 是否为Dom node */
  if(obj.nodeType&&"cloneNode" in obj)
    return obj.cloneNode(true);
  /* 是否为正则 */
  if(_toString.call(obj)==="[object RegExp]"){
    let flags=[];
    if(obj.global)
      flags.push("g");
    if(obj.ignoreCase)
      flags.push("i");
    if(obj.multiline)
      flags.push("m");
    return new RegExp(obj.source,flags.join(""));
  }
  /* 是否为普通的数组或是对象 */
  let res=Array.isArray(obj)?[]:obj.constructor?new obj.constructor():{};  // 若不为数组，使用相同的构造函数构造一个新对象
  for(let key in obj)
    res[key]=deepClone(obj[key]);

  return res;
}
