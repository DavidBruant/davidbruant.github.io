---
title: Another way of thinking online payment
author: David Bruant
layout: post
permalink: /?p=286
categories:
  - Uncategorized
---
I was [reading an interesting post about encryption][1] and it made me feel a need to respond on what is said about credit cards.

## Capabili-what?

Very soon after I joined [es-discuss][2], I read some messages by Mark S. Miller. Soon enough, I watched [his infoQ talk][3]. This talk introduces the notion of **object capabilities**. This talk and this concept blew my mind. &#8220;Modularity increases my security?&#8221;. And he also shows the problem (and a solution) of distributed secure currency. Any &#8220;smart&#8221; idea I&#8217;ll write in this post are actually more or less already in this part of the talk.

Unrelatedly, I watched a talk by [Douglas Crockford][4] which suggested people to go watch [The Lazy Programmer&#8217;s Guide to Secure Computing][5] by Marc Stiegler which strongly emphasis POLA. [I did][6] and took the same sort of mind-blowing shower. I will learn later that Marc Stiegler and Mark Miller have been working together.

This led me to start reading [Mark Miller&#8217;s thesis][7] (haven&#8217;t finished yet, but still working on it) and to [watch][8] [some][9] [other][10] [talks][11]. It also led me to read about [petnames][12], [rich sharing][13], [website passwords][14], [web introducer][15] and [many][16] [other][17] [interesting][18] [things][19].

There are years of serious research poorly summurized in the links above. I highly encourage to read and watch all of this, but I admit it takes a lot of time to.

## Thousands of credit cards numbers stolen during the Sony Playstation network hack

People have given their credit card number to Sony. Sony got hacked. People were annoyed. Who is to blame? Sony for its flawed security? Let&#8217;s take another look at the problem.

### I want to pay&#8230;

I want to pay online. I want to buy one item once or pay regularly (like in a monthly payment to Sony). What option am I given? Giving my credit card number. And this is a terrible idea!

### &#8230;but not to give my credit card number!?

When I send my credit card number and any &#8220;secret&#8221; written on the card, I do not allow for a **one-time payment** (or regular) to **one company** for a **given amount of money I choose**. Rather, I give the authority to anyone reading my info to do a payment of **any amount** directed **to anyone**, **anytime**. And that&#8217;s a source of insecurity.

## Another way of thinking online payment

Here is how payment *could* happen: I go to my bank website, I have a form where I choose the amount I want to pay, who I want to pay to and to which frequency (one time, once a month, etc.). The two last fields are optional. In exchange, the bank gives me a secret (a URL for instance). I share this secret with who I want to pay. End of story.

Of course, this is just an example crafted in 2 minutes that could probably be improved.

### &#8220;Oh fuck! Sony is getting hacked again!&#8221;

So, In my imaginary world, Sony (or anyone, it&#8217;s not about Sony as you&#8217;ve understood) does not have access to my credit card number, but only to a secret allowing a payment only to it at a frequency that I chose and to an amount that I chose as well. Sony gets hacked? **WHATEVER!**

We could imagine extensions where I could tell my bank &#8220;such secret has been compromised. Please stop paying through it&#8221;, &#8220;regenerate a secret for the same parameters&#8221;, etc.

## Conclusion

As Ben Adida mentions in [his blog post][1], encryption is not the final answer to security. His analysis of how encryption may get in the way of social features is interesting.

I wrote this post to show that security without encryption can exist, even for payments. Object capabilities seems to have a huge misknown and underused potential to achieve this form of security.

In the particular case I described, it&#8217;s not here because it requires cooperation from banks. I&#8217;m looking forward to see banks implementing this!

 [1]: http://benlog.com/articles/2011/12/21/encryption-is-mostly-not-magic/
 [2]: https://mail.mozilla.org/pipermail/es-discuss/
 [3]: http://www.infoq.com/presentations/From-E-to-EcmaScript
 [4]: http://youtu.be/47Ceot8yqeI
 [5]: http://www.youtube.com/watch?v=eL5o4PFuxTY&feature=results_main&playnext=1&list=PL20A37C5081563951
 [6]: http://longtermlaziness.wordpress.com/2011/07/18/open-e-mail-to-my-lazy-friend-marc-stiegler/
 [7]: http://erights.org/talks/thesis/index.html
 [8]: http://video.google.com/videoplay?docid=-7179100659758053865
 [9]: http://video.google.com/videoplay?docid=-8527120258517176598
 [10]: http://video.google.com/videoplay?docid=8799856896828158583
 [11]: http://www.youtube.com/watch?v=vrbmMPlCp3U
 [12]: http://www.skyhunter.com/marcs/petnames/IntroPetNames.html
 [13]: http://www.hpl.hp.com/techreports/2009/HPL-2009-169.html
 [14]: http://www.hpl.hp.com/personal/Alan_Karp/site_password/
 [15]: http://web-send.org/introducer/
 [16]: http://www.combex.com/papers/darpa-report/html/index.html
 [17]: http://www.youtube.com/watch?v=oBqeDYETXME
 [18]: http://www.cis.upenn.edu/~KeyKOS/ConfusedDeputy.html
 [19]: http://www.infoq.com/presentations/Security-vs-Security-Architecture

 *[POLA]: Principle Of Least Authority