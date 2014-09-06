---
title: A post you wish to read before considering using MongoDB for your next app
author: David Bruant
layout: post
permalink: /?p=324
geo_public:
  - 0
categories:
  - Uncategorized
---
This post details lessons learned from a 8 months experience with MongoDB. Although I&#8217;m writing this article alone, my experience of MongoDB was in the context of teamwork, so I&#8217;ll be using &#8220;us&#8221; often in this article.

In this blog post, I&#8217;ll be sharing experience with MongoDB that you can only get when working with it for quite some time. It will also contains elements of understanding of upcoming MongoDB improvements as well as general thoughts on data modeling.

I&#8217;ll be mostly focusing on downsides, but keep in mind that I&#8217;m only sharing my own experience which may not apply to your case. Also, I haven&#8217;t been in the situation of working with all the features of MongoDB. Especially, I have never used sharding and all other scalability-related features, so I have no opinion whatsoever on these.

## Quick intro to MongoDB

### Core concepts

In MongoDB, a **database** is composed of **collections** (somehow the equivalent of tables of those who are used to SQL). A collection contains **documents** which are JSON objects (with some additions), this means that a document can represent objects in the naive JavaScript sense (mapping between string and values) and even arrays, but also nested objects (when values are themselves objects or arrays).

Among the document values, you have the classic strings, numbers, booleans, but also ObjectIDs. Each document in a collection is uniquely identified by an ObjectID and you can store a reference to the document as a value using this ObjectID which is nothing more than an object wrapper around a unique string.

That&#8217;s about it for the core concepts. In a nutshell, it means that when you model your data, you have to think in terms of tree-shapes entities that you&#8217;ll put in collections. Cross-collection references are possible using ObjectIDs (there is a DBRef thing which isn&#8217;t strictly necessary and is just a built-in structure bundling an ObjectID and a collection name).

### Queries

[MongoDB has its][1] [own query system][2]. It does the job for the most part with a couple of limitations. One good point is that you can query over data nested deep and get deep data if you need without the need to pull the entire document.

One minor limitation is very specific (occurs when you have nested arrays) and is [planned to be fixed][3]. Another minor limitation is that since the query language relies on dots, dots can&#8217;t be used in object keys. This is usually not a problem except when you want to use urls as keys as it has been my case. It has to be noted that apparently, when using the [update primitives (like $push)][4], dot-key&#8217;d objects can be inserted anyway, putting your database in a quite inconsistent state (and that&#8217;s how I discovered the dot restriction :-s Needless to say the error message was rather cryptic).

The second limitation is more fundamental: any query you do is performed on a single collection. In a nutshell, there is no equivalent to the SQL JOIN. This has a very important consequence for any application written on top which is that whenever you need data from different collections using the ID values in one to reach some objects in another, you need to do several round trips between your application and your database. That&#8217;s fine-ish if they&#8217;re on the same server; that&#8217;s an outrageous constraint when they are on different servers, because it means network latency is imposed by a database design choice.

[MongoDB justifies][5] that there is no need for joins because data are denormalized in MongoDB. I have to disagree with that. First off, data modeling is hard and people make mistake. Sometimes, what should have been one collection is two. Changing a data model is a perious task and having to pay a systematic performance cost for that is unacceptable. Then, from experience, it seems that all applications data model cannot be represented as trees. Some are graphs, true graphs. And when it&#8217;s the case, I don&#8217;t see why Mongo would impose a performance cost (either in round-trip or data duplication), that&#8217;s just ridiculous.

**That reason alone makes that I don&#8217;t recommend Mongo**. Although sold for being flexible, the inability to make multi-collection queries makes Mongo quite inflexible. This got me thinking that **from now on, I will be looking at databases that enable to do any query in one round-trip**.

## The no-schema fantasy and reality

### Data in the database

MongoDB as one champion of the NoSQL movement claims that you don&#8217;t need a schema for your data. It is true from a technical standpoint that MongoDB doesn&#8217;t enforce a model. Reality of use and maintainability make that within the same collection, you tend to structure objects roughly the same way. Mongo allows optional fields where SQL doesn&#8217;t, but that&#8217;s pretty much where the difference stops in practice.

I have to share that in one case, there was one field for which we had decided to do no validation over, because we knew that the data supposed to be stored there would change over time. It did happen and having the freedom to store whatever we needed in this field at &#8220;no cost&#8221; really was a life-saving feature in our context.

Experience in storing objects from code without model quickly leads to a maintenance issue, because since you don&#8217;t have a model, you start wondering &#8220;do we already have a field X in the collection Y?&#8221;, or &#8220;how is structured field Z, b.t.dubs?&#8221; which inevitably forces you to write a schema documentation to compensate the lack of enforced schema.

Once you have acknowledged that you do need a form of schema anyhow, an interesting question is where to set the bar of strictness. Imposing a schema at the database level is a development burden that devs using SQL experience the hard way. Reality is that the data model of an application changes. Maybe because the need changes, maybe because the current design is imperfect. The data model does change and the cost of this reality is too high in SQL. No schema or documentation schema induce too high of a cognitive burden on the developer though.

A middleground we have found was to use [Mongoose][6] which enables to programmatically define a model in a fairly readable and somewhat declarative way. Documentation can easily be added as comments to the schema declaration and checks on data integrity can be performed at runtime. I have a good share of rants against Mongoose specifically, but for the most part, it does the 80% part of the job that you need to move on safely and conveniently with your communication with the database.

### When the world around the database changes

So you have an application and a database. Your application necessarily relies on assertion regarding your database; names of collections, field names, value types, value ranges, nesting structure shape, etc. At some point, the application you write on top of the database will need to see the database model change. in SQL, it systematically means to do an &#8220;ALTER table&#8221; or equivalent operation. Interestingly, in Mongo, some classes of assertion changes will require no change to the database whatsoever. For example, if you add a field to new documents in a collection, you don&#8217;t need to add it to all existing documents. Depending on the case, you can ignore the missing field or deal with it at the application level.

But of course, for other classes of changes, you&#8217;ll need to write a script to reorganise it. To the best of my knowledge, there is no way to send a script to the database so that it reorganises itself in situ. You need to pull the data, remodel it and re-push it. Needless to say that it feels really dirty. I hope I have missed something.

Regardless, it seems that the problem is somewhat equivalent in SQL. Data model change is part of the development flow and I wish it was treated as a first-class use case in database designs. I&#8217;m not an expert in that field. If I&#8217;m plain wrong, feel free to share your knowledge in the comments.

## The Map-Reduce Eldorado

Map reduce promises huge performance gains under the condition of writing code in a certain way (I&#8217;m giving a practical definition, not a formal one here). Be aware it&#8217;s not a silver bullet applicable to any problem.

I have found the API more complicated than necessary, but once you understand it, you&#8217;re good to go; [I let you judge by yourself][7], but at least, the map, reduce and finalize functions can be written in JS&#8230; I mean&#8230; sort of&#8230; which brings me to:

### Third-world JavaScript

The JS engine is SpiderMonkey 1.7 (the one shipped along with Firefox 2 for the curious). It means you have no Object.keys, only Array#forEach as array extra, etc. It fills like writing grandma&#8217;s JS when you actually know the language and the goodness added in ES5.

In theory, all map and reduce calls could be done in parallel independently; that&#8217;s the reason you need to write your code with some discipline. In practice, on one MongoDB install, all operations occur in sequence because of SpiderMonkey I have read somewhere. That and SpiderMonkey 1.7 pure performance, of course&#8230;

Good news, there is a plan to [switch to V8][8] and that should solve all JS-related problems. Bad news, it&#8217;s unclear when the switch will be effective.

### Debugging

The debugging experience is very painful. There is no proper debugger, no console.log. The best tool you have is conditionally throwing, because the only thing you can get back from a MapReduce operation is the final data or the first uncaught error (which stops the operation). That&#8217;s annoying when your map or reduce or finalize function gets above 30 lines. I came to a point where I wrote a small browser-based emulator and pulled data out of the database to test my MapReduce code in an environment where I could debug it (I probably should open source that actually&#8230;).

## &#8230; and a couple of noobish design mistakes

Points here are not major drawbacks. They are just some WTF I came across

### Can&#8217;t rename a database

Self-explanatory title. No need to explain why it feels such a stupid feature that should have been implemented as part of Mongo 0.0.1. Are we really at Mongo 2.2 and still can&#8217;t rename a database? [To track the bug][9].

### Global lock

[Until Mongo 2.0 included, there is a global MongoDB lock][10]. It means that write (or write+read) operations on completely unrelated database on the same install can&#8217;t be performed concurrently. I&#8217;m sorry, but this is plain stupid.

As per Mongo 2.2, there is a per-database lock, which means that operations on independent collections within the same collection can&#8217;t be done concurrently. Same issue than before at a different level (the one that matter when you have only one database). [They are working on that issue][11] to have locks at finer-grained entities. I have no info as to when this will happen, but they seem committed to fix the problem.

### Safe off by default

I have read in some blog posts that safe mode is off by default. I haven&#8217;t experienced data loss, so I have no clue of what is the danger in being in &#8220;unsafe mode&#8221;. It can be changed anyway, but it really is not a good default value it seems.

## Additional readings

Some insightful readings. Informations in these posts partially overlap with one another and with what I have said already.

*   <http://www.quora.com/MongoDB/How-much-credibility-does-the-post-Dont-use-MongoDB-have> 
    *   <http://architects.dzone.com/articles/why-i-said-goodbye-mongodb> 
        *   <http://blog.engineering.kiip.me/post/20988881092/a-year-with-mongodb> 
            *   <http://www.zopyx.de/blog/goodbye-mongodb> </ul> 
                ## Conclusion
                
                MongoDB has some major design mistakes in it. Its developer experience is overall much better than the SQL one, but I still feel dissatisfied by both and wouldn&#8217;t recommend any for now. Sadly, I don&#8217;t know any database software I would recommend. Likely, I&#8217;ll be interested in exploring Neo4j for a next experience. I&#8217;m open to suggestions, of course.

 [1]: http://www.mongodb.org/display/DOCS/Querying
 [2]: http://www.mongodb.org/display/DOCS/Advanced+Queries
 [3]: https://jira.mongodb.org/browse/SERVER-831
 [4]: http://www.mongodb.org/display/DOCS/Updating
 [5]: http://docs.mongodb.org/manual/applications/database-references/
 [6]: http://mongoosejs.com/
 [7]: http://www.mongodb.org/display/DOCS/MapReduce#MapReduce-MapFunction
 [8]: https://jira.mongodb.org/browse/SERVER-2407
 [9]: https://jira.mongodb.org/browse/SERVER-701
 [10]: https://blog.serverdensity.com/goodbye-global-lock-mongodb-2-0-vs-2-2/
 [11]: https://jira.mongodb.org/browse/SERVER-1240