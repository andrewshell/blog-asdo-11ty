---
title: Shipping is Scary
date: 2011-04-22T06:00:00.000Z
published: true
created: 2011-04-22T06:00:00.000Z

---

Today I shipped a little app of mine called TwitOPML.  I'm now freaked out.  What if a ton of people start using it?  What if nobody uses it?  I shot an e-mail about it to the [EC2 for Poets mailing list](https://groups.google.com/group/ec2-for-poets), so most likely somebody will try it out.  In fact, I pretty much developed the app for the members of that list.

The list is for people trying out Dave Winer's new "[Blork](http://scripting.com/stories/2011/04/05/gettingStartedWithBlork.html)" software.  It's an app that does microblogging and RSS aggregation.  It's sort of a Twitter replacement.  You subscribe to peoples RSS feeds, you post status updates to your own RSS feed, it's cool.  One thing you can do is subscribe to an [OPML subscription list](https://opml.org/spec2.opml) which is just a list of RSS feeds.  This way feeds can be added and removed from the list without you having to manage it on your end.

What my app does is you sign in with Twitter and from there you can generate OPML subscription lists for your friends, followers and any Twitter lists you've created or subscribed to.  It's a neat little app.  Now I wait for praise or criticism.

## UPDATE:

After running this app for two years it stopped working when [Twitter retired their v1 API](https://blog.x.com/developer/en_us/a/2013/api-v1-is-retired). In theory, I probably could have figured out a way to keep it working, but I decided it was time to shut it down. Overall I think it was a success although what I didn't expect was the amount of noise that came through when the feeds were not filtered for @replies.

One interesting thing to come of it was being mentioned in the [World Outline Podcast #7](/essays/world-outline-podcast-7/) where [Adam Curry](http://en.wikipedia.org/wiki/Adam_Curry) mentioned how much he likes and uses TwitOPML.

