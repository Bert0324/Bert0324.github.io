# Object Proxy

In Vue 2, it uses `Object.defineProperty` to proxy data, and in Vue 3, it will use `Proxy` to do it.

## `Object.defineProperty`

Its definition is as below:

```ts
/**
 * Adds a property to an object, or modifies attributes of an existing property.
 * @param o Object on which to add or modify the property. This can be a native JavaScript object
 * (that is, a user-defined object or a built in object) or a DOM object.
 * @param p The property name.
 * @param attributes Descriptor for the property. It can be for a data property or an accessor property.
 */
defineProperty(o: any, p: PropertyKey, attributes: PropertyDescriptor & ThisType<any>): any;
```

The `PropertyDescriptor`'s properties see in the [MDN document](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).

### Deep Observe and Observe An Array

```ts
class Watcher {

    private arrayProto: any[] = [];

    constructor() {
        this.arrayProto = Object.create(Array.prototype);
        ['push', 'pop', 'shift', 'unshift', 'splice'].forEach(fn => {
            const updateView = this.updateView;
            this.arrayProto[fn] = function() {
                Array.prototype[fn].call(this, ...arguments);
                updateView();
            }
        });
    }

    updateView() {
        console.log('render');
    }

    observer(target: any) {
        const targetType: string = Object.prototype.toString.call(target);
        // if it is not Object
        if (!target || !targetType.startsWith('[object ')) {
            return target;
        }

        // if it is an array, replace its prototype
        if (targetType === '[object Array]') {
            target.__proto__ = this.arrayProto;
        }

        for (let item in target) {
            let value = target[item];    // avoid circular reference
            this.observer(value);
            Object.defineProperty(target, item, {
                get: () => value,
                set: newValue => {
                    if (newValue !== value) {
                        value = newValue;
                        this.updateView();
                    }
                }
            });
        }
    }
}

const watcher = new Watcher();
const obj = {
    a: 1,
    b: {
        c: 1
    },
    d: [{}]
};
watcher.observer(obj);
obj.a = 2;
obj.b.c = 3;
obj.d.push(1);
```

### Problems

From the implementation as above, we can say there are some limitations.

- it cannot observer object add new property and delete property. (use `Vue.set` and `Vue.delete` instead)
- it has to observer whole object at once
- it cannot observe 

## Proxy

TODO

## Reference

- <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty>
