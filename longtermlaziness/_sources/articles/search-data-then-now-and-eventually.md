# Search data, then, now and eventually

A [strangely written post](http://andreasgal.com/2015/03/30/data-is-at-the-heart-of-search-but-who-has-access-to-it/) by Andreas Gal, Mozilla CTO. In this post, there seems to be some disdain for privacy, which is surprising from someone that high-ranked at Mozilla.

In this post, I'll write a summary, formulate a response and try to move the debate forward.

Apologies in advance, there will be swearing in this post.


## Summary

In a [first post](http://andreasgal.com/2015/02/23/search-works-differently-than-you-may-think/), Andreas Gal explained that search engines aren't just crawling the web and use algorithms to rank them on sets of words. Search engines also observe which links users click on to figure out which of the proposed results is the most accurate. This data from users weighs a lot when providing answers for the same query to another user later. And it's only natural; at scale and on average, an answer which is good for someone is good for someone else. An answer which is rarely clicked on is rarely the answer people wanted, so no need to put it too high in search results.

The [post I'm responding to](http://andreasgal.com/2015/03/30/data-is-at-the-heart-of-search-but-who-has-access-to-it/) explains that this "crowdsourced" search data is crucial to building a search engine. It's also crucial to a search engine which would want to compete with Google. BUT! There is a virtuous circle for a search engine which is that if you start gathering this data, you provide better search results, so more users come, you have even better results, etc. And other search engines are somehow doomed to have worse results initially, attract less users, have less of this previous search data and is doomed to loose against Google (Andreas Gal says "vicious circle", but I'm a "glass half-full" type of person :-) ).

Then, the post goes on listing ways search engines could gather data. Most of which have disappeared [when Google encrypted searches by default](http://googleblog.blogspot.fr/2011/10/making-search-more-secure.html)
The author of the post seems to regret that time. I do not.


### Encrypted search

It goes without saying, but apparently, even the Mozilla CTO needs a reminder: encrypted search is good for the user.
From people searches, one can infer what they are going to buy, what worries or concerns them, who they like, who and what they want to know more about. From people searches, one can infer pretty much everything. That's how folks criminals get caught. Plaintext search was absurdly privacy intrusive for people.

Regarding Google decision about encrypting search, the **only** thing that is reasonable to regret is that it didn't happen sooner.

Let's discuss various points in the post:


#### Small search engines could partner with ISPs

> Search engines with small user bases can acquire search traffic by working with large Internet Service providers (also called ISPs, think Comcast, Verizon, etc.) to capture searches that go from users’ browsers to competing search engines. This is one option that was available in the past to Google’s competitors such as Yahoo and Bing as they attempted to become competitive with Google’s results.

I'm sorry, what? WTF!
One thing that outraged everyone in Edward Snowden revelation was the mass surveillance. And one of the things the NSA is doing is that: "capture searches that go from users’ browsers to () search engines.". This is literally tracking people.
In France right now everyone is on deck fighting against the government that is trying to impose "black boxes" (that's the term they use, literally) to ISPs so the government can spy on everyone and we're told by Mozilla that "hey, your ISP should leak your search data so competitors to Google can emerge!"

"This is one option that was available in the past"
Sure it was. It was also amazingly damaging for the users. This "option" was happening without any user consent. That was a terrible option and I am thankful to Google to have removed it.


#### Small search engines could partner with top content websites

> An alternative to working with ISPs is to work with popular content sites to track where visitors are coming from. In Web lingo this is called a “referer header.” When a user clicks on a link, the browser tells the target site where the user was before (what site “referred” the user). If the user was referred by a search result page, that address contains the query string, making it possible to associate the original search with the result link. Because the vast majority of Web traffic goes to a few thousand top sites, it is possible to reconstruct a pretty good model of what people frequently search for and what results they follow.

"track"; at least we're being honest here.

The referer header is terrible for privacy. You can go [as far back as Roy Fielding's thesis](https://www.ics.uci.edu/~fielding/pubs/dissertation/evaluation.htm#sec_6_3_4_2) (presented in 2000) to be warned about its dangers for privacy.
It is terrible enough [Brian Smith](https://mozillians.org/en-US/u/briansmith/) (who works on Firefox) is working on [a plan to ruin it](https://briansmith.org/referrer-01.html) as much as possible **at the browser level**. Yes, in Firefox!

If I want to see some content website, I don't necessarily want them to know how I came to them. Very much like if I go to a grossery store, maybe I don't want to tell them where I live and the route I took to get there. This information has no reason to be granted without my opt-in. The fact that it's been so is a mistake that is being slowly repaired.

Note that apparently, this information is still available to websites, but **in aggregates** assuming [they accept Google trackers on their site](https://support.google.com/webmasters/answer/35252?hl=en). But in a way, it's only fair. Google has a privileged relationship to the user, why should all websites have access to this relationship? Did the user opt-in to give that information to all websites?


#### Conclusion on encrypted search

It's good for the user. Search engine competitors cannot see my searches data? Good! I do not want them to! I do not want anyone to see my searches beyond the search engine I choose! Wannabe search engines included!

They want my search data? They should have to ask people and not try to track them, spy on them via partnership with ISPs or top web sites!

For fuck sake, why do I even have to write this? Let's quote the Mozilla Manifesto:

> Individuals’ security and privacy on the Internet are fundamental and must not be treated as optional.

...not even for competitors to Google to emerge.

**Privacy is not optional.**


### The last source of large volume of queries

> These days, the search box in the browser is essentially the last remaining place where Google’s competitors can access a large volume of search queries. In 2011, Google famously accused Microsoft’s Bing search engine of doing exactly that: logging Google search traffic in Microsoft’s own Internet Explorer browser in order to improve the quality of Bing results. Having almost tripled the market share of Chrome since then, this is something Google has to worry much less about in the future. Its competitors will not be able to use Chrome’s search box to obtain data the way Microsoft did with Internet Explorer in the past.

Google enforces their monopoly on search via their browser which is increasing market share. So sad... Mozilla should really work on a web browser competing with Chrome! ... oh wait! 

I really hate myself for being that sarcastic, but I don't get the point of bitching about Google monopoly and the various way they enforce it. Observing and lamenting won't be enough.

It's also largely late and inappropriate to complain about Google monopoly on search thanks to search data given Mozilla has been massively sending such data by contract for at least 6 years and still is in most countries.


## Moving the ball forward: how to get search data

Search data is privileged data between the search engine and the user searching. Any way to acquire such data that would be privacy intrusive should be out of question (if nothing else per the Mozilla Manifesto if anyone cares at all about what it means).


### Web browser search box?

I guess that could be an option. Obviously, it takes a browser with sufficient market share to have enough search box data. For obvious reasons, it's highly unlikely Microsoft, Google or [Yandex](https://browser.yandex.com/) will play at this game. We're left with Firefox, Apple and Opera. On mobile, people search too. The mobile search data is controlled by the OS itself as well as the browser. Apple has a major role there too. Let's hope FirefoxOS will get there soon enough. But Apple has made super clear they [don't want their business to be about sharing/selling data](http://www.apple.com/privacy/), so it'd be hard to get them on board.

Assuming user opt-in, Firefox could gather search data and then share this data with search engines. The data could be shared in a privacy preserving manner via [differencial privacy](http://en.wikipedia.org/wiki/Differential_privacy). As it turns out, the evil monopolistic Google [open sourced software to do exactly this](http://googleonlinesecurity.blogspot.fr/2014/10/learning-statistics-with-privacy-aided.html).


## Beyond search as we know it

The problem of search data isn't so much that Google owns it all and other search engines don't, it's that users have so little awareness of their existence and even less control over them (cannot choose to share them even within your community, etc.)


### Distributed search engines

That's [a thing](http://en.wikipedia.org/wiki/Distributed_search_engine). I've never seen under my radar a solution that looked attractive enough (and even less used "crowdsourced" search data?), but am looking forward to being convinced.

In a distributed search engine, each person has an index and search is performed on other people computers. So the "no monopoly" part is clear. The accuracy and performance story remains to be proven.


### Combining the browser search box and distributed search engine

Beyond just sharing the raw data, a web browser could "network" its users. "Unionize" them, maybe, to take a word I [read somewhere else](https://brendaneich.com/2014/04/the-next-mission/) about a year ago. The idea of "unionizing" would take the web browser (or OS) to a different level. It wouldn't just be a *user* agent, but more a *community* agent.

Today, a web browser is a fairly individualistic software. Your browser history, bookmarks, searches are your own and that's it. These elements are hard if not impossible to share given how browsers are architected. These items are saved for the purpose of syncing across device, but with the assumption the devices all belong to the same individual.

One interesting experiment would be for a browser to add a layer on top of search engines. Don't just drive searches to one (or several?) search engine, but ask a database of knowledge shared within a community. Contribute back the search data to the community database.

Unfortunately, given Mozilla's current business model regarding Firefox, it's unlikely this is going to be tried by them.
Sounds doable via an addon, though.


## Conclusion

Bitching about Google monopoly thanks to search data is worthless and a bit ironic given Mozilla has lived on money gathered via forwarding such data to Google.

Privacy is more important than the emergence of competing search engines.

If one cares to think beyond the current search engine paradigm, there might be solutions. But given how Mozilla survives today, it's unlikely they'll shoot themselves in the foot. Addon, though?






















