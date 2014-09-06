---
title: Proclaiming myself King of the MDN JavaScript Documentation
author: David Bruant
layout: post
permalink: /?p=243
categories:
  - Uncategorized
---
## Dear JavaScript Community,

About two years ago, a very wise man told me that power is not something you&#8217;re handed, it&#8217;s something that you take. Despite how absurd this sentence may sound, i have noticed it to be true in many occasions.  
And I think that time has come that i decide to take responsibility for the MDN JavaScript documentation, so today, now, i&#8217;m proclaiming myself King of the MDN JavaScript Documentation.

## JavaScript documentation

### Need for documentation

JavaScript has been around for more than 15 years now. And i can&#8217;t name one website that has up-to-date and complete enough documentation for it. I have recently written a page that i consider of good enough quality for the [this][1] keyword. More than 15 years after the invention of JavaScript! &#8230;and i am not 100% confident that this page is complete.

Of course, I can find one hundred good blog posts out there to get this documentation. But how can i edit it if there is a mistake? Tell in a comment and wait for the author to fix the article? How can i improve this blog post to mention a bug in some version of IE? Blog posts are not sustainable for documentation. So are not static websites like W3Schools, especially when specialists of the community need to set up [ another website][2] to fix the former.

Moreover, with initiatives and platforms like Node.js, Windows 8, MangoDB which use (or will use) JavaScript in non-browser environments, we need more than ever before to better advertise good JavaScript patterns, to better explain the fundamentals of the language, with accurate wording and phrasing.

We do not need documentation since the documentation exists. We need a CC-licenced, user-editable resource. This is the only way we can reach the goal of a good AND sustainable documentation.

### Writing the doc ourself

JavaScript is an open technology. It&#8217;s not a library or a software with a team dedicated to writing documentation. It&#8217;s an open technology. It&#8217;s no one&#8217;s task to write the doc. Consequently, it&#8217;s everyone&#8217;s job to do it.

Less than a year ago, Chris Williams [ encouraged us][3], Community.js to [ educate (among other things) people who learn the JavaScript language][4]:

> We have made it almost impossible to learn proper JS, a language with both beauty and warts. Some will say it is not our fault, that browser vendors should provide the API documentation for the implementation or that the standards committee should publish and market it. **I am calling bullshit on that**. I say that it is up to us to invite, welcome, and most importantly properly educate people looking to learn JS. We, the best and brightest of the field, have an obligation to help those who are trying to learn and understand the complexities of the language. We are the ones that benefit from it most, since those now entering the language will be either extending, morphing, or taking over the very projects we are just now starting. Regardless of library, framework, and even language &#8212; if everyone knows how to program proper JS a little better, we all win. Period.

And as it turns out, we already write the doc. I see you, pirates of all seas, creating [gists][5], tweeting, writing blog posts to document JavaScript quircks, oddities, bugs, little known facts, best performance patterns. But after these informations have been shared among the hundreds of people in our community, they unfortunately get lost down our timelines, fragmented across the web and our memory. **We need to sustain them.**

### A word on the Mozilla *Developer* Network ambiguity

I have discussed several times with friends, members of the JS community and one recurrent concern about MDN is that it&#8217;s &#8220;governed&#8221; by Mozilla. To this concern, I have two answers. The first one is that, the people who &#8220;govern&#8221; the documentation at Mozilla, namely [Sheppy][6] and [Janet][7] are committed to make the open web technologies (HTML, CSS, JS, SVG, etc.) documentation vendor-neutral. I know for a fact that they are working on creating partenership with other vendors or organizations to have them document their specific features on MDN. That&#8217;s one of the things [ Kevin Lim from Google worked on during the last doc sprint][8]. My second answer is that i am now the King of the JavaScript documentation and i am committed to make this documentation valuable for any web developer regardless of browser preference.

My vision and Mozilla&#8217;s on what the JavaScript documentation should be are aligned. If they ever happened to be strongly different, the content is CC-licenced and I could take action to restart fresh somewhere else. But we are currently not in such a situation and am currently confident we won&#8217;t be in the foreseeable future.

### Does documentation need a King?

Per se, no, no documentation need a king. But like all wiki, it needs some people to take care of overall style consistency, that conventions are respected, that tags and &#8220;draft&#8221; banners are removed when not needed anymore.

### What about Sheppy and Janet?

Yes, there are only 2 persons at Mozilla officially taking care of the MDN documentation. That&#8217;s not enough. They do not have enough time to spend on making the JavaScript documentation as good as i wish it was. So, I&#8217;m taking the responsability (and they will learn it through this blog post. <span title="though i briefly told Janet already, dammit!">Hi guys <img src="http://localhost/wp/wp-includes/images/smilies/icon_smile.gif" alt=":-)" class="wp-smiley" /> </span> ).

## Kingdom scope and priorities

I am not claiming to be the King of all MDN. That&#8217;s way too wide for one person. I will take care of all technologies that are part of [ this JavaScript overview][9] which includes ECMAScript, the DOM (it&#8217;s JavaScript binding at least) and all the JavaScript APIs that are described in the HTML5 specification. Having first-class documentation for these things is my first priority.

I wish to document IE8 (and later, of course) and by this is I mean documenting every JavaScript bug that a developer can come across on IE8. Ideally, i woud love to have the same thing on IE6/7, but i think that by the time the previous priorities are accomplished, these won&#8217;t have enough market share anymore for us to care about taking the immense amount of time necessary to document these browsers. Of course, contributions on IE6/7 are more than welcome, they are just not on my priorities.

As said above, the JavaScript community is always digging good practices, patterns, best performances. I declare that MDN is a suitable place to sustain these informations!

I also declare that the CommonJS community is welcome to document the mature and widely adopted specifications on MDN. The work done by the CommonJS community needs more visibility, to be widely known by the web dev community, especially all the work on modules which is a recurring issue in JavaScript.

Some APIs like the [console API][10] are increasingly becoming *de facto* standards and have the same need of compatibility tables even though they are not part of the web platform per se. They&#8217;ll need to be documented.

## Opening the kingdom

What i am going to say in this section was true before, but i am going to say it explictely and out loud. Dear JavaScript Community, you are welcome in my kingdom. This place is yours as well as it is mine. If you believe in a CC-licenced user contributed documentation, my kingdom is open to your participation.

You, JavaScript Pirates of all seas, you are welcome to stop by and share your knowledge. Your thoughts on performance, browser compatibility, good practices, JavaScript patterns as well as shims, tutorials, examples are more than welcome.

## Conclusion

Well, I&#8217;m the king now! I&#8217;m looking forward to see the JavaScript documentation awesome! As it turns out, I will be [at the JS Conf EU hanging out at the Hacker lounge][11]. Come by to discuss how to improve the JavaScript doc or report errors/mistakes, learn how to contribute to MDN!

 [1]: https://developer.mozilla.org/en/JavaScript/Reference/Operators/Special/this
 [2]: http://w3fools.com/
 [3]: http://blip.tv/jsconfeu/chris-williams-community-js-4253233
 [4]: http://jsconf.eu/2010/communityjs_by_chris_williams_1.html
 [5]: https://gist.github.com/
 [6]: https://twitter.com/sheppy
 [7]: https://twitter.com/jmswisher
 [8]: http://hacks.mozilla.org/2011/06/three-way-cheers-for-the-mdn-doc-sprint/
 [9]: https://developer.mozilla.org/en/JavaScript_technologies_overview
 [10]: http://getfirebug.com/wiki/index.php/Console_API
 [11]: https://wiki.mozilla.org/MDN/Doc_sprints/2011October