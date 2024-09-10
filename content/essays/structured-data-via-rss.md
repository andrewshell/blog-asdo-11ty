---
title: Structured data via RSS
date: 2010-12-15T06:00:00.000Z
published: true
created: 2010-12-15T06:00:00.000Z

---

I've been rolling around in my head for a while now about the best way to publish structured data via RSS.  My primary use case is with syndicating data between websites, especially social networks like Brazen Careerist.  I like the idea of pulling in a feed that has more information in it then just the rendered HTML.

I started thinking about this again after reading Dave Winer's post [WinerLinks and outliners](http://scripting.com/stories/2010/11/30/winerlinksAndOutliners.html) because Dave provides structured OPML data for all of his blog posts.  Looking at his RSS feed I noticed that he references these OPML files in each item with a scripting2:source tag which is defined in the [Scripting2 namespace](https://web.archive.org/web/20120125093856/http://scripting2.com/namespace.html).

The only problem I see is he defines the tag as a link to the OPML source for the story behind the item.  This is accurate for his use case, but what if the source for the item isn't OPML?  In the [RSS 2.0 Specification](http://cyber.law.harvard.edu/rss/rss.html) they have an enclosure tag which is what's used for podcasting.  It would have been nice if the scripting2:source tag emulated the enclosure tag and required length and type in addition to the URL.  This way if the source of my item is a CSV file, and Excel Spreadsheet or any other type of structured data we could link to it and the feed readers could potentially do something interesting with it.

Obviously there is nothing keeping me from creating my own RSS extension or just using the scripting2:source tag to point at something that isn't an OPML file.  I'd just prefer to do things the "right" way and not create another tag that is so similar to this existing one.

