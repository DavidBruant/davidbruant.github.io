
This blog post is not about the web or any technology in particular, but what i'd call "software hygiene". It is here discussed a proposed standard of how software should mediate data creation and edition in the world we live in (with network connectivity and changing devices).


## Data ownership

It can be a [blog post](https://github.com/DavidBruant/writings/blob/gh-pages/_posts/2016-12-18-building-software-for-data-ownership.md), a poem, conversations with loved ones, your favorite places to get [tea](http://verdenero.fr/) (they have wonderful coffee i understand, but I don't drink coffee), drafts of a song, [a funny video](https://www.youtube.com/watch?v=vIV6MU4Yqek), filling some spreadsheets for the viability of a project, or just regular accounting; heck! the latest code you've written or maybe data about your tastes or professional connections.
When entering data into a computer, everyone has an expectation that the computer will remember it. Either enough to transmit it to whoever we want to communicate it to or for personal archiving purposes. (let's ignore the [few cases](https://whispersystems.org/blog/disappearing-messages/) where one expects for the computer to forget the data purposefully).

For all practical purposes, creation of data is necessarily mediated through software. This article lays out some principle about how i believe software should behave with regards to the data i've created.

It can be sumarized as follows:
* My data is mine
* Do not lose my data
* Let me share it and enable edition to others with fine granularity (both on the content and people levels)
* Let me create/edit anytime, whether I'm online or not


### My data is mine

I used your software to create data. It does not mean my data is yours. It doesn't mean I want you to even read my data. Thank you for the tool, I'll keep the rest.

Until i've given you explicit consent, you don't copy my data to your servers, you don't analyze it, you don't target ads at my face. Or whatever fits your business plan that i haven't agreed to.

Terms of Services are good when you're trying to protect yourself from legal consequences, but [they're a lie](https://tosdr.org/). You know it, i know it, everyone does. They're nowhere near being enough from a moral standpoint to be understood as consent. More is expected.

For the purpose of finding my data on different devices, it's fine to use a server, but it should be some data storage location that i own. Some people already have an online space to save data outside their own device like Google Drive or Dropbox.


### Do not lose my data

YOLO. I mean... seriously. Time is precious!

To the computer, data is data. To a human being, it took time before hitting the keyboard, clicking a mouse, voice inputing; before getting to a point where the data to be ready. Human beings, a single life, no time to waste; not on computer issues anyway.

Any software where data is entered in any way should save the data, so it's not lost. This should happen automatically, in the background. What is the deal with "save" buttons? And "restore" features? Just save the data and give it back to me when I'm back by default, without having me to do anything! Storage is cheap, the code is trivial to write, no excuse.

On my computer, use the file system. On the web use localStorage first, then send to a user-controlled data backup service or the server.

**Nobody should ever have to lose more than one minute of computer work.** 


### Rich sharing

This section is applicable mostly if data is not stored in user-controlled storage. In the case of user-controlled storage, the storage provider is likely to be the one enabling fine-grained sharing.

It's rare that I create data in a computer with the sole intent of keeping it for myself. Any software should offer the possibility to share what's been created via URL. A [capability URL](https://w3ctag.github.io/capability-urls/) preferably.

The goal would be to get to the [six features of rich sharing](http://www.hpl.hp.com/techreports/2009/HPL-2009-169.pdf). Read this paper, work towards it. I know it's hard, but it's a good goal to aim at.


### Online or offline

Whether it's on desktop or mobile, an Internet connection should not be taken for granted. The software should be written defensively against network unavailability or even [lie-fi](https://www.urbandictionary.com/define.php?term=lie-fi). Let me create data or edit it even when i'm offline!

It's sort of obvious for desktop software, but it's not enough understood in mobile apps or on the web. The web has [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorker) now. Already available for [~62% of page views](http://caniuse.com/#search=service) at the time of writing. Use it. No excuse.


## 

* Data is saved in the background regularly without the user having to intervene
* Data is first stored on the device it's created
* Data can be accessed online of offline
* Data is saved/synced/backuped in a server of the user's choosing
* (if applicable) data can be stored in the software distributor server after the user has been properly informed of what this means
* Read, create and edit capabilities can easily be rich-shared 
* data portability. Export in open format



## Review of a few softwares

* Email
	* gmail & emails clients
* prose.io
* web browser
* old school 
* Google docs
* Social networks



My data should be saved first and foremost on the device I created the data on.
* File system for desktop (database if useful)
* whatever file/storage API is available on mobile
* localStorage/IndexedDB in a browser

Then the data should be saved in a computer that is less likely to be lost/stolen/destroyed-by-mistake. Some people already have an online space to save data outside their own device:
* [Framadrop](https://framadrop.org/) (based on [lufi](https://framagit.org/luc/lufi) )
* Some [Remote Storage](https://remotestorage.io/)-compatible service
* Maybe something based on [Tahoe fs](https://tahoe-lafs.org/trac/tahoe-lafs)
* Cozy?
* Dropbox
* Google Drive
* box.com

Allow the users to save their data in their places. Then and only then should you consider storing the data in your own servers 






Note to pierre Ozoux: what about a remoteStorage/Google Drive proxy?
User logs in to a remoteStorage Google app, user gets a remoteStorage URL. Data is effectively stored in Google Drive
