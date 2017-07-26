Number.prototype[Symbol.iterator] = function*(){
  for (let i = 0; i < this; i += 1) {
    yield i;
  }
};
