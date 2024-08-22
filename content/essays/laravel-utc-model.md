---
title: Laravel UTC Model
date: 2015-05-01T06:00:00.000Z
updated: 2015-05-01T06:00:00.000Z
published: false
---

I've been playing around with [Laravel](http://laravel.com/) lately and overall I like it.

One issue I ran into pretty quickly was that I would like to store datetime fields in the database as UTC and then store the timezone (in this case for an event) in another field.

Laravel seems to have a global timezone configured and any DateTime pulled out of the database is assumed to be this timezone. If you assign a field with a different timezone it doesn't seem to convert to this global timezone when saving so you can end up with weird inconsistant timezones all over the place.

So I put together a little class that extends `IlluminateDatabaseEloquentModel` and converts between timezones on the fly.

It also allows me to specify the timezone I want to use (defaults to app.timezone) for that particular model.

If you're a Laravel developer I'd love to get some feedback as I'm new to Laravel and I may just be missing something.

Here's the code: [UtcModel.php](https://gist.github.com/andrewshell/76442d5ee5e1ed557227)

