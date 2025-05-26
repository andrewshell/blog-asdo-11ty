---
title: Revisiting fs-key-value
date: 2013-08-21T06:00:00.000Z
published: false
created: 2013-08-21T06:00:00.000Z

---

Last week I announced my first Node.js module [fs-key-value](/fs-key-value/). I'm new to Node.js and was not having any success making it asynchronous so I released it as a synchronous library.  Soon after I realized it made more sense to take a little more time and rewrite it to be asynchronous.

I'm not sure why this was so difficult, but I was running into massive issues.  In particular I'd get deadlocks where the app would just stop and my logging showed that it would get to certain parts of the code and it would just be waiting to get a lock.  I think part of it is just that I'm not very good at architecting asynchronous code yet.

The way I solved my issue (I hope) is by looking at other projects and see how they do things.  I took a look at [alfred](https://npmjs.org/package/alfred) and that led me to [step](https://npmjs.org/package/step) which allowed me to greatly simplify the logic in my asynchronous library.

I still have a lot to learn and I hope I did things properly.  I'm very interested in feedback so if you think I could have done things differently please let me know.  If you're really ambitious you can [submit a pull request](https://github.com/andrewshell/node-fs-key-value).

