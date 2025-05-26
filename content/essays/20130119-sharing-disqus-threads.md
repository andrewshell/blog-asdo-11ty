---
title: Sharing Disqus Threads
date: 2013-01-19T06:00:00.000Z
published: false
pagetype: https://schema.org/WebPage
itemtype: https://schema.org/BlogPosting
created: 2013-01-19T06:00:00.000Z

---

Today I met up with my friend [Joe Nelson](http://begriffs.com/), the goal was to discuss my prior blog post about [a better social news experience](/a-better-social-news-experience/). We wanted to look at the larger idea and see what baby steps could we accomplish to start moving toward that ideal.

I'm of the mindset that I don't want to reinvent the wheel, so if there is a way to achieve our goals with existing technology, that would be better then building something new. The crux of my vision is shared comment threads. In my post I mention that it would be nice if this functionality was built into [Disqus](http://disqus.com/). It turns out it actually is.

I'm not sure if this is a documented feature, or just a nice accident but here is a proof of concept that I put together today to illustrate the idea.

Here are two separate websites, [test1](http://test1.geekity.com/) and [test2](http://test2.geekity.com/). I am not doing anything special behind the scenes and in fact I've been able to test this with websites that I do not control. The idea is that there would be a post on one site (test1) and a second site (like Hacker News) would link to it (test2). It could use something like [oEmbed](http://oembed.com/) to pull in the content to show on the site, and if the other site was using Disqus they could also pull in the disqus_shortname and disqus_identifier from the page and embed that sites Disqus comments on the second site. Now these two sites are sharing the same Disqus thread. If you comment on one site it shows up on the other.

This could be a cool way to share the conversation about a piece of content without splitting it across multiple sites the way it is now. For example here is Dave's post [The Flickr API is a national treasure](http://threads2.scripting.com/2012/december/aNationalTreasure) and here it is [on Hacker News](http://news.ycombinator.com/item?id=4926843). Two threads, two conversations. It would have been nice if the comments had been combined.

What do you think?  Do you see this as a security flaw or as an opportunity for doing something innovative?

