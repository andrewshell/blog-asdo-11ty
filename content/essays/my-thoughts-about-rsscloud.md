---
title: My thoughts about rssCloud
date: 2020-10-22T19:54:12.000Z
updated: 2020-10-22T19:54:12.000Z
published: true
---

One of the reasons I continue to work on the rssCloud server is that I see it has untapped potential.

One thing that is frequently used to "Sell" the rssCloud competitor PubSubHubbub (or PuSH or WebSub) is that it provides "Fat Pings". The content in the feed that has changed actually gets sent to the subscribers. With rssCloud, we provide "Thin Pings" aka just the URL of the feed that changed. The argument is that when the feed gets updated and the ping goes out, why have everyone come to fetch the entire feed again? Couldn't we save bandwidth and server load by not re-fetching the feed?

This is exactly the reason why I think rssCloud is better. PuSH only works with feeds, rssCloud works with any URL. You could in theory subscribe to anything of any format changing.
