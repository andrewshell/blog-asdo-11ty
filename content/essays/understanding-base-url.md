---
title: Understanding Base URL
date: 2013-05-03T06:00:00.000Z
published: false
created: 2013-05-03T06:00:00.000Z

---

I've been using GitHub Pages quite a bit these days.  In fact this blog is running off on GitHub Pages.  I really like it as a platform.

Part of using GitHub Pages is understanding the ins and outs of Jekyll and what limitations are placed on it in the context of running on GitHub Pages.

One thing that has been kind of a pain in the ass has been the URL structure of project pages.  See if you create a repository named username.github.com (mine is andrewshell.github.com) it will create that domain for you.  All other project sites are then put under username.github.com/projectname which starts to mess things up.

See when you're creating a site in Jekyll you're probably running it locally.  You run `jekyll --server` and then you can go to `localhost:4000` and you see a local copy of your website running.

The problems are with the URLs.  Normally when I build a site, URLs are based from the root so linking to this page would be `/understanding-baseurl/` and my CSS file would be `/css/style.css`.  However, if my site is a project page, it's in a subdirectory /projectname/ and the URLs are linking outside of the project site.  So instead of going to `/projectname/page.html` you get `/page.html` which is wrong.

Googling for a solution doesn't give a clear answer as to what you're supposed to do so today I sat down and figured it out.  The result is a new repository on GitHub that also happens to be a project page.

If you're interested in learning about my solution please head over to [https://github.com/andrewshell/baseurltest](https://github.com/andrewshell/baseurltest) or the live project page at <del>https://blog.andrewshell.org/baseurltest/</del>.

UPDATE: This site is no longer on GitHub Pages and therefore the live project page is no longer available.

