JS basic data type including number, string, null, undefined, boolean, its value is invariable. When I first know it, I feel quite confused. Because when I process string, I feel I was changing its value. But my intuition is wrong, actually, every time I just deassign a new variable.

For example:

```JavaScript
var str = '123';
console.log(str[0] = '0');
console.log(str);
```

And when we use ===, it will directly compare their value. But Object is not, its value is variable and the variable itself is a memory pointer. In this way, when we use === to compare objects, it will compare their pointers. For example:

```JavaScript
var a = {a:1};
var b = {a:1};
console.log(a === b);
```

There is a typical example to show that one is value, one is pointer:

```JavaScript
var a = {value:1};
var b = a;
b.value = 2
console.log(a)
console.log(b)

var c = 1;
var d = c;
d++;
console.log(c);
console.log(d);
```

1. shallow copy

Like:

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

The copy result is well, but if:

```JavaScript
let obj = {
    a:{
        value:0
    },
    b:1,
    c:2
}
let copy = shallowCopy(obj);
copy.a.value = 1;
console.log(obj);
console.log(copy);
```

The change of child object in copy still influence obj. This is shallow copy.

2. deep copy

To create a total independent object, deep copy is imperative. The[ jQuery.extend](https://github.com/jquery/jquery/blob/master/src/core.js) as the example:

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

In jQuery, it use  recursion to get whole child object. There is a more simple version:

```JavaScript
function deepCopy(source){
    if (typeof source !== 'object'){
        return source;
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
console.log(obj)
console.log(copy)
```

If I make something wrong, welcome to contact me to let me modify it!








