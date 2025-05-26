---
title: Little Outliner and rssCloud?
date: 2020-10-21T15:58:45.000Z
published: true
created: 2020-10-21T15:58:45.000Z

---

Idea: Could we include a cloud tag in an OPML headline and have Little Outliner ping an rssCloud server with the public OPML url when it's updated? That way if we wanted to use an OPML file as a data source (blogging for instance) the consumers could subscribe to the file.

## [Dave Winer](http://scripting.com/2020/10/22.html#a165831)

It's a good idea, but.. (sorry) -- OPML already has a realtime notification service, it came after rssCloud and is based on web sockets.

I'm going to think about this more and look under the hood with the web socket implementation. My gut tells me this isn't the solution I'm looking for.

## Here's my use case:

I want to blog using little outliner as a CMS.

I want the website to be a [Gatsby](https://www.gatsbyjs.com/docs) site. (Gatsby is an advanced static site generator.)

Gatsby can consume data from many places through the use of a [source plugin](https://www.gatsbyjs.com/plugins/?=source).

I'd create a source plugin that pulls from an OPML file hosted by little outliner.

I deploy and host my site using [Netlify](https://www.netlify.com/) and it has APIs that can be used to trigger a site rebuild.

I would have some mechanism so if an outline had not changed over the last 5 minutes or so, it would trigger a rebuild.

I don't want to have a server continuously connected to little outliner via web socket.

Dave did mention to not jump to automating everything. To start out doing things manually. There is nothing preventing me from building a site with Gatsby pulling from an OPML file and deployed with Netlify.  When I'm done writing something new and I want it deployed I can log into Netlify and manually trigger a rebuild.

