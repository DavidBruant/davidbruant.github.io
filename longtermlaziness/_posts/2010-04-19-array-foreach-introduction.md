---
title: 'Array.forEach() &#8211; Introduction'
author: David Bruant
layout: post
permalink: /?p=35
categories:
  - Uncategorized
---
One of the most fantastic feature of JavaScript is that functions are considered as first-class objects. A first consequence of this is that it allows functional programming. One usage of functional programming is to manipulate arrays easily.

ECMAScript 5 has standardized some methods that existed for a while in Firefox :

*   every
*   some
*   forEach
*   map
*   filter
*   reduce
*   reduceRight

Each of these methods can be used instead of a common pattern of imperative programming. For example, the `.forEach()` method can be used when you are writing the following code.  
[sourcecode language="javascript" light="on"]  
// Let&#8217;s assume that &#8216;a&#8217; is an array and &#8216;f&#8217; a function previously declared  
var i, l;  
for(i=0, l=a.length ; i<l; i++){  
f(a[i], i, a); // the order of the arguments is the one used in ES5  
}  
[/sourcecode]

With .forEach :

[sourcecode language="javascript" light="on"]  
// Let&#8217;s assume that &#8216;a&#8217; is an array and &#8216;f&#8217; a function previously declared  
a.forEach(f);  
[/sourcecode]

Somehow, each of the &#8220;Array extras&#8221; is an hidden loop.  
Each method has a compulsory argument which is the function (&#8220;callback function&#8221;) to be called on each array element and an optional argument which is an object used as the `this` value of the function used as first argument.  
Expect for `reduce` and `reduceRight`, the function used as an argument can have between 1 and 3 arguments with already defined semantics. The first argument is the element of the array, the second argument is its index and the third, the array being traversed.

Among the advantages of those methods we can find :

*   Smaller code
*   Better abstraction (no need to read all the code to understand that the same treatment is applied to each element)
*   No need for a loop counter. It seems minor, but it means that this JavaScript variable doesn&#8217;t need to be allocated and then garbage-collected at the end of its life-time. This should result to better performance.

We will see in a next article that forEach and the other Array methods may not be limited to arrays.  
In another article about these methods, I will go further in the idea of &#8220;better abstraction&#8221; and the different advantages this better abstraction can provide in term of performance.  
In a last article, I will provide some code to use at the beginning of an application to be able to use these methods even in an ECMAScript 3 but not 5 compliant environment ([like IE all versions, even 9pre][1])

 [1]: http://kangax.github.com/es5-compat-table/