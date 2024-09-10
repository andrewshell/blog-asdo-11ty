---
title: Switched site to GatsbyJS
date: 2019-11-06T18:31:25.000Z
published: false
created: 2019-11-06T18:31:25.000Z

---

You may notice that my site is a little different now. I've been playing around with [GatsbyJS](https://www.gatsbyjs.com/) lately, and it seemed like something I'd like to use. It's a static site generator, although it's more of a PWA generator. The output is static HTML and javascript files that can be deployed to S3 or in my case, [Netlify](https://www.netlify.com/).

It's build using React under the hood but renders the content during the build phase, so it's fast and easily indexed by search engines. The React is still used on the frontend, so even though each page is statically rendered, once you load a page, it works like a single-page app (SPA), so it's super fast for visitors.

I'm trying out Netlify as well. I've always either hosted my site on Linode or S3. I'm still using the free tier, and it's very impressive what it offers.

I'm writing this post in the Netlify CMS, which connects to GitHub and writes markdown files and triggers a rebuild/deploy of my site. It also supports form handling, so I have a contact form that works even though this is a static site.

I'm hoping to get back into blogging again as I have had a very crazy year that has had me bouncing between a couple of different jobs.

