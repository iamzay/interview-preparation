class Event {
  constructor(){
    this._callbacks={};
  }

  on(type,handler){
    this._callbacks[type]=this._callbacks[type]||[];
    this._callbacks[type].push(handler);
    return this;
  }

  off(type,handler){
    if(!this._callbacks[type])
      return this;
    let i=this._callbacks[type].indexOf(handler);
    if(i>=0)
      this._callbacks[type].splice(i,1);
    return this;
  }

  trigger(type,data){
    let _callbacks=this._callbacks[type];
    if(!_callbacks)
      return this;
    for(let callback of _callbacks)
      callback(data);
    return this;
  }

  once(type,handler){
    let self=this;
    function wrapper(){
      self.off(type,wrapper);
      handler.apply(self,arguments);
    }
    this.on(type,wrapper);
    return this;
  }
}
