---
title: Playing with Old School
date: 2020-10-27T13:36:39.000Z
published: false
created: 2020-10-27T13:36:39.000Z

---

I seem to be having issues with the site updating. I added a post this morning and I triggered a build but the site didn't change. I can verify that the <a href="http://storage.shll.me:1229/users/andrewshell/electric/osgeekity.json">osgeekity.json</a> file has changed.

I tried deleting all the s3 bucket contents, I stopped oldschool and deleted the data folder. I restarted and triggered the build. The site was rebuilt, but without the latest post.

It's particularly odd because one of the changes I made was I added copyright to the opml header. I had figured out that was where [%copyright%] populated from.

Now, I think I have an inkling of an idea of what's happening.

The post I wrote last night in the outline was published under an "October 26" heading but has the timestamp of "Tue, 27 Oct 2020 06:33:15 GMT" so it's technically October 27.

The post today is under the "October 27" heading with a timestamp of "Tue, 27 Oct 2020 13:28:25 GMT".

My guess is that oldschool overwrote the real October 27 post with the October 26 post.

The clue was that the website shows yesterdays post under "Tuesday, October 27, 2020"

I'm going to try changing the created timestamp to the 26th and see if that fixes things.

Yes! But I had to change the timestamp on the October 26 heading as well.

