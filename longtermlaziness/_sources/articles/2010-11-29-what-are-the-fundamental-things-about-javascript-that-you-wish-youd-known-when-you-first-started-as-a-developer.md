---
title: 'What are the fundamental things about JavaScript that you wish you&#8217;d known when you first started as a developer?'
author: David Bruant
layout: post
permalink: /?p=96
categories:
  - Uncategorized
---
This is a question I have been asked by the amazing [Pippa Buchanan][1] from the [P2PU school of webcraft][2]. Here is my answer :

I think that JS is a sum of a lot of technologies and that web developers should very early be aware of the differences between them:  
1) [ECMAScript][3]: That&#8217;s the core language JavaScript is based on. That&#8217;s &#8220;just a programming language&#8221;. It defines the JavaScript native types. This include [Objects][4], [Arrays][5] and [functions][6]  
2) The document object inherits form a lot of different interfaces:  
* [Node][7] which is &#8220;just here&#8221; for the tree structure (ok, well, a bit more). This interface is common with [Elements][8] and contains parentNode, cloneNode&#8230;  
* [Document][9] which contains .createElement, .getElementById. This interface is the one used by the [responseXML][10] attribute of XMLHttpRequest. This is common with XML-based documents.  
* [HTMLDocument][11]. It adds a bunch of HTML-specific things like .body, .links or the .write method (this last one should be avoided, but that&#8217;s another story)  
* HTML5 redefines the [HTMLDocument][12] interface and add for instance .getElementsByClassName()  
3) Events  
Besides that, the event programming paradigm is not easy to understand. Unlike &#8220;C programming&#8221; where you have a &#8220;main&#8221; function and a &#8220;return&#8221; at the end, JavaScript isn&#8217;t continuously executed. There is a bit of execution at the beginning for initialization purposes and after that it&#8217;s all user (click/keypress) or network (XMLHttpRequest events) or clock ([settimeout][13]) driven which could be all summarized as &#8220;events&#8221; (even if the clock &#8220;events&#8221; aren&#8217;t DOM events).  
The DOM event mechanism is well explained in [one picture][14].

 [1]: http://twitter.com/pipstar
 [2]: https://www.drumbeat.org/p2pu-webcraft
 [3]: http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-262.pdf
 [4]: https://developer.mozilla.org/en/JavaScript/Guide/Working_with_Objects
 [5]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array
 [6]: https://developer.mozilla.org/en/JavaScript/Reference/Functions_and_function_scope
 [7]: http://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-1950641247
 [8]: http://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-745549614
 [9]: http://www.w3.org/TR/DOM-Level-3-Core/core.html#i-Document
 [10]: http://www.w3.org/TR/2010/CR-XMLHttpRequest-20100803/#the-responsexml-attribute
 [11]: http://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-26809268
 [12]: http://www.whatwg.org/specs/web-apps/current-work/multipage/dom.html#documents-in-the-dom
 [13]: https://developer.mozilla.org/en/Window.setTimeout
 [14]: http://www.w3.org/TR/DOM-Level-3-Events/#event-flow