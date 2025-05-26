---
title: 'Introducing DocCloud: Using RSS Cloud for more then just RSS'
date: 2012-05-28T06:00:00.000Z
published: true
created: 2012-05-28T06:00:00.000Z

---

Dave Winer discusses in his post [A simple proposal for discussion software makers](http://scripting.com/stories/2012/05/26/simpleProposalToDiscussion.html) an idea where instead of having to only publish content inside of the application (Ex: WordPress, Tumblr, Quora), you could specify a URL for your content and the application would fetch that content and through a process it stays updated with pings from the document source.

When I read this I thought. Isn't that basically what RSS Cloud already does? The only issue was that the discovery of the RSS Cloud server is currently limited to a `<cloud>` element in an RSS or Atom feed.

What I propose is the addition to the specification that allows for an X-RSS-Cloud HTTP header that specifies the RSS Cloud server. Since we're limited by a single URL, Clouds discovered by this method are assumed to work via REST as opposed to XML-RPC or SOAP.

Everything else functions exactly as it would in the [RSS Cloud Specification](http://walkthrough.rsscloud.co/). Since RSS Cloud doesn't parse the "feed" but rather just checks to see if it has changed, this HTTP header method can be used to track updates for any kind of document accessible from on the internet including binary files like images.

If you would like to try it out head over to [github and grab a copy](https://github.com/andrewshell/DocCloud-Demo).

This is just an idea I had.  Let me know in the comments what you're thinking.

