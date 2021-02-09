const heapdump = require("heapdump");

function out() {
  const bigData = new Buffer(100);
  inner = () => void bigData;
}

console.log(gc);
