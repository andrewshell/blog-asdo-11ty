---
title: Rebooting rssCloud
date: 2015-06-02T06:00:00.000Z
updated: 2015-06-02T06:00:00.000Z
published: true
---

I recently built an rssCloud Server implementation in node.js

It's open source, MIT licensed and available on [GitHub](https://github.com/rsscloud/rsscloud-server). I have a copy of it running live at [rpc.rsscloud.io](https://rpc.rsscloud.io/). I'm hoping to get folks to poke it and help me make it more stable.

Since it's hard to test an rssCloud server without data flowing through it I also built a [Hacker News Firehose Feed](http://hn.geekity.com/newstories.xml) which is populated live using the [Hacker News API](https://github.com/HackerNews/API). It's also open source, MIT licensed and available on [GitHub](https://github.com/andrewshell/hacker-news-rss).

Please submit issues on GitHub and I'm open to pull requests.

