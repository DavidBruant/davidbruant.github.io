---
title: Cache pattern using static variables
author: David Bruant
layout: post
permalink: /?p=99
categories:
  - Uncategorized
---
## Motivation

I&#8217;ve recently been writing some PHP. At some point, I wrote a function which was taking a string as input, [applying several regexp][1] to replace some patterns by something else and returning the result. Input string weren&#8217;t very long and throught the lifetime of the program, this function could be called several times with the exact same input. So it got me thinking. If I have already computed this function for some input, why should I bother computing it again? I shoudn&#8217;t and so implement a cache.

## Pattern

There aren&#8217;t thousands of ways to implement a cache, but some are better than others. The function I was working on was actually a method of an object. I could have used a private attribute. I haven&#8217;t. I have rather chosen to use a [static variable][2]. I have rarely seen a static variable used because very few context seem really suited for it; but I think this is one of them. Using a static variable here has the advantage that it is accessible only within the function. Consequently, nothing can mess with it and this is garanteed **by design**.

Here is the structure of the cache (written like as a somewhat language agnostic program assuming that it supports static variables):  
```js
function f(input){  
    static cache;  
    if(input in cache) // looking if this input already has a cache entry.  
        return cache[input];

    output = myHeavyComputation(input);

    cache[input] = output; // Adding an entry to the cache to hopefully save computation next time  
    return output;  
}  
```

It goes almost without saying that this works only for [pure functions][3]. 

## Applying this pattern to JavaScript

No one ignores that even though the *static* keyword is reserved in ECMAScript, it isn&#8217;t used in the language.  
But closures can help us out to deal with this issue: 
```js
var f = (function(){  
    var cache;

    return function (input){  
        if(input in cache)  
            return cache[input];

        output = myHeavyComputation(input);

        cache[input] = output;  
        return output;  
    }  
})()
```

## Adding a cache to a function without rewriting it

Obviously, the approach of adding a bit of code at the beginning and at the end may not be easy if you want to add a cache to a function of a library or any code your don&#8217;t necessarily control especially if this one is minified.

Here is a function to transform a function into the same function with a cache:  
```js
function makeFunctionWithCache(f){  
    var cache = {};  
    return function(input){  
        if(input in cache)  
            return cache[input];

        output = f.apply(null, arguments);

        cache[input] = output;  
        return output;  
    }  
}  
```
Let&#8217;s see how and if it works with an example. 

### Improving the Fibonacci, naive algorithm

We&#8217;re going to see the difference between the naive Fibonacci with and without cache.  
```js
var count = 0;

function fibonacci(i){  
    count++;

    return (i===0 || i===1) ? 1 : fibonacci(i-1) + fibonacci(i-2);  
}

// comment the line below to disable the cache  
fibonacci = makeFunctionWithCache(fibonacci);

console.log(fibonacci(25));  
console.log(count);  
```

The counter is here to count the number of actual fibonacci function calls. Results are 26 calls with cache against 242785 without. Basically, with the cache once one fibonacci value has been computed, it is in the cache. Consequently, any later call to the function will be &#8220;captured&#8221; by the cache, so, the actual call to the function (`f.apply(null, arguments);` in the `makeFunctionWithCache` returned function) does not occur (neither do the recursive calls, hence the performance improvement). 

Without running the code, you may be worried that the recursive call inside the fibonacci function definition aren&#8217;t &#8220;going through the cache&#8221;. They are: when the fibonacci function is called, the `fibonacci` recursive calls do not refer to the function which has been defined as `fibonacci`, but to the &#8220;thing&#8221; that is named `fibonacci` at the time of the call. Since we have replaced the `fibonacci` variable with the version with the cache, this is the one that is called. 

## Conclusions and improvement tracks

We have seen a cache pattern which is almost language agnostic. I have then showed how to add a cache to a [pure functions][3] without touching the function itself. There are obviously restriction and limitations. It is unlikely to work if we&#8217;re dealing with a non-pure function. If the input space is too wide, the space vs time trade-off may not be worth it. If the function isn&#8217;t called with the same input several times throughout the program lifetime, a cache is useless. If the function is a method of a [frozen][4] object, my method cannot be applied. 

However, in contexts where a cache can help, this can be useful. One of the main advantage is the separation of concerns. If you want to do tricky things with your cache (remove some entries after a certain amount of time if they haven&#8217;t been used, for instance), you don&#8217;t have to work on the function you&#8217;re adding a cache too. You just have to work on `makeFunctionWithCache`. This is also helpful if you have several functions you want add a cache to: there is only one place to maintain if you want to improve the cache mecanism.

 [1]: http://www.php.net/manual/en/function.preg-replace.php
 [2]: http://en.wikipedia.org/wiki/Static_variable
 [3]: http://en.wikipedia.org/wiki/Pure_function
 [4]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/freeze