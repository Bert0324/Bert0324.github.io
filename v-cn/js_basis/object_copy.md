## 值对象和引用对象

在讨论对象的拷贝之前，不得不说JS值对象和引用对象之间的区别。

JS的基础对象包括Number, String, Null, Undefined, Boolean, Object和Symbol，他们的值是不可改变的。
当我第一次知道这个的时候，我觉得有点疑惑。因为当我处理字符串时，我觉得我改变了他们的值。

但是我的直觉是错误的，其实每次我是为他们重新赋值。

这有个例子:

```JavaScript
var str = '123';
str[0] = '0';
console.log(str);   //'123'
```

当我们使用`===`来比较两个值对象时，我们的确在比较他们的值。

但是对引用对象来说，事实不是这样。引用对象的变量名指向了一个内存指针，他储存着真实内容的地址。
因此，当我们在比较引用对象时，我们在比较他们的指针。

这有个例子展示他们的区别：

```JavaScript
var a = {value:1};
var b = a;
b.value = 2;
console.log(a); //a.value becomes 2 too.

var c = 1;
var d = c;
d++;
console.log(c); //1
console.log(d); //2
```

## 浅拷贝

根据上文，拷贝的要点在于拷贝值对象，而不是引用对象，这可以避免拷贝指针。

如下：

```JavaScript
let obj = {
    a:0,
    b:1,
    c:2
}

function shallowCopy(src){
    let dist = {};
    for (let key in src){
        if (src.hasOwnProperty(key)){
            dist[key] = src[key];
        }
    }
    return dist;
}

let copy = shallowCopy(obj);
copy.a= 1;
console.log(obj);
console.log(copy);
```

## 深拷贝

对于那些对象中包含引用对象的，浅拷贝是不够的。我们必须把所有的对象拆成值对象拷贝。

这有个[jQuery.extend](https://github.com/jquery/jquery/blob/master/src/core.js)的例子：

```JavaScript
jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && typeof target !== "function" ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				copy = options[ name ];

				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};
```

他使用了递归来获取所有的子对象。这有个更简单的版本：

```JavaScript
function deepCopy(source){
    if (typeof source !== 'object'){
        return source;
    }
    
    if (Object.prototype.toString.call(source) === '[object Array]'){
        let copy = [];
        source.forEach(item=>{
            copy.push(deepCopy(item))
        });
        return copy;
    }
    
    let copy = {};
    for (let key in source){
        if (source.hasOwnProperty(key)){
            copy[key] = deepCopy(source[key]);
        }
    }
    return copy;
}


let obj = {
    a:{
        value:1
    },
    b:2
}
let copy = deepCopy(obj)
copy.a.value = 0;
console.log(obj);
console.log(copy);
```

这就是全部啦。如果您发现了错误，欢迎联系我来指正！