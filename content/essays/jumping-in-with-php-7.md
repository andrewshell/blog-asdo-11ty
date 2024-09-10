---
title: Jumping in with PHP 7
date: 2016-01-15T17:09:57.000Z
published: false
created: 2016-01-15T17:09:57.000Z

---

After reading [Why we are requiring PHP 7 for our new packages](https://murze.be/2016/01/why-we-are-requiring-php-7-for-our-new-packages/) I decided to make [Stupid Simple Invoices](https://github.com/andrewshell/invoice) (a side project) require PHP 7.

It's a fairly small project right now and it took me a total of about 30 minutes to make sure everything was ready to go. I updated composer to require php >= 7.0.0 and I added `declare(strict_types = 1);` to all my files and added scalar type definitions and return type definitions.

I only had to make one little change, but it wasn't that big of a deal. I had a method that would return an array or null and now instead of null it returns an empty array.

This logic will most likely be refactored away in a later version, but it's perfectly acceptable right now.

It's my goal to transition the two applications I work on at Pinpoint to be running on PHP 7 if possible for the speed improvements, but since they are much larger it will take some time to add type declarations to the codebase.

All of my side projects moving forward will be PHP 7 unless there is a really good reason for it not to be.

