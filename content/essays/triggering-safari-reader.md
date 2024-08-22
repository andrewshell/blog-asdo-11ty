---
title: Triggering Safari Reader
date: 2013-08-07T06:00:00.000Z
updated: 2013-08-07T06:00:00.000Z
published: false
---

I do most of my blog reading on my iPhone so it's really important for me that my blog looks good on the iPhone.

One feature that I really like is the "Reader" feature that shows up in the address bar on both mobile and desktop Safari.

One issue with it though is that there is no documentation (that I can find) about how to markup your site so it consistently triggers the reader.

I noticed that on some of my shorter posts it didn't work and in reality, it's not that big of a deal because my site is responsive, but it still bugged me.

After digging through blog posts, comments and forums I came across [this comment ](http://mathiasbynens.be/notes/safari-reader#comment-26)that showed that one word of content in an html5 article tag with a height of 350px triggered the reader.

So I started doing some testing of my own. What I found is that in desktop  safari I was able to wrap my content in an article tag and set min-height to 350px and short content would trigger the reader. If I shrunk the width of the browser to a phone width and refreshed the page it did not trigger. If I increased the min-height to 450px then it worked, but when I published the site live and tested on my phone it did not work. I had to increase `min-height` to 600px in order for my iPhone to show the reader on a [short blog post](/essays/world-outline-podcast-7/).

This is a pain in the ass, especially since the reader isn't respecting the constraints of the article tag. It also pulls in the "Feedback" section in the footer of each blog post. Not the end of the world but still annoying.

I'm guessing part of the reason it's kept a secret is that Apple doesn't want sites messing with it and hiding the post content and showing ads instead (or something along those lines). People were certainly getting upset when this feature was released.

