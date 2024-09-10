---
title: Introducing fs-key-value My First NPM Module
date: 2013-08-15T06:00:00.000Z
published: false
created: 2013-08-15T06:00:00.000Z

---

Today I published [fs-key-value](https://npmjs.org/package/fs-key-value) which is my first NPM module.  Earlier this week I talked about creating a little wrapper for LevelUp that was supposed to make it work when I spin up multiple processes using [cluster](https://npmjs.org/package/cluster).  After some further testing I came to the conclusion that my wrapper wasn't actually working and after banging my head against the wall for a while decided I'd best try a different approach.

My next attempt was to use SQLite (via [sqlite3](https://npmjs.org/package/sqlite3)) but I ran into similar problems.

My last attempt is what turned into [fs-key-val](https://npmjs.org/package/fs-key-value) my first NPM module.

The idea is that I wanted a simple key value API that works properly when I spin up multiple processes via `cluster.fork()` and one tool I was using in my past experiments was [fs-ext](https://npmjs.org/package/fs-ext) which extends the built in [fs](http://nodejs.org/api/fs.html) module and adds support for file locking.

Initially I tried to use all the asynchronous methods but found I was having a hard time making it work. It also really made my code hard to read.  The current version uses the synchronous versions which works great and seems to be fast enough for my needs.

I had an easy enough time with get and put but found some race conditions sneaking in when I tried implementing delete.  The solution I found was to add a `.lock` file in the database directory that I can get a shared lock on when using get and put and then an exclusive lock when I'm deleting a file.  This way I don't try to get a files contents after it's been deleted.  Works like a charm.

**UPDATE 8/21/2013:**

I decided to do things the right way and rewrite my module to be asynchronous.  I've written a followup post [Revisiting fs-key-value](/revisiting-fs-key-value/) about this.

