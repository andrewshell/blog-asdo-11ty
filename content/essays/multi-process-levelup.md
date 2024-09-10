---
title: Multi-Process LevelUP
date: 2013-08-12T06:00:00.000Z
published: false
created: 2013-08-12T06:00:00.000Z

---

Recently I've been working on a Node.js app that uses [LevelDB](http://code.google.com/p/leveldb/) via the [LevelUp](https://github.com/rvagg/node-levelup) module.

Out of the box it works really well, but I ran into problems when I tried adding multi-process support (via the [cluster](https://npmjs.org/package/cluster) module) to my app.

So I created a little wrapper script that uses a lockfile to allow each process to access the database without stepping on each other toes.  I've uploaded the code to GitHub at [removed].  As of right now it's not a package that can be installed via npm but if people are interested I might go through and make it one.

In order to use my wrapper you need to have the modules [levelup](https://npmjs.org/package/levelup), [fs-ext](https://npmjs.org/package/fs-ext) and probably [leveldown](https://npmjs.org/package/leveldown) which is the default backend package.

It's working for me in my app right now, if you like it let me know.  If you find a bug please submit a pull request.

**UPDATE 8/15/2013:**

After further testing I've found that my wrapper doesn't seem to work properly.  I'm honestly pretty confused about it.  If I revisit and come up with a working solution I'll post an additional update.  Next I'm going to test out [multilevel](https://github.com/juliangruber/multilevel) which is what they recommend in the levelup docs.

**UPDATE 2 8/15/2013:**

[multilevel](https://github.com/juliangruber/multilevel) looks interesting but it's not a good fit for what I'm trying to do.  I ended up creating a new module [fs-key-value](/fs-key-value/) that does exactly what I want.

