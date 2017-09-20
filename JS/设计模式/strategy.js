let validator={
  /* checks */
  types:{},
  messages:[],
  /* map key to type */
  config:{},
  validate(data){
    this.messages=[];
    let i;
    for(i in data){
      if(data.hasOwnProperty(i)){
        /* get type */
        const type=this.config[i];
        if(!type)
          continue;
        /* get checker */
        const checker=this.types[type];
        if(!checker)
          throw new Error("no handler to check this type!");
        if(!checker.validate(data[i]))
          this.messages.push(checker.instructions);
      }
    }
    return this.hasErrors();
  }

  hasErrors(){
    return !!this.messages.length;
  }
}
