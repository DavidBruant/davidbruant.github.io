---
title: A couple of things learned from the August Doc Sprint
author: David Bruant
layout: post
permalink: /?p=245
categories:
  - Uncategorized
---
This week-end was a [MDN doc sprint][1]. I haven&#8217;t had the time to do a lot, but some of the interactions have been really useful and i&#8217;d like to share a couple of things i&#8217;ve learned.

## setImmediate

On the [Doc Sprint Etherpad][2], I have noticed that Jonathan Wilsson (McGurk) added pages for [setImmediate][3] and [clearImmediate][4]. These [not-yet-specified functions][5] aim at being an efficient replacement to setTimeout(0) (which is clamped to 4ms for historical reasons) and its [hack-ish postMessage based replacement][6].

In a way, this is a good news, but it&#8217;s a bit overlapping with what [<span title="ECMAScript technical commitee in charge of the next version of ECMAScript">TC39</span> has in mind for concurrency][7]. [In an es-discuss e-mail][8], Mark Miller sounded enthusiastic with the idea of [making Q.delay part of the default upcoming concurrency API][9]. This would make 2 features for the same purpose. As stated in the es-discuss quoted thread i started, it would make more sense to bring `setTimeout` to ECMAScript rather than letting it be part of a web standard since timing issue aren&#8217;t really specific to the web. As a matter of fact [Node.js uses the same API][10].

## textContent VS innerText

I have improved the style for [Node.textContent][11] and have read with great interest the notes which state some difference with Microsoft&#8217;s `innerText`. One being that `innerText` cannot retrieve the text from <script> and <style> elements. Well&#8230; That is the explanation of why [Selectivizr][12] explains that &#8220;Styles defined in <style> tags won&#8217;t be parsed.&#8221; (in old IE, of course).

## innerHTML counter-intuitive performance

I&#8217;ve added a [security consideration section to the innerHTML page][13]. It was the occasion to re-read the page and re-find [Quircksmode performance test][14]. And even in modern Firefoxes and Chrome, innerHTML keeps being (2-3 times) faster than creating DOM elements in memory and appending them. I have to admit that this is counter-intuitive for me (innerHTML requires parsing and creation of a document fragment while DOM elements manipulation doesn&#8217;t require the parsing). The best explanation i can come up with is that innerHTML is one line of JavaScript while the several creations and appending required to do the same operations require roundtrips between native code and JavaScript code. I&#8217;m looking forward to see [dom.js][15] being finished and hopefully integrated in browsers to re-test its performance against a native innerHTML.

 [1]: https://wiki.mozilla.org/MDN/Doc_sprints/2011August
 [2]: http://etherpad.mozilla.org:9000/docsprint2011August
 [3]: https://developer.mozilla.org/en/DOM/window.setImmediate
 [4]: https://developer.mozilla.org/en/DOM/window.clearImmediate
 [5]: https://dvcs.w3.org/hg/webperf/raw-file/tip/specs/setImmediate/Overview.html
 [6]: http://jsperf.com/postmessage
 [7]: http://wiki.ecmascript.org/doku.php?id=strawman:concurrency
 [8]: https://mail.mozilla.org/pipermail/es-discuss/2011-March/013213.html
 [9]: http://wiki.ecmascript.org/doku.php?id=strawman:concurrency#q.delay
 [10]: http://nodejs.org/docs/v0.0.1/api.html#timers
 [11]: https://developer.mozilla.org/En/DOM/Node.textContent
 [12]: http://selectivizr.com/
 [13]: https://developer.mozilla.org/en/DOM/element.innerHTML#Security_consideration
 [14]: http://www.quirksmode.org/dom/innerhtml.html
 [15]: https://github.com/andreasgal/dom.js/