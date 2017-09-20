let publisher={
  subscribers:{
    any:[]
  },
  subscribe(fn,type){
    type=type||"any";
    this.subscribers[type]=this.subscribers[type]||[];
    this.subscribers[type].push(fn);
  },
  publish(arg,type){
    type=type||"any";
    const subscribers=this.subscribers[type];
    for(let callback of subscribers)
      callback(arg);
  },
  unsubscribe(fn,type){
    type=type||"any";
    const subscribers=this.subscribers[type];
    const index=subscribers.findIndex(arg=>arg===fn);
    if(index>=0)
      subscribers.splice(index,1);
  }
}

function makePublisher(obj){
  for(let key of Object.keys(publisher)){
    if(typeof publisher[key]==="function")
      obj[key]=publisher[key];
  }
  obj.subscribers={any:[]};
}

let paper={
  daily(){
    this.publish("big news today");
  },
  monthly(){
    this.publish("interesting analysis","monthly");
  }
}
makePublisher(paper);

let joe={
  drinkCoffee(paper){
    console.log("just read"+paper);
  },
  sundayPreNap(monthly){
    console.log("about to fall asleep reading this "+monthly);
  }
};

paper.subscribe(joe.drinkCoffee);
paper.subscribe(joe.sundayPreNap,"monthly");
paper.daily();
paper.monthly();
console.log("---");
paper.unsubscribe(joe.drinkCoffee);
paper.daily();
paper.monthly();
