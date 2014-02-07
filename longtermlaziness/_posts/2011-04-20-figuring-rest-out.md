---
title: Figuring REST out
author: David Bruant
layout: post
permalink: /?p=136
categories:
  - Uncategorized
---
## Introduction

This article is the first of a series that will talk about web architecture. I&#8217;ll discuss REST, HTTP, software engineering in the context of applications in a network. As much as I can, I&#8217;ll try to relate what I have learned and understood to nowadays web.

## Background

My experience with the web (from the tech side) has started with manually editing automatically generated HTML pages. Then, I have copy-pasted a small JS snippet to automatically insert the &#8220;last modified&#8221; date.  
Afterward, I&#8217;ve has a class on &#8220;XML and web technologies&#8221;. Then, I&#8217;ve been involved with [professionals][1] and other students on a project with web technologies and especially client-side technologies. Throughout the project, we have taken right in the face a bunch of new words/expressions like &#8220;Ajax&#8221;, &#8220;Drag&#8217;n'Drop&#8221; (not obvious for non-English speakers), &#8220;REST&#8221;, &#8220;SOAP&#8221;, &#8220;Servlet&#8221;, &#8220;cloud&#8221; and so many others. All apply in very different areas of IT and it took some time for us to figure that out. The one &#8220;word&#8221; we&#8217;ve been most bullshitted on is probably &#8220;REST&#8221;.

I have recently had the occasion to study the excellent [Dissertation of Roy Fielding on REST][2]. Just to make sure I&#8217;m not misunderstood: he is not &#8220;discussing&#8221; REST; he invented it and is explaining the rationale and design decisions. Even if I highly encourage any web developer to take a couple of hours to read the entire thing, here are a couple of take-away points I find particularly noteworthy as they re-question what we now take for granted or take a different view in the 2011 web.

## Restarting Fresh

To understand how to think about &#8220;Architectural Styles and the Design of Network-based Software Architectures&#8221;, you have to forget all what you know about computers and the web. Forget about mobile or tablet web, forget Facebook or Twitter, forget Google Document or Etherpad, forget wikis, forget blogs, forget server-side generated content, forget web browsers, forget HTML documents, forget HTTP. Get to a point where you have computers, wires to connect them and a protocol so that one computer can send a message any other.  
What is a good network-based software architecture? &#8220;Good&#8221; referring to an attempt to maximize a couple of characteristics including performance, scalability and modifiability (see [2.3 Architectural Properties of Key Interest][3] for full list and detailed explanations). This is the question REST is addressing.

## What is REST?

**REST is an architectural style**. According to Roy Fielding, an architecture style is:

> An architectural style is a coordinated set of architectural constraints that restricts the roles/features of architectural elements and the allowed relationships among those elements within any architecture that conforms to that style.

Refer to [chapter one][4] if you don&#8217;t feel comfortable with any of the words in this definition.  
REST is not a file format. REST is not what you use when you&#8217;re not using a known file format. REST is not the HTTP protocol, it&#8217;s not even a network protocol. It&#8217;s an architectural style.

REST stands for &#8220;REpresentational State Transfer&#8221;:

> The name &#8220;Representational State Transfer&#8221; is intended to evoke an image of how a well-designed Web application behaves: a network of web pages (a virtual state-machine), where the user progresses through the application by selecting links (state transitions), resulting in the next page (representing the next state of the application) being transferred to the user and rendered for their use.

[(source)][5]  
The view was implemented by web browsers until the ability to dynamically retrieve content came into the game. This changed the game, by providing the ability to change the content of a web page without changing the URL (without taking a transition, changing state). While providing a new kind of user experience, this was annoying by its lack of interaction with the back/forward buttons in the web browser: the web application having itself an internal state, user may be tempted to click on the back/forward buttons to navigate through the web application state and not the &#8220;web browser state&#8221; sort of say. This issue has recently found a technical solution with the introduction of the [history API][6].

## Deriving REST

REST is made architectural constraints. In that section, I&#8217;ll discuss the one I find relevant. This maps the [corresponding section in Fielding&#8217;s Dissertation][7].

### [Client-Server][8]

This is the first constraint and the one I find the most controversial.  
The [quoted section][9] explores what &#8220;client-server&#8221; means in the literature. Client is considered as a &#8220;triggering process&#8221;, a component that &#8220;sends a request&#8221;, while the server is described as &#8220;receiving the request and either reject or respond to it&#8221;; a &#8220;reactive process&#8221;. This abstraction is interesting in the fact that clients and servers roles are bound to one interaction. What I mean is that the same computer could change role. This actually occurs in Comet-based applications, where what we usually call &#8220;client&#8221; (the web browser) is actually listening to messages coming from the &#8220;server&#8221;, becoming itself a server according to the previous definition.

However, in that section, &#8220;client&#8221; is associated with &#8220;user interface&#8221; and &#8220;server&#8221; to &#8220;storage&#8221; and this association is actually dangerous in a way, because for instance, crawlers are client in the previous sense (sending resquests) but do not have a user interface.

The ambiguity between the different views and definitions of what &#8220;client&#8221; and &#8220;server&#8221; means who need to be bug further.

### Stateless

Oftentimes, one can hear things like &#8220;my web application is RESTful so it&#8217;s stateless&#8221;. This is obviously ridiculous. A stateless application means&#8230; well&#8230; that the application doesn&#8217;t have a state which is pointless for non-trivial applications. In REST, **what is stateless is not the application** you build on top of the network (even reduced to one client and one server). What is stateless is **each interaction**. The point is that each request can be *understood* even considered outside of its applicative context. One direct application of that is the ability to create caches. If one cannot, only based on the requests, assume that the same request will result in the same response, then it is impossible to cache it. But if a request can be understood out of its context, then in some cases, you could cache it.

### Code on demand

The key take-away is:

> This simplifies clients by reducing the number of features required to be pre-implemented. Allowing features to be downloaded after deployment improves system extensibility.

I&#8217;ll write another article on how this related to actual web development and practical limitations of code on demand without stronger constraints.

## Experience and evaluation

The dissertation discusses the experience gathered through HTTP design and how different aspects of the web as it is conforms (or not) to the REST architectural style.

### HTTP

One interesting point I have read on HTTP is that there is no syntactic distinction between representation meta-data (Content-Type, Content-Length&#8230;) and message control information (Referer, Expire&#8230;) because they are both transmitted as HTTP headers.

### Cookies

Cookies aren&#8217;t part of HTTP1.1 but were later added by Netscape. About them Roy Fielding writes:

> Cookies also violate REST because they allow data to be passed without sufficiently identifying its semantics, thus becoming a concern for both security and privacy. The combination of cookies with the Referer [sic] header field makes it possible to track a user as they browse between sites.

I&#8217;ll admit that I don&#8217;t really understand the causal link between partial semantics and the security/privacy issue yet. Nevertheless, I fully understand the privacy issue.  
Another quote:

> The same functionality should have been accomplished via anonymous authentication and true client-side state. A state mechanism that involves preferences can be more efficiently implemented using judicious use of context-setting URI rather than cookies, where judicious means one URI per state rather than an unbounded number of URI due to the embedding of a user-id. Likewise, the use of cookies to identify a user-specific &#8220;shopping basket&#8221; within a server-side database could be more efficiently implemented by defining the semantics of shopping items within the hypermedia data formats, allowing the user agent to select and store those items within their own client-side shopping basket, complete with a URI to be used for check-out when the client is ready to purchase.

A lot of things are said here. I&#8217;ll study them in a later post.

## Conclusion

This article was intended to be an overview of REST. I hope usual ambiguity of misunderstandings are now clarify. Once again, I highly encourage you to read the [entire Dissertation][2]. I&#8217;ll expand on some subtopics in the next few days. Stay tuned!

 [1]: http://vocamus.net/dave/?p=1172
 [2]: http://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm
 [3]: http://www.ics.uci.edu/~fielding/pubs/dissertation/net_app_arch.htm#sec_2_3
 [4]: http://www.ics.uci.edu/~fielding/pubs/dissertation/software_arch.htm
 [5]: http://www.ics.uci.edu/~fielding/pubs/dissertation/evaluation.htm#sec_6_1
 [6]: http://diveintohtml5.org/history.html
 [7]: http://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm#sec_5_1
 [8]: http://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm#sec_5_1_2
 [9]: http://www.ics.uci.edu/~fielding/pubs/dissertation/net_arch_styles.htm#sec_3_4_1