---
title: Thoughts on browsers market shares
author: David Bruant
layout: post
permalink: /?p=104
categories:
  - Uncategorized
---
## Numbers and interpolation

Based on [statcounter stats][1], IE6 market share dropped from 6.48% to 4.96% in the last 10 weeks. I predict it should take one more year or so to see it under 1%.

Meanwhile, in the same period, IE7 has gone from 11.95% to 10.55%.This means that IE7 will have be to supported for the next 3 years or so. I&#8217;m being optimistic here, because people (and companies) are getting aware that they can change they web browser and even upgrade it. Three more years without CSS table display, cross-document messaging or data URL and a bunch of other features which cannot really be emulated or compensated with a couple of lines of JS. But that&#8217;s not the worst part.

World-wide operating systems market share show a current Windows XP market share at about 50%. What&#8217;s wrong with this? IE9 doesn&#8217;t run on Windows XP. Meaning that we are going to have to make websites work for IE8 for a while. Another issue is the part of the population who doesn&#8217;t know how to upgrade/change the web browser or are simply not allowed to (this still happens in some companies). These people, on Windows 7 with IE8 by default, won&#8217;t change. IE8 is going to be in 3-4 years what IE6 currently is: a web browser that keeps the web under its technical capacities. And as opposed to IE6, we won&#8217;t be able to say &#8220;hey, upgrade your browser&#8221; (because of the XP problem).

## Potential solution

From the user perspective, IE6 or IE8 didn&#8217;t make that much of a difference besides the speed (which count a lot) and cleaner look. This time can be highly different. There are a lot of features which aren&#8217;t available in IE8 that can change the web app experience. Rich graphics (Canvas, SVG), offline web app, WebWorkers, fileAPI, WebSocket (hopefully, the protocol will be fixed soon) to name a few are either hard or impossible to emulate with JavaScript. Depending on how ready web developers are to loose a few visitors, they can use in their app the subset of features that are also implemented in IE9 (to support it, since IE10 should be released in a half billion year) and say to their IE8 (and below) visitors that they should change their web browser. A short video could easily explain and show what the website could do and say that their current browser cannot do it.

## Alternative future: Flash to compensate

A lot of people are expecting new open web app technologies (HTML & CSS next generation, rich graphics, video, audio) to kick Flash&#8217;s ass. One should not forget that Flash has at least the merit of having all its features supported in all web browsers and I&#8217;m afraid that having IE8 around will be the occasion for Flash to continue shining with a lot of very fancy features in all web browsers. And Flash may become again a first choice to develop a web app since it will cost less to have the same very fancy app working in all web browsers.

## Conclusion

IE8 becoming the next IE6 seems quite sure already. Encouraging visitors to move on by using today or very soon new open web technologies (supported by IE9) and creating a small video (hosted on youtube, dailymotion, vimeo, whatever) seems to be a good plan to make the web go forward.

 [1]: http://gs.statcounter.com/