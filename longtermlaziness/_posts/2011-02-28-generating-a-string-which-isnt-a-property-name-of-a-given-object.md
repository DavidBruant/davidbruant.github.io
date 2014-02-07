---
title: 'Generating a string which isn&#8217;t a property name of a given object'
author: David Bruant
layout: post
permalink: /?p=120
categories:
  - Uncategorized
---
Helping out with the [test262 test suite][1] (official ECMAScript 5 test suite), I have come to a problem. Based on a given object, find/generate a string which isn&#8217;t a property name of the object.

Here is [the solution][2] I&#8217;ve come up with  
[sourcecode language="javascript" light="true"]  
function unusedPropertyName(o){  
var ownPropNames = Object.getOwnPropertyNames(o);

var unusedName = ownPropNames.reduce(  
function(prev, curr, i){  
var A = &#8216;a&#8217;, B = &#8216;b&#8217;;  
var l = curr[i];  
l = (l=== undefined || l !== A) ? A : B;

return prev + l;  
}, &#8221;);

return unusedName;  
}  
[/sourcecode]

The idea is to list all property names. Then, create a string which has one letter that differs from each property name. This idea is inpired by [Cantor&#8217;s diagonal argument][3].

I found it was an interesting use of Array.prototype.reduce and was worth sharing.

 [1]: http://test262.ecmascript.org/
 [2]: https://bugs.ecmascript.org/show_bug.cgi?id=33#c5
 [3]: http://en.wikipedia.org/wiki/Cantor%27s_diagonal_argument