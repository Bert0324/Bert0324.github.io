## Value object and Reference Object

Before talking about Object's copy, there is a key point that the differences between Value object and Reference Object in JS.

JS basic data type including Number, String, Null, Undefined, Boolean, Object and Symbol, whose value is invariable. When I first know it, I feel quite confused. Because when I process string, I feel I was changing its value. 

But my intuition is wrong, actually, every time I just deassign a new variable.

For example:

```JavaScript
var str = '123';
str[0] = '0';
console.log(str);   //'123'
```

When we are using `===` to compare 2 value objects, we are do comparing their values.

But for Reference Object, the fact is not. Reference Object's variable name points to a memory address where save the real content's memory address.
Therefore, when we are comparing Reference Object, we are comparing their pointers.

There is a typical example to show that one is value, one is pointer:

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

## Shallow copy

According to the above, the key point to copy an object is to copy its value object instead of Reference Object, which can avoid to only copy a 
pointer.

Like as below:

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

## Deep copy

For those objects including Reference Object, shallow copy is not enough. 
We need to split whole objects to Value Objects.

The [jQuery.extend](https://github.com/jquery/jquery/blob/master/src/core.js) as the example:

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

It uses recursion to get whole child object. There is a more simple version:

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

That's all. If I make something wrong, welcome to contact me to let me modify it!








