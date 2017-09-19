/* 第一种方法，将instance作为构造函数的属性
 * 弊端是将instance暴露在外 */
function Universe(){
  if(typeof Universe.instance==="object")
    return Universe.instance;
  this.start_time=0;
  Universe.instance=this;
}

/* 第二种方法，通过修改构造函数，使之后的调用直接返回instance */
function Universe1(){
  let instance;
  Universe1=function(){
    return instance;
  }

  Universe1.prototype=this;
  instance.constructor=Universe;
  instance.start_time=0;

  return instance;
}
