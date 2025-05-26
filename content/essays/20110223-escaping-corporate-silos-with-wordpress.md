---
title: Escaping Corporate Silos With WordPress
date: 2011-02-23T06:00:00.000Z
published: false
itemtype: https://schema.org/TechArticle
created: 2011-02-23T06:00:00.000Z

---

After my post on Friday about [Giving Up on Web Ownership](/essays/giving-up-on-web-ownership/) a couple people pinged me asking how they would go about publishing to Twitter, without publishing in Twitter.  Dave Winer is working on the problem with his [minimal blogging tool](http://scripting.com/stories/2011/01/05/upcomingTheMinimalBlogging.html) but I was thinking... why can't we do this with WordPress?  So today I'm going to walk you through the steps necessary to create your own WordPress based microblog that publishes to Twitter.

This is going to be a higher level tutorial.  I'm not going to walk you through installing WordPress or how to install a themes and plugins as there are plenty of places that describe this process.  Many hosting companies like [DreamHost](http://www.dreamhost.com/) have a one click install that make the process super simple.  Ping me if you're having trouble.

## Step 1: Install P2 Theme

The first thing to do is make the site look and behave like a microblog.  Do this by installing the [P2 theme](http://wordpress.org/extend/themes/p2) which is provided by Automattic, the same company that is behind WordPress.  It's also available on WordPress.com if you're not interested in hosting your own blog.

## Step 2a: Install a Twitter Plugin

There are many plugins that will allow you to publish your posts to twitter.  I tested a bunch of them but only found two that worked.  The one I'd recommend right now is [Twitter Blog](http://wordpress.org/extend/plugins/twitter-blog/) which was pretty easy to set up.

To get Twitter Blog configured, you need to connect to your Twitter account using OAuth.  This is as easy as clicking the "Sign In With Twitter" button in the settings page.  It also seems to require a bit.ly account and API key.  I already had an account, and getting the key was as straight forward as going into the bit.ly settings page and copying and pasting it into the Twitter Blog settings page.

The only problem I've found with using a twitter plugin is that they all seem to tweet the title and url.  Since we're posting a status update without a title, WordPress automatically creates one that is the body truncated to 40 characters.  Therefore your tweets are just the first 40 characters and a link back to your status update.  Not ideal, but not the end of the world.

## Step 2b: Use TwitterFeed

If you don't want to use a Twitter plugin or can't (like on WordPress.com) head over to TwitterFeed and register the RSS feed from your site.  It can check your feed every 30 minutes and post for you a max of 5 tweets at a time.  Obviously if you are going to post more then 5 tweets every 30 minutes, you're going to have to go with a plugin.  If you go this route, be sure to select "Description Only" for Post Content under Advanced Settings so you can get around the truncated post title issue.

## Summary

At the end of the day, while this is certainly better then nothing, there is work to be done.  I'll do some more research and maybe write a plugin or two that makes this a seamless experience.  It seems like we're really close to a solution.

