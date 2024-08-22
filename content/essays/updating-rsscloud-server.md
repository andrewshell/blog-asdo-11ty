---
title: Updating rssCloud Server
date: 2020-02-18T03:29:18.000Z
updated: 2020-02-18T03:29:18.000Z
published: true
---

I've been slowly but surely working on version 2.0 of the [rssCloud server](/essays/rebooting-rsscloud/) I built back in 2015.

When I originally built it, it was my first real node app, and the node landscape was very different from what it is today.  Now that my full-time job is building node based APIs at Johnson Health Tech, I figured it was time to  bring the project up to my current standards.

This post is very [inside baseball](https://en.wikipedia.org/wiki/Inside_baseball_(metaphor)), so if your eyes are glazing over, feel free to ignore it. :-)

The first task was to rewrite the existing app to use async/await instead of callbacks. I find that this supports code that is much easier to read.

The other thing that always bugged me was that even though my server was a replacement for [Dave's server](http://tool.rsscloud.co/), I never fully supported everything that his server supported, namely [XML-RPC](http://xmlrpc.com/). At the time, Dave said it wasn't important to support, and frankly, nobody has ever complained about it. However, Dave is now rebooting the XML-RPC website, and he created a new node library to work with it. It seemed like time to add support.

I've replaced the backend data store with [MongoDB](https://www.mongodb.com/). Before, data was stored in a static JSON file with logs in an SQLite database that never really scaled the way I wanted it to. The idea was to create a better log viewer with searching and filtering, but I never got around to that.

Another thing I'm doing, which hopefully Dave won't be upset by, is adding the https-post protocol. It is identical to http-post only instead of using the http scheme, it's https.  Not a big change, but especially with pressure from [Google](https://developers.google.com/web/fundamentals/security/encrypt-in-transit/why-https), [Mozilla](https://blog.mozilla.org/security/2015/04/30/deprecating-non-secure-http/), and [EFF](https://www.eff.org/encrypt-the-web) to https everything, it seems important. Dave has written a lot about how [HTTP is under attack](http://scripting.com/2018/02/23/174914.html), and I agree with him. However, I don't want to exclude someone from using rssCloud because they would prefer to use https. I feel like this is kosher because I'm continuing to support xml-rpc and http-post in the same way that it's documented, and the way his server worked. In his documentation, he talks about adding support for soap if people request it, so it seems like "protocol" was designed as a way to expand functionality down the road.

I probably won't do an overhaul of the log viewer in 2.0, but hopefully, that will be the next project. It's difficult to debug things if you're building a service that supports rssCloud. There are a lot of edge cases that can hang you up.

Right now, I'm working on building automated tests. The tests I've written so far have actually helped me find bugs that I don't think I would have caught otherwise. I'm going about testing in a slightly odd way. I'm following a pattern described in the post [API end to end testing with Docker](https://web.archive.org/web/20191112163314/https://fire.ci/blog/api-end-to-end-testing-with-docker/). I'm running the app in one container, the database in another, and the tests in a third. The tests create a mock API and configure the app to send requests to it. That way, I can script endpoints that return different results and see how the app responds.

I'm hoping to have 2.0 released in the next couple of weeks. I thought I'd have it ready already, but some personal issues have delayed me. I'm really excited to get this out the door. It's been a long time coming.

