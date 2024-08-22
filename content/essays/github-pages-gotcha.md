---
title: GitHub Pages Gotcha
date: 2013-08-03T06:00:00.000Z
updated: 2013-08-03T06:00:00.000Z
published: false
---

This blog (and a couple other sites) have been hosted via [GitHub Pages](http://pages.github.com/) which has been great.  However I wanted other features that required plugins which are not supported on GitHub Pages for security reasons.

The way around this is to generate your site locally (with plugins) and commit your generated files as the site to GitHub Pages (see [Changing My Jekyll Config](/essays/changing-my-jekyll-config/).  This is how this blog had been running for the last month or so.  I found this process to be tedious.  In order to publish my site I had to commit my source branch then `push origin source` then go to my master folder which is where the site was generated to.  Commit all the updated files and `push origin master`.  Not the worst work flow in the world, but still a pain in the ass.

Yesterday I changed things.  I took my source branch and pushed it to a [new repository](https://github.com/andrewshell/blog.andrewshell.org) updated it so jekyll would build into the `_site` directory.  Then I make a little script publish.sh that would use s3cmd to sync my `_site` folder to Amazon S3.

Since my blog had been a CNAME pointing to andrewshell.github.com I decided to use that as a single page profile site.  I deleted the old repository (new site, new repository) and that's where things started to get a little weird.

First issue, GitHub changed things so user pages are no longer username.github.com but rather username.github.io so my new repository (and domain) was [andrewshell.github.io](http://andrewshell.github.io/).  This wasn't too bad.

Second issue, because I deleted the andrewshell.github.com repository.  It also seemed to delete the generated content from my project sites that were hosted on GitHub.  I guess even though they have their own CNAME files they are all stored in the same structure.  I can confirm this because [librefeed.org](http://www.librefeed.org) also shows up at [andrewshell.github.io/librefeed](http://andrewshell.github.io/librefeed/).

To fix this issue I just had to check out my two sites, make a change and re-commit.  This triggered the rebuild on GitHub Pages and the sites came back online.

