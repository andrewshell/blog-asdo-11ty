---
title: Following Outside of Twitter
date: 2011-05-01T06:00:00.000Z
published: true
itemtype: https://schema.org/TechArticle
created: 2011-05-01T06:00:00.000Z

---

I've been working as part of the [blork](http://scripting.com/stories/2011/04/05/gettingStartedWithBlork.html) [community](https://groups.google.com/group/ec2-for-poets) lately.  What is a blork?  It's basically a decentralized Twitter like app that runs on [RSS](http://cyber.law.harvard.edu/rss/rss.html#whatIsRss).  You post status updates that get posted to your RSS Feed, then you follow other RSS feeds.  The problem? RSS is not particularly [user friendly](http://techcrunch.com/2010/09/13/rss-is-not-not-not-not-not-dead/).  You have to find the RSS feed, copy the URL and paste it into your RSS aggregator. Some sites make it easier, like with Dave's blork software you just copy a little bookmarklet into your toolbar and when you find a site you want to follow you just click the bookmarklet and it takes you to your blork with the url filled in.

One reason Twitter and Facebook have become so popular is that it's so easy to follow people.  You just click the follow button and you're done.  How could we make it that easy for blorks while still keeping it decentralized?  This is where [OPML](https://opml.org/spec2.opml#1629042482000) comes in.

OPML is in it's generic sense a format for outlines, however it's also used for RSS subscription lists.  Unfortunately there aren't too many RSS aggrigators that let you subscribe to a live OPML list.  Instead you typically import a list which defeats much of the power of this technology.  Fortunately Dave's blork software supports subscribing to a live OPML list.

What if we had a service that worked like this:

1. You sign up and get an OPML subscription list and instructions on how to put this URL into your blork.
2. Websites could put a "follow" button on their site that works as easily as a Like or Tweet This button.
3. When you click that button you're communicating with the site you signed up with and it adds the feed to your OPML subscription list.
4. Since  your blork is subscribed to your OPML list, you're not automatically subscribed to the site you're following.

There is no reason why we couldn't have more then one of these services.  Maybe there could even be a way they could play nice with each other.  They would also have to have a bookmarklet like on Dave's blork so you could somewhat easily follow blogs that don't have the follow button.  There could also be browser plugins that make this even easier for people.

I still think this process will be too complicated for the average user but this is an interesting place to start thinking of a solution.

