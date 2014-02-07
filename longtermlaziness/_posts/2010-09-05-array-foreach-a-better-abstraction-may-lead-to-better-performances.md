---
title: 'Array.forEach() &#8211; a better abstraction may lead to better performances'
author: David Bruant
layout: post
permalink: /?p=71
categories:
  - Uncategorized
---
We have seen in the first article about forEach that this method helps writing code with a better abstraction. This helps the human being. It could also be used by the interpreter to improve performance. Let&#8217;s see this with an example :

[sourcecode language="javascript" light="on"]  
var a = [1,2,3,4,5,6];  
// turn each element of the a array into its square  
a.forEach( function(e){return e*e;} );  
[/sourcecode]

Even though ECMAScript imposes forEach to process elements in the array order, we can clearly see for this particular example that there is no need for such a guarantee and the result would be exactly the same if the elements were visited in any order.  
With such a freedom, we could imagine an interpreter opening several threads (maybe not for a 6-element array, but you get my point), equally distributing the workload across the threads and finishing the forEach call after the last thread has finished.  
If we have the guarantee that the forEach call result is independent of the visit order, there is not even a need to protect the array with a mutex since the writings on the array are independent.

Of course, it is quite easy to build an example where the order matters.  
[sourcecode language="javascript" light="on"]  
var a = [1,2,3,4,5,6];  
// turn each element of the a array into itself times the previous element  
a.forEach( function(e, i, a){ return i===0 ? e : e*a[i-1];} );  
[/sourcecode]

In this example it is quite clear that the dependence in the previous computation makes impossible to parallelize the forEach call.

Of course, allowing parallelization also depends on the array forEach is called on. And the following step/question is : for which pair of (functions, array) provided as argument to forEach (the array as the `this` object) can the call be parallelized and for which isn&#8217;t it possible ?  
Since the arrays can vary a lot, a more interesting question is : for all array, for which functions provided as argument to forEach can the call be parallelized and for which isn&#8217;t it possible ?

This seems to be like a very complicated static analysis question and I won&#8217;t try to answer it. The potential exists though.