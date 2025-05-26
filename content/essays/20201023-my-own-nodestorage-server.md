---
title: My own nodeStorage server
date: 2020-10-23T14:25:13.000Z
published: false
created: 2020-10-23T14:25:13.000Z

---

If things worked correctly. This should be saved on my personal nodeStorage server.

It did! You can visit <a href="http://my.shll.me/andrewshell/notes.opml">http://my.shll.me/andrewshell/notes.opml</a>

I took the logic from <a href="https://gist.github.com/scripting/a676b0da36c13576877a91fc77a34ecb">filter.js</a> and rewrote it based on what I learned about how filter.js really works now. Since I'm running nodeStorage on the same server as pagePark I can do the same thing Dave is doing with my.this.how

I quickly found the switchServer(theServer) method in Little Outliner. This allows me to direct LO2 at my own nodeStorage server.

It looks like switchServer doesn't change the urlChatLogSocket variable so as of right now instant outliner doesn't work. That's fine though, I think there are multiple systems in play and it's not important to me right now.

