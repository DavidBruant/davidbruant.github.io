---
title: 'Array.forEach &#8211; The genericity potential'
author: David Bruant
layout: post
permalink: /?p=54
categories:
  - Uncategorized
---
In the [previous article][1] we discovered the .forEach method and the others Array methods normalized by ECMAScript 5. 

### `.forEach()` natively out of the DOM

This is interesting, but it seems to be limited. Indeed, unless you are writing some mathematic library in JavaScript, you usually don&#8217;t manipulate Array, but rather Array-like objects such as [HTMLCollection][2] or [NodeList][3] you got from `document.getElementsByTagName('a')`, `querySelectorAll('.tab')` or `table.rows`.  
Sadly, non of these interfaces is an ECMAScript Array. (see ECMAScript bindings for [DOM Core Level 3][4] and [DOM HTML][5]. Actually, the word &#8220;Array&#8221; doesn&#8217;t appear a single time in any of these documents.

A natural consequence is that the following code raises an error :  
[sourcecode language="javascript" light="on"]  
var cells = document.getElementsByTagName(&#8216;td&#8217;);  
cells.forEach(function(e,i,a){  
e.style.backgroundColor = randomColorString();  
// randomColorString has been previously defined  
});  
[/sourcecode]

This is quite sad but that&#8217;s another debate.

### ECMAScript 5&#8242;s good idea

About the `forEach` method and other Array methods, the specification states the following :

> NOTE : The `forEach` function is intentionally generic; it does not require that its` this` value be an Array object. Therefore it can be transferred to other kinds of objects for use as a method. Whether the `forEach` function can be applied successfully to a host object is implementation-dependent. 

After a closer look at the `forEach` specification, it turns out that this method could be used on any object with a `length` property and having properties with 0..(length-1) as identifiers. This last condition is not necessary, but corresponds to `forEach` semantics.

#### Let&#8217;s try !

getElementsByTagName is [not standard-compliant on Firefox][6], but even with the following code inserted before the above one :  
[sourcecode language="javascript" light="on"]  
NodeList.prototype.forEach = Array.prototype.forEach; // For standard-compliant browsers  
HTMLCollection.prototype.forEach = Array.prototype.forEach; // For Firefox which consider that getElementsByTagName returns an HTMLCollection  
[/sourcecode]  
The previous background-color randomizing code works. (Note : It didn&#8217;t on Firefox 3.5, but does on Firefox 3.6). I have also tested on Opera 10.61 and Chrome 5

Fantastic idea from the TC39 ECMA committee (people who wrote ES5) to have the array extra methods generic to make them transferable to other objects.

 [1]: /2010/04/19/array-foreach-introduction/
 [2]: http://www.w3.org/TR/2003/REC-DOM-Level-2-HTML-20030109/html.html#ID-75708506
 [3]: http://www.w3.org/TR/2004/REC-DOM-Level-3-Core-20040407/core.html#ID-536297177
 [4]: http://www.w3.org/TR/2004/REC-DOM-Level-3-Core-20040407/ecma-script-binding.html
 [5]: http://www.w3.org/TR/2003/REC-DOM-Level-2-HTML-20030109/ecma-script-binding.html
 [6]: https://bugzilla.mozilla.org/show_bug.cgi?id=14869