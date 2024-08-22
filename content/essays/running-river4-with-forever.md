---
title: Running River4 with forever
date: 2014-06-25T06:00:00.000Z
updated: 2014-06-25T06:00:00.000Z
published: false
---

I've been playing around with Node.js for a while but I never got far enough to deploy an app to production.

Dave Winer recently released [River4](http://river4.smallpict.com/2014/06/04/welcomeToRiver4.html) which is the latest in a line of excelent [River of News aggregators](http://scripting.com/2014/06/02/whatIsARiverOfNewsAggregator.html).

Previous versions ran on the [OPML Editor](http://home.opml.org/) which I've been having a harder and harder time keeping alive. So I was very happy to see River4 was a Node.js app.

The only issue is that step 4 of his instructions says:

Launch river4.js on a node.js system.

If you've never done this before it's somewhat vexing. Dave has some links to resources about Heroku, but I have a Linux server sitting in my basement that I wanted to use, so how should I keep the app running as a long term service?

After some digging I found the glorious app [forever](https://www.npmjs.org/package/forever) which is "A simple CLI tool for ensuring that a given script runs continuously (i.e. forever)."

Installing and using it was very easy. After following steps 1-3 from the River4 repo I ran:

```bash
git clone https://github.com/scripting/river4 /var/www/river4
sudo npm install forever -g
cd /var/www/river4
forever start river4.js
```

This will launch River4 as a background process, keep an eye on it and restart it if it crashes. Then I finished the rest of the steps 5-8.

When Dave releases an updated version it's simple to upgrade:

```bash
cd /var/www/river4
forever stopall
git pull
forever start river4.js
```

I currently have 5 rivers running but my main one is [river.andrewshell.org](http://river.andrewshell.org/).

