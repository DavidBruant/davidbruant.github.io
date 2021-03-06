---
title: The web performance story
author: David Bruant
layout: post
permalink: /?p=321
categories:
  - Uncategorized
---
This blogpost is mostly a reaction to [Daniel Clifford&#8217;s Google I/O 2012 talk: &#8220;Breaking the JavaScript Speed Limit with V8&#8243;][1]. I&#8217;m reacting only to this talk. I don&#8217;t know Daniel Clifford and I have nothing against him personally whatsoever. I think V8 is an excellent product, that&#8217;s not what I&#8217;m talking about. I would have things to say about the &#8220;optimize your code for engine X&#8221; trend, but I won&#8217;t even talk about that.

I&#8217;d like to take a step back to talk about performance in general and focus on as well as criticizing a bit how things are presented in the talk. Once again, although I&#8217;ll be mentioning Daniel Clifford in my post but I&#8217;m criticizing the talk and not the person.

## Why performance matters?

Daniel Clifford&#8217;s answer is that better performance allow to do things that weren&#8217;t possible, because bad performance was getting in the way of a good experience. I agree with this analysis.

One consequence is that you should care about performance only if either it currently degrades the experience of the product you&#8217;re doing or gets in the way of an improvement. If that&#8217;s not the case, move on. I&#8217;m serious on that point. Too often in technical arguments, people will talk about performance when it actually doesn&#8217;t matter since it wouldn&#8217;t noticeably improve the user experience.

## Performance in software

If we want to talk about web performance, let&#8217;s start from the beginning, because improving your JavaScript code isn&#8217;t the first thing to care about.

### Software architecture

In my opinion, major performance improvements are achieved with good software architecture (this is also true outside of the web context). This field is a very complicated art and very specific to your application, to your needs and your constraints. No one will ever tell you that in a talk, because it is too specific. An architecture consists of deciding which components compose your system, which role each is playing and how they are going to communicate. This is complicated.

### Algorithms

This one is also independent of the context of the web. Know your classic algorithms. Know when to use them. Also know when not to use them. For short lists, a bubble sort can be faster than a quick sort.

In &#8220;algorithms&#8221;, I also put knowing when to use parallelism, knowing the different sort of parallelisms. This isn&#8217;t easy, distributed algorithms are not the easiest thing even in a master/workers paradigm.

I&#8217;ll get back to this point about algorithms <img src="http://localhost/wp/wp-includes/images/smilies/icon_smile.gif" alt=":-)" class="wp-smiley" /> 

## Web performance

The web has some well-known constraints and it induces things to know to improve performance

### Network

As said [elsewere][2], no matter how much computers (CPUs) become faster, light speed won&#8217;t increase and the distance between Bordeaux and San Diego is going to stay the same (continental drift aside). This creates an unbreakable physical boundary to speed at which you can transmit a web page. We are not even close to reaching that limit since the transmitted information doesn&#8217;t take the shortest path and rarely reach light speed.

As a consequence, reduce the amount of communication and round trips to the minimum. This will be your first major win. Among the practical tips, use HTTP caching and reduce asset sizes.

### The DOM and graphics

Since JavaScript has gotten fast, the bottleneck of web scripting is the DOM. DOM objects are weird beast which access isn&#8217;t as efficiently optimized than ECMAScript objects. Also, manipulating DOM objects often performs some graphics operation. These are costly. Change things on the screen only when necessary.

Touch the DOM only when needed. Specifically, don&#8217;t use the DOM to store information (in data-urls). Use your own objects.

### Now, let&#8217;s talk about JavaScript

The first advice is knowing the language. It takes time, but it&#8217;s worth it to avoid reimplementing inefficiently what the language can do efficiently for you.

Then, write clean modular code (it&#8217;s a sort of follow-up of the above &#8220;good architecture&#8221; advice) and it will do most of the job to avoid useless computation.

If you have followed all the advice above in the provided order (and that&#8217;s a LOT of work!) and your application still have a performance issue, now you can start considering following Daniel Clifford&#8217;s advices.

### Partial conclusion

Above, I&#8217;ve tried to step back on performance to explain that engine-specific optimizations are the last thing to take care of (because they yield the smallest benefit by comparison to the other things) because the talk was a bit elusive on that point.

It doesn&#8217;t mean knowing JS engines and knowing how to write efficiently for them is a stupid idea. It just mean that&#8217;s not the first thing you should care about, and as I said above, in my opinion, it&#8217;s the last.

## Critique of the rest of the talk

### The performance problem to be solved

Compute the 25000th prime number. Quote from the talk (emphasis added):  
&#8220;I have put together a sample problem that I&#8217;d like to talk about throughout the course of this talk. It is a toy problem that I come up with but **I think it&#8217;s representative of some of the things of some of the performance problem that you might face in your own code**&#8221;

In a very American-bullshit-communication style, we here have a sentence that is purposefully vague and say exactly nothing but uses a lot of well-chosen and confusing words to do so (from what I know, it&#8217;s a very cultural thing). Remove the source of vagueness (&#8220;I think&#8221;, &#8220;some&#8221; and &#8220;might&#8221;) and you have a sentence that&#8217;s wrong. The very large majority of web developers do not have this problem or a problem related to this sort of heavy computation. For the large majority, the biggest client-side computation issue is probably sorting a bunch of table rows.

I have to admit that I&#8217;m annoyed by this attempt to justify something wrongly. Acknowledge that JavaScript performance isn&#8217;t an issue for a majority of webdevs and move on! Anyway&#8230;

### The benchmarked algorithm and the talk conclusion (WARNING: SPOILER!)

After the description of the problem is the description of an algorithm to solve this problem. The algorithm is naive, but this talk isn&#8217;t about algorithms, so it doesn&#8217;t matter at all.

The talk gives tips to improve JavaScript code for performance. Most of them are legitimate and fortunately concur with good practices. One which brings a major improvement is fixing a bug in the code. The code was reading out of array bounds. Hmm&#8230; The example is interesting, but that&#8217;s not a performance improvement. That&#8217;s just fixing a bug. V8 hasn&#8217;t made your code faster. You just made your code correct, it&#8217;s dishonest to compare things that do not work the same way.

And the conclusion. One of the biggest scams of all times in the history of tech talks. The algorithm is changed from a linear algorithm to a square-root complexity algorithm. Guess what! 350 times speedup! No kidding!

I guess that&#8217;s a Google IO talk, so you&#8217;ve got to do a show and show takeaway numbers so people at the end of the talk can say &#8220;with V8 you can achieve a 350 times speedup!&#8221;, but once again, that&#8217;s just dishonest. If your product is really good, why do you need to lie or confuse people? My question is genuine.

Since changing of algorithm is ok to solve the problem faster, I&#8217;d like to propose another algorithm which is simple, so I&#8217;m convinced will be even faster: `function answer(){return 287107;}`. But I feel too lazy to benchmark this one&#8230;

## Conclusion

The talk has valuable advices and I recommend it for this content. However, I&#8217;m really unsatisfied of how the talk is constructed and &#8220;packaged&#8221;. Explanation at the beginning of the web performance priorities would have been good. Also, the couple of scams the talk contains are sad, mostly because they are unnecessary.

 [1]: http://www.youtube.com/watch?v=UJPdhx5zTaw
 [2]: http://erights.org/talks/thesis/markm-thesis.pdf