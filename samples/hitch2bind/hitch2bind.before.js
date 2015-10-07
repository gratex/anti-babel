this._hRangeChanged.bind(this);
lang.hitch(this, this._hExtChange);
this.setDirty.bind(this,true);
this.test.bind(this,true,false);
this.test.bind(this,[1,2,3]);