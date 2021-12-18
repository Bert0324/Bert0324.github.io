interface LinkedListNode {
  value: number;
  key: number;
}

class LRUCache {
  private capacity: number;
  private cache: Record<number, LinkedListNode>;
  private queue: LinkedListNode[];

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = {};
    this.queue = [];
  }

  private updateQueue(node: LinkedListNode) {
    const index = this.queue.findIndex(item => item === node);
    this.queue.splice(index, 1);
    this.queue.unshift(node);
  }

  get(key: number): number {
    const node = this.cache[key];
    if (!node) return -1;
    this.updateQueue(node);
    return node.value;
  }

  put(key: number, value: number): void {
    if (this.cache[key]) {
      this.cache[key].value = value;
      return this.updateQueue(this.cache[key]);
    }
    const node = { value, key };
    this.cache[key] = node;
    this.queue.unshift(node);
    if (this.queue.length > this.capacity) this.cache[this.queue.pop().key] = undefined;
  }
}

/**
* Your LRUCache object will be instantiated and called as such:
* var obj = new LRUCache(capacity)
* var param_1 = obj.get(key)
* obj.put(key,value)
*/