function Sale(price){
  this.price=price;
}
Sale.prototype.decorate(type){
  const overridens=Sale.decorators[type];
  const F=function(){};
  F.prototype=this;
  const newObj=new F();
  newObj.uber=this;
  var i;
  for(in overridens){
    if(overridens.hasOwnProperty(i))
      newObj[i]=overridens[i];
  }
  return newObj;
}
Sale.decorators={};
Sale.decorators.fedtax={
  getPrice:function(){
    let price=this.uber.getPrice();
    price+=price*5/100;
    return price;
  }
}
Sale.decorators.money={
  getPrice:function(){
    return "$"+this.uber.getPrice().toFixed(2);
  }
}


let sale=new Sale(100);
sale=sale.decorate("fedtax");
sale=sale.decorate("money");
sale.getPrice();
