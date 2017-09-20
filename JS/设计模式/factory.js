function CarMaker(){

}
CarMaker.prototype.drive=function(){
  console.log(this.doors);
}
CarMaker.Compact=function(){
  this.doors=4;
}
CarMaker.Convertible=function(){
  this.doors=2;
}
/* 工厂方法，面试主要问这个方法 */
CarMaker.factory=function(type){
  /* 根据type获得构造函数 */
  const constr=CarMaker[type];
  if(!constr)
    throw new Error("constructor doesn't exist!");
  /* 让构造函数继承父类，但只进行一次 */
  if(typeof constr.drive !=="function")
    constr.prototype=new CarMaker();
  const instance=new constr();
  return instance;
}

let corolla=CarMaker.factory("Compact");
let solstice=CarMaker.factory("Convertible");
corolla.drive();
