---
title: What is rssCloud?
date: 2015-06-03T06:00:00.000Z
published: true
created: 2015-06-03T06:00:00.000Z

---

[Jeffrey Kishner](http://jeffreykishner.com/) asks:

I don't understand what rssCloud does. Is it related to River?

Back in the RSS 2.0 spec, [Dave Winer](http://scripting.com/) documented a [cloud element](http://cyber.law.harvard.edu/rss/rss.html#ltcloudgtSubelementOfLtchannelgt) which is used to point to an rssCloud server for real time updates about a feed changing.

Typically feed readers poll a feed periodically to see if it's changed. That means a lot of checking for feeds that might not change a lot. It also means that if you have a feed that changes frequently (like the [hacker news firehose](http://hn.geekity.com/newstories.xml)) you would have to check it every minute or 30 seconds to keep up with all the changes if you wanted something close to real time.

RssCloud is a notification server. An RSS feed specifies via the cloud element what rssCloud server it's notifying of changes. Then the aggregator sends a request to the rssCloud server and says "hey, let me know when this river changes" and then doesn't need to poll anymore (or at least not as frequently). When the website pings the rssCloud server telling it that the feed has changed, the rssCloud server in turn pings everybody that asked for updates. Then they know to go check the feed again.

A similar technology that you may have heard of is [PubSubHubbub or PuSH](http://en.wikipedia.org/wiki/PubSubHubbub). The big difference is that a PuSH server actually parses the feed and grabs the new items. Then when it notifies the subscribers it sends a "fat ping" or a notification that includes the updated items. Many people prefer this, because then you don't have a ton of aggregators all grabbing your feed at the same time.

An rssCloud server is far easier to implement because all it does is pass around URLs. It doesn't care what the content is. I actually think this is a strength that hasn't been explored very much. We could use rssCloud to notify subscribers of changes to any URL, not just of an RSS/Atom feed.

[River4](https://github.com/scripting/river4) is a river of news aggregator. Older versions of River did support rssCloud and Dave seems interested in adding support to River4 now that there is a new [rssCloud server](https://github.com/andrewshell/rsscloud-server) available.

For more information about rssCloud take a look at Dave's republished documentation at [rsscloud.co](http://rsscloud.co/).

