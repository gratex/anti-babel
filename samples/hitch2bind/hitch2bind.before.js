this._hRangeChanged.bind(this);

lang.hitch(this, this._hExtChange);
lang.hitch(this, this.setDirty, true);
lang.hitch(this, "setDirty", true);

lang.hitch(this, this.test, true, false);
lang.hitch(this, "test", true, false);

lang.hitch(this, this.test, [1,2,3]);
lang.hitch(this, "test", [1,2,3]);

lang.hitch(this, function(a, b) {}, 2);
