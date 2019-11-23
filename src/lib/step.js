export const
  step = (_this,stepVal) => {
		for(name in _this.step){
			if(name==stepVal) _this.step[name]=true
			else _this.step[name]=false
		}
  }