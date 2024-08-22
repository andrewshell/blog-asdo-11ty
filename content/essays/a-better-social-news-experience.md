---
title: A better social news experience?
date: 2012-12-31T06:00:00.000Z
updated: 2012-12-31T06:00:00.000Z
published: true
---

A number of years ago when I worked for [Brazen Careerist](https://techcrunch.com/2009/08/24/brazen-careerist-a-professional-network-that-realizes-youre-more-than-just-a-resume/) I had an idea for the company. We could create a white label social news site that was a window into a larger network of social news sites. Management didn't see this as a useful direction for the company so it didn't happen.

Lately, I've been thinking of the concept again. I've been seeing some people working on [decentralized social networks](https://web.archive.org/web/20190405122017/https://tent.io/), but to be honest I'm less interested in a decentralized Twitter and more of a decentralized [Hacker News](http://news.ycombinator.com/). I'm also fond of the Unix philosophy of small parts loosely coupled.

This is how I see this working on a high level. Individual people would have sites set up that is their profile. I could self-host this or host it on another service. On this site I would post content like links to articles I like, original posts of my own, pictures uploaded from my phone, it doesn't really matter. If I was posting content hosted on my site, it would implement the protocols I will be explaining in a moment. If it was a link to another site, there could be a fallback default behavior, but ideally, that site would also be implementing these protocols. That could be done by either the site being one of these social news profiles or possibly a plugin for WordPress or something like that.

If the other site implemented the correct protocols what would happen when I posted their link to my site is as follows. My site would pull from them the full content or a snippet (whichever is served) and it would be published on my site along with their title and a link to the original post. There would also be a shared comment thread. If someone commented on either site or a third party site that had also linked to the post, that comment would show up on all the sites. This is the crux of the system.

Then there could also be sites like Hacker News that support these protocols so folks could submit links like they do now and have that content pulled into the site and have shared comments. There would also be a way for users to log into the social news site with their profile URL. They could choose if they like to have their profile posts pulled in automatically. Then if people followed this user on the social site, they would get their posts in their feed. The items could be up/downvoted and that rank would be unique to the social news site. It could be used to decide which posts to show on the homepage.

So what would these protocols be? Obviously, I'd like to reuse stuff that currently exists. For posting content and having it stay updated, we could use something like rssCloud. I'm not sure what we would use for keeping comments in sync. It would be nice if this functionality was built into Disqus or something. For pulling posts into the social news site we would obviously use RSS.

I'm not in a position to start building this, but I'd be interested to know what other people think of this idea. Am I way off base?

I know some people would prefer to not have the posts cross-posted on different sites, but I feel that people are more likely to comment, and there would be a better integration into the different social news sites if users were interacting with the content on the original site.

