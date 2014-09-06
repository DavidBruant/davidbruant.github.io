---
title: Web technologies are implementation and content-driven
author: David Bruant
layout: post
permalink: /?p=303
categories:
  - Uncategorized
---
I&#8217;ve been teaching some web technologies lately and I found myself telling the exact same story over and over again. Something along the lines of &#8220;feature X has initially been added in browser Y. Web developer used it, so other browsers copied it after reversed-engineering, bugs included&#8221;. If the feature has bugs, it must be standardized as such since content in the wild may rely on particular behaviors (bugs included) to run/be rendered properly. Standardizing a feature in a way that is not backward-compatible with existing content is called &#8220;breaking the web&#8221; in standards mailing-list and obviously, no one ever wants to do that!

The above quote is pretty much how everything happened after HTML4, CSS2 and ECMAScript 3 CSS (all released in 1998-1999). HTML5, CSS2.1 (and 3 to some extent) and ECMAScript 5 have been works of understanding and standardizing web technologies how they were actually implemented in browsers and used by web authors&#8230; and adding a few features. Such work is still ongoing is isn&#8217;t likely to be finished anytime soon.

## Examples

### JavaScript

A very early example is the inclusion of JScript in Internet Explorer, soon after Nescape shipped JavaScript. The name does not matter a second, but what did at the time was for Microsoft to run the content (and specifically scripts) written by web authors for Netscape. As the rumor goes, `typeof null === 'object'` was a bug in the original Netscape version that has been copied by Microsoft (and later standardized as it should since changing that could have broken scripts)

### Microsoft innovations

In the opposite direction, Microsoft invented .innerHTML and <iframe>s which have been used by web authors and very soon have been implemented in other browsers. Later standardized as part of HTML5.

### This day deployed jQuery influenced ECMAScript 5

I&#8217;ll let you read this [interesting announcement][1] where is described how some deployed jQuery code enforced a change in ECMAScript.

### Enters mobile web: Internet Explorer may consider implementing `__proto__`

It came as a shock when I first read that [Microsoft was considering implementing `__proto__`][2], but it makes a lot of sense. The mobile world is dominated by browsers implementing `__proto__` (Safari, Opera), so naturally (?), people writing [mobile libraries][3] or mobile web content take it for granted.

### -webkit-what?

There has been a huge debacle about browsers considering to implement -webkit- CSS properties. No one is really happy of the state of things, but reality is that there is content relying on -webkit- properties. If a new browser wants to enter the mobile field, it has to render existing websites and unfortunately, it seems unavoidable to implement some -webkit- properties.

Just to clarify, I&#8217;m not expressing a judgement or an opinion here, just stating facts and drawing the natural conclusion that comes out of it.

### &#8220;WTF??!!1! H.264 videos in Firefox?? Is Mozilla forgetting its mission?&#8221;

An [interesting thread started by Andreas Gal][4] discusses the possibility for B2G to use OS codecs when they are available, even for H.264 (including .flv videos which are certainly the most widespread video format on the web) and MP3. As one can imagine, support for these patent-encumbered formats in Firefox after &#8220;fighting&#8221; against them for so long is at the very least surprising. But it makes sense too: since there is no Flash on iPhones, it is very likely that web apps with video elements embed H.264 videos (only format supported on iphones according to [caniuse][5]). Android also supports this.

Knowing that there is H.264 video content out there on mobile websites, what choice is left to Mozilla? Not render any video and never enter the mobile market? As hard as it is for me to accept it, this is certainly not the right choice. I think supporting H.264 when the OS has a codec for it is a reasonable sacrifice to be made in order for Mozilla to reach users and bring its vision of how the web should be with B2G, persona, apps and the likes.

Anyway, back to the main topic&#8230;

### Last but not least: &#8220;Encrypted Media proposal&#8221;

This example is not in a mature stage as the previous ones. No one implemented it and there is no content for this now, but [Microsoft, Google and Netflix are proposing an extension for encrypted media][6]. As far as I&#8217;m concerned, just the initial picture seems too complicated to be realistic.

But technical difficulties are not that big of a deal. Some quotes in a discussion thread are more disturbing: [&#8220;Our business wouldn&#8217;t be viable at all without regional restrictions.&#8221;][7] or the no less excellent: [&#8220;[Content Decryption Modules] implementations that may not be [Free and Open Source Software]-implementable \*are\* at this time (but not necessarily in the future) a business requirement for the  
commercial video provider members of the W3C&#8221;][8].

The careful reader will make the connexion between the &#8220;at this time&#8221; and &#8220;in the future&#8221; and realize that if the CDM technology is deployed and has content relying on it, no matter if &#8220;commercial video provider members of the W3C&#8221; change their mind, the content relying on the initial CDM technology will never be readable by FOSS and that&#8217;s a bit annoying, isn&#8217;t it?

## Counter-examples

### ActiveX, VML

No one really ever implemented that besides Microsoft. Certainly because there was few to no content to support.

### Firefox&#8217;s \_\_noSuchMethod\_\_

Hopefully, you don&#8217;t even know what that it and that&#8217;s a good thing <img src="http://localhost/wp/wp-includes/images/smilies/icon_smile.gif" alt=":-)" class="wp-smiley" /> 

## Standards and validators

So I&#8217;ve claimed that web technologies are driven by implementation and content, but there are technical standards and validators, right? Software standards used to be this almost sacred thing that implementors had to follow and it was a working model. That&#8217;s how web standards were originally thought. But that&#8217;s not a relevant model anymore. The [WHATWG (group behind HTML5) was founded by browser makers][9], because there was a need for web browsers to agree on what they implemented and to implement it in an interoperable way, with the &#8220;don&#8217;t break the web&#8221; rule as a priority that apparently the W3C had not understood (but [Bruce Lawson explains it][10] better than I do)

I really think we should stop thinking standards as Bible-like texts, but rather as an **implementation agreement**. Obviously, since there is the backward compatibility constraint, there is a need for implementors to hear about what web authors (aka &#8220;developers&#8221;) have to say about how they currently use the technologies and standards mailing lists are open to this. Finally, web authors can provide feedback and suggestions to new features. That&#8217;s a rough and incomplete picture of how web standards currently work and I&#8217;m glad it does work like this.

Also, very much like implementations (software) evolve, so must the standards, hence the [HTML living standard model][11].

In the end, there are validators. I have met some people who would never ship a website if all pages do not validate. This is a wrong idea. Validators are the continuity of the ideal that standards are sacred texts. They are as wrong. They are even more wrong if the validator is kept up to date against the latest evolution of web standards (and I am confident they are not). Moreover, the analysis they provide is only partial. As any piece of software, validators can have bugs. Worse than anything else, a validator does not guarantee your content to actually renders properly on web browsers (which is what you actually care about when writing a page). Anyway, you can use validators, but stay critical on their limitations.

## HOWTO: remove annoying technologies

Most of the time, it won&#8217;t be possible. However, in some cases, some technologies are used only in a certain way and it&#8217;s still possible to standardize the technology with a restriction. Obviously, it requires a study of how people use the technologies. This was not so hard for the \_\_proto\_\_ &#8220;property&#8221; and led to a [very reasonable proposal][12] that&#8217;s unlikely to break the web.

It is a vastly more complicated work when [vendor-specific CSS properties][13]. Here, the outcome would be to decide which properties Mozilla is willing to implement rather than which properties could be removed, but the same result could be used by Webkit to remove the rarely used properties.

## Looking forward

For a web technology to be adopted, it takes 2 ingredients: 1) implement it in a wide-spread browser 2) create content using (and relying on) this technology. In retrospect, the whole prefix thing was doomed to fail. It was basically saying &#8220;we&#8217;ll do 1, but please, developers all around the world, don&#8217;t do 2!&#8221;. Clearly not a winning startegy. Needless to say that [every attempt][14] to [evangelize against prefixes][15] is meant to fail since it&#8217;s not possible to change all the content of the web (remember it&#8217;s decentralized and all of that?)

## Conclusion

If I was ever asked, my advice to browsers would be: be careful of what you implement and ship, otherwise, everyone may get stuck!

 [1]: http://blogs.msdn.com/b/ie/archive/2010/07/16/how-ie9-platform-preview-feedback-changed-the-javascript-standard.aspx
 [2]: https://mail.mozilla.org/pipermail/es-discuss/2011-December/019083.html
 [3]: https://github.com/madrobby/zepto/blob/master/src/zepto.js#L74
 [4]: https://groups.google.com/d/msg/mozilla.dev.platform/-xTei5rYThU/DkM9AIbkNNIJ
 [5]: http://caniuse.com/#search=video
 [6]: http://dvcs.w3.org/hg/html-media/raw-file/tip/encrypted-media/encrypted-media.html
 [7]: http://lists.w3.org/Archives/Public/public-html/2012Mar/0084.html
 [8]: http://lists.w3.org/Archives/Public/public-html/2012Mar/0411.html
 [9]: http://wiki.whatwg.org/wiki/FAQ#What_is_the_WHATWG.3F
 [10]: http://vimeo.com/groups/93576/videos/19099716
 [11]: https://plus.google.com/107429617152575897589/posts/NZBJe6Jjt1f
 [12]: http://wiki.ecmascript.org/doku.php?id=strawman:magic_proto_property
 [13]: https://bugzilla.mozilla.org/show_bug.cgi?id=708406
 [14]: http://www.glazman.org/weblog/dotclear/index.php?post/2012/02/09/CALL-FOR-ACTION%3A-THE-OPEN-WEB-NEEDS-YOU-NOW
 [15]: http://codepo8.github.com/prefix-the-web/