## Getter and Setter in Object

As we know, in JS's object, there is a default setter and getter like as below:

```js
let obj = {
    a:1,
    get a(){
        return 1;
    },
    set a(num){
        console.log(this.a);
    }
}
```

## Descriptor

In Object.defineProperty, we can access more configuration. The definition is as below:

`Object.defineProperty(object, propertyname, descriptor)`

descriptor is an object that define configurations. It includes lots of properties:

* configurable

Whether the configuration of this property is changeable, default is false. If trying to edit a unchangeable property, it will
throw an error.

* value

The value of the property.

* writable

Whether the value is writable or not, if it's false, when changing value, 
it won't throw error. The default is false!

* enumerable

Whether show the property in the for-in or Object.keys, default is false

* get and set

Compared to getter and setter in definition of object, Object.defineProperty is more flexible. For example, a 
dom setter and getter to make change attributes more easy:

```js
let dom = document.getElementById('test');
Object.defineProperty(dom, 'translateX', {
    set:function(num){
        this.style.transform = `translateX(${num}px)`;
    }
})

dom.translateX = 0;
dom.translateX = 10;
```

In this way, we can bind the object's `translateX` property with its style.transform. It will be more convenient when we change one property to modify multiple other property and emit some events.

### summary

To sum up, the property defined in Object.defineProperty in default configuration is kind of different normal the object 
property. Such as it won't show in Object.keys, its value isn't changeable.

## Data two way binding

### Basic binding

In MVVM, Object.defineProperty is common. There is a basic and simple example about it:

```js
const obj = {};
Object.defineProperty(obj, 'text', {
  set: function(newVal) {
    document.getElementById('input').value = newVal;
    document.getElementById('span').innerHTML = newVal;
  }
});

const input = document.getElementById('input');
input.addEventListener('keyup', function(e){
  obj.text = e.target.value;
})
```

When changing the value in `<input>`, the text in `<text>` will change too. The `obj` is their view module.

This code is coupled, Vue use Watcher and Observer to decouple it.

## throw some information, such as warning

In [express](https://github.com/expressjs/express/blob/master/lib/express.js), it use Object.defineProperty to throw information to users as below:

```js
var removedMiddlewares = [
  'bodyParser',
  'compress',
  'cookieSession',
  'session',
  'logger',
  'cookieParser',
  'favicon',
  'responseTime',
  'errorHandler',
  'timeout',
  'methodOverride',
  'vhost',
  'csrf',
  'directory',
  'limit',
  'multipart',
  'staticCache'
]

removedMiddlewares.forEach(function (name) {
  Object.defineProperty(exports, name, {
    get: function () {
      throw new Error('Most middleware (like ' + name + ') is no longer bundled with Express and must be installed separately. Please see https://github.com/senchalabs/connect#middleware.');
    },
    configurable: true
  });
});
```

## VS Proxy

It's a new feature in ES6, compared to Object.defineProperty, which can just access getter and setter of an object, Proxy can
access more operation, such as `in`, `delete`, and function calling.
