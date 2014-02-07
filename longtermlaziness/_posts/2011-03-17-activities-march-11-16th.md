---
title: 'Activities &#8211; March 11-16th'
author: David Bruant
layout: post
permalink: /?p=132
categories:
  - Uncategorized
---
The idea of blogging on a daily basis is too restrictive. From now on, I&#8217;ll blog once in a while on my activities.

*   March 11th 
    I&#8217;ve been planning on participating to the [March 9th Wiki Wednesday][1]. The &#8220;The DOM and JavaScript&#8221; page sounded like an interesting thing to work on. I have finally ended up writing completly something else. The URL may change, so I&#8217;ll give it as soon as it&#8217;s done. The main point of my page is to give an overview of JavaScript technologies. When talking about browser scripting, people talk about &#8220;JavaScript and the DOM&#8221; but that&#8217;s a mistake. There are a lot lot more technologies, but sometimes, it&#8217;s not really obvious since they are all (DOM, HTMLDOM, events) accessible on the exact same object through inheritance which gives the impression that everything is flat. I&#8217;ll try to finish a first draft of this page very soon.
    
    I&#8217;ve also been trolling on es-discuss on for-in loops enumeration order.

*   March 13th 
    Spent part of the day watching node.js-related videos ( [[1]][2] [[2]][3] [[3]][4] ). Very interesting. It&#8217;s interesting how the project takes very low-level considerations (order of scale of memory access, hard drive read, network) and uses these as a baseline of a somewhat high-level framework (evented IO). 
    One good result to keep in mind is that in order to create a highly concurrent web server, an event mechanism achieves better than creating threads on-the-fly. (POSIX) threads consume memory and there is a scheduling cost. Small, maybe, but non-zero nonetheless. On the other hand, having one thread registering to events and responding to them and one (or more, but a constant and small number) thread multiplexing I/O and dispatching events highly reduces memory consumption and almost doesn&#8217;t suffer from scheduling. But the bigger win isn&#8217;t here. It&#8217;s architectural; it&#8217;s at the asynchronous system.
    
    Most server-side programming languages do synchronous I/O. This means that while performing a synchronous disk read, your thread sits idle. That&#8217;s the reason why other threads are created to achieve concurrency. The node.js evented all-asynchronous architecture allow to use threads as much as possible so that the memory you&#8217;ve &#8220;paid&#8221; for at creation doesn&#8217;t need to be repaid in order to achieve more concurrency.</li> 
    
    *   March 14th 
        Mostly research on some project. I&#8217;ve also been following and answering to the for-in loop iteration order discussion. The issue is that for ECMAScript objects (things like {}, not arrays), when people initialize their objects through the object-literal syntax (&#8220;JSON&#8221; sort of say), there is one information that the ECMAScript engine forget: the key order. This is true in the spec but partially false in reality since most implementation respect this order and provide it in the for-in loop&#8230; with the exception that index-like keys (numbers below 2<sup>32</sup>) are provided first. Discussion still on-going. I have raised 2 interesting points to the discussion. First, when people use objects as &#8220;dictionary&#8221;, then there is no reason for which numeric keys would be treated in a different manner. Take, for example, a music album stored [by song title as keys][5]. Second point, the for-in order is used in other parts of the spec. I actually think it should be considered as an [internal method and listed as such][6].
    
    *   March 15th 
        A decent amount of time has been spent working on a [proxy example][7] in order to [make a point on the open issue of the proxy proposal][8]. Tom Van Cutsem replied, but the mail server of my e-mail address went down before I had a chance to reply myself.
    
    *   March 16th 
        Meeting my &#8220;research team&#8221; and went to a presentation on Rascal, a meta-programming language.</ul>

 [1]: http://hacks.mozilla.org/2011/03/wiki-wednesday-march-9-2011/
 [2]: http://www.yuiblog.com/blog/2010/05/20/video-dahl/
 [3]: http://www.youtube.com/watch?v=F6k8lTrAE2g&feature=youtube_gdata
 [4]: http://jsconfeu.blip.tv/file/4306320/
 [5]: https://mail.mozilla.org/pipermail/es-discuss/2011-March/013036.html
 [6]: https://bugs.ecmascript.org/show_bug.cgi?id=73
 [7]: https://github.com/DavidBruant/PropStackObjects
 [8]: https://mail.mozilla.org/pipermail/es-discuss/2011-March/013117.html