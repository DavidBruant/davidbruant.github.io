---
title: 'Case study #2 undefined initialization'
author: David Bruant
layout: post
permalink: /?p=63
categories:
  - Uncategorized
---
[airportyh][1] and I are currently working on an ES3-based implementation of ES5 array extras. As such, we are trying to conform as much as we can to the chapter 15.4.4 [ES5 conformance suite][2].  
With this suite comes a testing library sth.js. After throwing this library into [jslint][3]. I saw that there are variable initializations to `undefined`. This is bad for two reasons.  
I explain what to do with object properties in a third part.

### If you don&#8217;t want to define it, don&#8217;t do it

By default, the value of a variable that is not initialized is `undefined`  
[sourcecode language="javascript" light="on"]  
var a;  
alert(a); // alerts "undefined"  
[/sourcecode]  
There is no trap, no ambiguity, no inconsistency. This behavior exists since the big bang.

### `undefined`&#8216;s value may not be `undefined`

[sourcecode language="javascript" light="on"]  
var undefined = 5; // No error, no mistake, no joke.  
var a = undefined;  
alert(a); // alerts &#8217;5&#8242;  
[/sourcecode]  
Quite scary. In the weirdest cases where the code you write is wrapped (to be made private, for instance), it could be in an environment where undefined is overridden. 

### Getting rid of an object property

Once again, assigning `undefined` is not the good idea.  
Two solutions : if you want to keep the property in the object, but get rid of the value, assign to `null` (you cannot do the previous assignment trick with `null`). If you want to remove the property from the object, use `delete` on this property.

Note : `delete` removes a property from an object. It doesn&#8217;t &#8220;delete&#8221; an object from the memory. I will write an article about `delete` sooner or later

### Conclusion

My conclusion is simple : never initialize to undefined. There is no reason for it and it might be dangerous.

 [1]: http://tobyho.com/
 [2]: http://es5conform.codeplex.com/
 [3]: http://www.jslint.com/