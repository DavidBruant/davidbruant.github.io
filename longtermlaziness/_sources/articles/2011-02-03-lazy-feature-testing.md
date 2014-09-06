---
title: Lazy feature testing
author: David Bruant
layout: post
permalink: /?p=106
categories:
  - Uncategorized
---
## The problem

I&#8217;ve been thinking about [Modernizer][1]. It tests for feature detection. Currently 44 tests, but maybe more to go. If it was going further by testing more features and why not feature conformance, then, when inserting it, you&#8217;d be executing hundreds if not thousands of tests at the startup of your page.

Do you need all this information? Do you need all the tests to be executed? You probably don&#8217;t. You probably just need a couple of tests and so, this may be a useless burden added to your initial page loading.

I&#8217;ve consequently tried to create a lazy feature testing mecanism. The point is to only execute the test functions when you need them.

## The solution

As a reduction of the problem, I will only consider that Modernizer create an object with properties named as features and with boolean values (I purposefully forget the whole html class attribute situation. I&#8217;ll mention them at the end).

So, the solution is: getters!  
Based on a name and a test function, a property is defined as a getter. When called for the first time, the getter executes the test function, and replaces the accessor property by a data property which value is the result of the test. Hence, the next time the property is called, the value is already there. It is completely transparent to the user which has no idea that once the property called a function and the other times just retrieves a value.

The clean and standard way to do this is to use ECMAScript 5 [Object.defineProperty()][2].  
```js
Modernizer.addTest = function(name, test){  
    Object.defineProperty(this, name, {
        get: function(){  
            var b = !!(test());  
            Object.defineProperty(this, name, {value:b});  
                return b;  
        },  
        configurable:true
    });  
};  
```

### Wait a minute. There is an Object.defineProperty() in IE8

[Yes, there is][3] and it only works on DOM objects. Moreover, there are some property attribute combinaisons which aren&#8217;t quite allowed in IE8. More than that, apparently, it is not possible to redefine a property from an accessor to a data property. Hence I had to delete the existing property to be able to redefine it.

### Without Object.defineProperty()

Obviously, other browers don&#8217;t support Object.defineProperty(). The solution resides in [\_\_defineGetter\_\_][4] if it exists and giving up (not doing lazy testing and executing everything) if it doesn&#8217;t.

### Bonus: get operator

There is another way to define getters in JavaScript which is using the [get operator][5].  
```js
var o = {get myfeature(){return true;}};  
```

However, as far as I can tell, all browsers allowing this allow one of the previous solutions, so, there is no need for that. But let&#8217;s assume there is for a minute. So the Object.defineProperty doesn&#8217;t work, the \_\_defineGetter\_\_ doesn&#8217;t either. Does the get operator work?

#### How to perform JavaScript syntax feature detection?

This is actually an interesting question. Usually, feature detection uses JavaScript to see if there is such object or such function or executing such function. Here, I don&#8217;t need to execute JavaScript. I need to see if some JavaScript syntax is supported. Consequently, I &#8220;cannot use JavaScript itself&#8221;, because if I do and if the syntax isn&#8217;t supported in the tested browser, the interpreter will stop. The only solution I can think of is actually to put the JavaScript code in eval(), wrap it in a try-catch block and see if a SyntaxError is thrown.

But when you&#8217;ve &#8220;proved&#8221; that your syntax is working, how do you use it without breaking in browsers that don&#8217;t support this syntax? I see two solutions. One is to dynamically and conditionnally loading a script with this syntax if proved that it works. The other solution would be to use eval, again.

For the record, nothing in the bonus section has been tested. These are just thoughts.

## Applying it to Modernizer

Obviously, with how Modernizer currently works, my strategy cannot be used since modernizer adds classes to the html element. In order to apply my technique Modernizer would need to be changed so that a Modernizer user would explicitely say what tests they want to perform.

## Conclusion

We have seen in this article getters used in order to perform lazy feature detection. We&#8217;ve also discussed how JavaScript syntax feature detection could be performed. [Check out the code][6] to test and mess around. It has been successfully testing on IE8, IE7 (actually IE8 in IE7 mode), latest stable Chrome, Firefox 3.6 and Firefox 4b10.

**Edit:** Two very interesting articles ([[1]][7] [[2]][8]) made me realize that only old browsers do not have JavaScript getters and features/quirks/problems of these are well-known. Based on that assumption, for these old browser, having a constant object with all test results pre-computed could be a complementary solution to lazy feature testing with getters.

 [1]: http://www.modernizr.com/
 [2]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/defineProperty
 [3]: http://msdn.microsoft.com/en-us/library/dd229916%28VS.85%29.aspx
 [4]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/defineGetter
 [5]: https://developer.mozilla.org/en/JavaScript/Reference/Operators/Special_Operators/get_Operator
 [6]: https://github.com/DavidBruant/LazyFeatureDetection
 [7]: http://infrequently.org/2011/01/cutting-the-interrogation-short/
 [8]: http://www.nczonline.net/blog/2011/02/08/on-ua-sniffing-browser-detection-and-alexs-post/