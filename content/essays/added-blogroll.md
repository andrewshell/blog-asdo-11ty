---
title: Adding a Blogroll to the Homepage
published: false
date: 2024-10-05T02:52:48.000Z
created: 2024-10-05T02:52:48.000Z
---

Dave Winer has been working on something interesting lately. He's [modernized the blogroll](https://blogroll.social/) from the early days of blogging by combining it with an RSS aggregator, which lets you interact with the blogroll and see what posts have been published recently.

Today, I finally had the time and mental energy to investigate and implement it on my homepage.

You'll immediately see that mine looks similar but different from [Dave's](https://scripting.com/). That's because we have different tech stacks, and I wanted to use something other than JQuery. My homepage was also not designed for a sidebar.

<figure>

![Side-by-side comparison of my blogroll and Dave's](img/blogroll.png)

<figcaption>Side-by-side comparison of my blogroll and Dave's</figcaption>
</figure>

However, our blogrolls are both powered by the very capable [FeedLand aggregator](https://feedland.com/).
