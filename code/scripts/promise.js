class MyPromise {
  static statusList = {
    pending: Symbol("pending"),
    resolved: Symbol("resolved"),
    rejected: Symbol("rejected"),
  };

  static resolve = (p) => {
    if (p instanceof MyPromise) return p;
    return new MyPromise((resolve) => resolve(p));
  };

  static reject = (p) => {
    if (p instanceof MyPromise) return p;
    return new MyPromise((_, reject) => reject(p));
  };

  status = MyPromise.statusList.pending;
  thenList = [];
  onCatch = undefined;

  constructor(action) {
    action(this.resolve.bind(this), this.reject?.bind?.(this));
  }

  then(cb) {
    this.thenList.push(cb);
    return this;
  }

  catch(cb) {
    this.onCatch = cb;
    return this;
  }

  *resolve(value) {
    yield;
    const task = this.thenList.shift();
    for (let i = 0; i < this.thenList.length; i++) {}

    if (task) {
      MyPromise.resolve(task(value))
        .then((v) => this.resolve(v))
        .catch((e) => {
          this.status = MyPromise.statusList.rejected;
          if (this.onCatch) this.onCatch(e);
          else throw e;
        });
    } else {
      this.status = MyPromise.statusList.resolved;
    }
    return this;
  }

  reject(value) {
    this.status = MyPromise.statusList.rejected;
    if (this.onCatch) this.onCatch(value);
    else throw new Error(value);
    return this;
  }
}

var task = () =>
  new MyPromise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  }).then((v) => {
    console.log(v);
    return v + 1;
  });

MyPromise.resolve(task()).then((v) => console.log(v));
