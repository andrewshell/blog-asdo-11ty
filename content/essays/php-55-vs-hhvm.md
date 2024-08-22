---
title: PHP 5.5 vs HHVM
date: 2015-02-02T06:00:00.000Z
updated: 2015-02-02T06:00:00.000Z
published: false
---

At my job at [Pinpoint Software](http://www.pinpointsoftware.co), I've been working on our primary product Taskle. It's been very successful so far and we're adding a bunch of new companies to our system all the time. Of course that means scaling issues.

The current issue is that the cron job that marks expired tasks as incomplete and schedules new tasks has a disproportionate number of tasks that start and end at midnight. Most of our customers right now are in Central or Eastern timezones so all daily tasks end and start at midnight. So at this time I see our server CPU levels spike and a cron job that normally takes seconds to finish, takes over two hours to run. This is only going to get worse as we add more customers.

There are two ways I see to scale this. The first is to just break the code up so I can run multiple servers in parallel so the whole thing gets done quicker. This will have to be done sooner or later and I'm actually in the middle of tweaking the code to make this possible.

The second way is to make the cron job run faster with a smaller CPU footprint. This is also ideal as it will mean fewer parallel servers.

Perhaps PHP isn't the best tool for the job, but I don't have the time, skill or resources to rewrite it in another language like Java or C. It is possible I could find the bottlenecks and rewrite them as a PHP extension, but I've never done that before and I'm not certain of my abilities in doing that.

So as a first step I thought "What about [HHVM](http://HHVM.com/)?". If you're not familiar, HHVM is a virtual machine written by Facebook to essentially compile PHP into bytecode and run faster with less memory and a smaller CPU footprint. This would be ideal because I could just use my existing code and get an instant performance boost.

But HHVM isn't exactly PHP and although they are working to make it as compatible as possible, there could be weird edge cases. So what do I do? Let's run our unit tests through HHVM and see if they pass. Yes! They do all pass, however I saw something weird when I did this.

```bash
PHPunit:
[exec] PHPUnit 3.7.38 by Sebastian Bergmann.
[exec]
[exec] Configuration read from /var/www/pinpoint.dev/PHPunit.xml.dist
[exec]
[exec] ...............................................................  63 / 202 ( 31%)
[exec] ............................................................... 126 / 202 ( 62%)
[exec] ............................................................... 189 / 202 ( 93%)
[exec] .............
[exec]
[exec] Time: 570 ms, Memory: 15.00Mb
[exec]
[exec] OK (202 tests, 2753 assertions)
HHVMunit:
[exec] PHPUnit 3.7.38 by Sebastian Bergmann.
[exec]
[exec] Configuration read from /var/www/pinpoint.dev/PHPunit.xml.dist
[exec]
[exec] ...............................................................  63 / 202 ( 31%)
[exec] ............................................................... 126 / 202 ( 62%)
[exec] ............................................................... 189 / 202 ( 93%)
[exec] .............
[exec]
[exec] Time: 4.65 seconds, Memory: 27.63Mb
[exec]
[exec] OK (202 tests, 2753 assertions)
```

Running my tests with HHVM took 23 times longer and 1.8 times more memory.

I'm guessing that this is because it takes longer to compile everything and that the real benefits will be seen in running my normal code. One of my next tests will be to run a long cron job with PHP and HHVM and see which is quicker and maybe see the best way to measure memory and CPU usage.

If you have any experience with this sort of thing I'd be very interested in learning more about how to do it.

I did some googling and found the post [Go Faster!](http://hhvm.com/blog/4061/go-faster) on the HHVM blog, but it seems out of date. Since then they moved config to ini files which I was able to figure out but I can't for the life of me get the pre-analyzing to work.

It seems like HHVM should be caching the compiled files, but even if I run my tests multiple times I don't see any performance bump.

