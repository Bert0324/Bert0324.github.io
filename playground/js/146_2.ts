interface ILinkNode {
  key?: number;
  value?: number;
  prev?: ILinkNode;
  next?: ILinkNode;
}

class LinkedList {
  size: number;
  private head: ILinkNode;
  private tail: ILinkNode;

  constructor() {
    this.size = 0;
    this.head = {};
    this.tail = {};
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  addToHead(node: ILinkNode) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
    this.size += 1;
  }

  removeNode(node: ILinkNode) {
    node.next.prev = node.prev;
    node.prev.next = node.next;
    this.size -= 1;
  }

  moveToHead(node: ILinkNode) {
    this.removeNode(node);
    this.addToHead(node);
  }

  removeTail() {
    const last = this.tail.prev;
    this.removeNode(last);
    return last;
  }
}


class LRUCache {
  private list: LinkedList;
  private capacity: number;
  private cache: Record<number, ILinkNode>;

  constructor(capacity: number) {
    this.list = new LinkedList();
    this.capacity = capacity;
    this.cache = {};
  }

  get(key: number): number {
    const node = this.cache[key];
    if (!node) return -1;
    this.list.moveToHead(node);
    return node.value;
  }

  put(key: number, value: number): void {
    if (this.cache[key]) {
      this.cache[key].value = value;
      this.list.moveToHead(this.cache[key]);
      return;
    }
    const node = { key, value };
    this.list.addToHead(node);
    this.cache[key] = node;
    if (this.list.size > this.capacity) {
      const removed = this.list.removeTail();
      this.cache[removed.key] = undefined;
    }
  }
}

/**
* Your LRUCache object will be instantiated and called as such:
* var obj = new LRUCache(capacity)
* var param_1 = obj.get(key)
* obj.put(key,value)
*/


interface LinkNode {
  next?: LinkNode;
  last?: LinkNode;
  value?: number;
  key?: number;
}

class LRUCache {
  private capacity: number;
  private data: Record<number, LinkNode>;
  private dummyHead: LinkNode;
  private dummyTail: LinkNode;
  private size = 0;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.dummyHead = {};
    this.dummyTail = {};
    this.dummyHead.next = this.dummyTail;
    this.dummyTail.last = this.dummyHead;
    this.data = {};
  }

  private addToHead(node: LinkNode) {
    const first = this.dummyHead.next;
    node.next = first;
    node.last = this.dummyHead;
    this.dummyHead.next = node;
    first.last = node;
    this.size += 1;
  }

  private remove(node: LinkNode) {
    node.last.next = node.next;
    node.next.last = node.last;
    this.size -= 1;
  }

  private moveToHead(node: LinkNode) {
    this.remove(node);
    this.addToHead(node);
  }

  private removeTail() {
    const last = this.dummyTail.last;
    this.remove(last);
    return last;
  }

  get(key: number): number {
    const node = this.data[key];
    if (!node) return -1;
    this.moveToHead(node);
    return node.value;
  }

  put(key: number, value: number): void {
    const node = this.data[key];
    if (node) {
      node.value = value;
      this.moveToHead(node);
    } else {
      const newNode = { value, key };
      this.data[key] = newNode;
      this.addToHead(newNode);
      if (this.size > this.capacity) {
        const removed = this.removeTail();
        this.data[removed.key] = undefined;
      }
    }
  }
}