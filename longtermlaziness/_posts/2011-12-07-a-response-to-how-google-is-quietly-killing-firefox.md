---
title: 'A response to &#8220;How Google is quietly killing Firefox&#8221;'
author: David Bruant
layout: post
permalink: /?p=277
categories:
  - Uncategorized
---
Here is a response to [this article][1]

## Article summary

The article explains that browsers (all including Firefox and Chrome according to the author) crash more frequently because of a lack of memory since web applications are now more JavaScript intensive. The author explains that it&#8217;s not always the browser&#8217;s fault to be memory hungry and sometimes is the fault of the web developer. I agree with this part. I would even also add that it is not because JavaScript has a garbage collector that it avoids memory leaks. Some leaks are at the application level and I really think a &#8220;WebValgrind&#8221; should emerge to tell at the JavaScript level where a web app leaks.

Then starts paranoia:  
> Mozilla&#8217;s greatest revenue source today (accounting for more than 80 percent of annual income) is Google. Mozilla is deeply dependent on Google for operating revenue.</p>
Mozilla is not dependent on Google. Mozilla is dependent on search-related contracts. [Asa Doltzer wrote about it 4 years ago][2]. He was right at the time and what he wrote still stands. Mozilla is not dependent on Google.

And it goes on:  
> If you buy the theory that most people who abandon Firefox do so because it crashes (runs out of memory) unpredictably, it stands to reason that all Google has to do to pick up market share in the browser world is publish AJAX-intensive web pages (Google Search, Gmail, Google Maps, etc.) of a kind that Firefox&#8217;s garbage-collection algorithms choke on — and in the meantime, improve Chrome&#8217;s own GC algorithms to better handle just those sorts of pages.</p>
## Response on different points

### Google creates AJAX-intensive web apps that purposefully leak

This is a ridiculous accusation. Imagining that all competitors started to have better garbage collection, what would they be left with?

Google makes AJAX-intensive applications for the purpose of improving the user experience. End of story. Memory leaks are the result of the current software attitude which is to keep adding features without caring long-term performance.

### Memory leaks are made to make Firefox crash

This is ridiculous as well. Does anyone really think that Google web devs wake up in the morning thinking &#8220;hey, what about I add a few more memory leaks to make a some browser crash?&#8221;. If the browser crash with a given service (Google maps, for instance), some people will change of browser, some others will just change of service and this is not in Google interest.

Also, why does Firefox crash in the first place? Maybe Firefox should work toward improving it&#8217;s memory management? Oh wait! [they are][3] [already working][4] [on that][5]!! (and these are just a few links). Once we see improvements of these bugs on Firefox, I guess Google web devs will have to work a lot harder to make Firefox crash. Good luck, guys!

### On &#8220;Google is a uniform corporation with an evil plan to kill Firefox, booo!&#8221;

I recently [attended JSConf.eu][6] and I&#8217;ve had the occasion to chat a few minutes with Erik Corry after his talk on improving V8 garbage collection. Call me naive or stupid, but the image I kept from him was the one of a dedicated (maybe even passionate) engineer working to improve his product. Is he a slave serving an evil Masterplan to control the universe? I don&#8217;t think so.

## On hyperbolic blog article titles

&#8220;[How Google is quietly killing Firefox][1]&#8220;, &#8220;[Is Google Chrome the New IE6?][7]&#8220;&#8230; What is the next title? &#8220;Chrome is bringing back Nazis&#8221;?

Chris Heilmann already [warned us about hyperboles (start at slide 74)][8]. I think we really should stop these titles, because they create more confusion that anything. No, Chrome&#8217;s plan is not to kill Firefox by purposefully introducing memory leaks in its webapps. No, Chrome is not IE6. There are many differences.

I agree that there are some [disturbing informations about Google and its commitment to openness][9], but it does not make Chrome IE6.

Side note. It took me some time to understand why my previous post hit 1400 views and I get now that it probably its title was sort of flashy. I regret it.

 [1]: http://asserttrue.blogspot.com/2011/12/how-google-is-quietly-killing-firefox.html
 [2]: http://weblogs.mozillazine.org/asa/archives/2007/10/firefox_finance.html
 [3]: https://bugzilla.mozilla.org/show_bug.cgi?id=641025
 [4]: https://bugzilla.mozilla.org/show_bug.cgi?id=619558
 [5]: http://blog.mozilla.com/dmandelin/2011/12/06/mozilla-js-development-newsletter-1130-1206/
 [6]: http://hacks.mozilla.org/2011/10/jsconf-eu-doc-sprint-results/
 [7]: http://www.pcmag.com/article2/0,2817,2397158,00.asp
 [8]: http://www.slideshare.net/cheilmann/finding-harmony-in-web-development
 [9]: https://twitter.com/#!/BrendanEich/status/144290721422262272