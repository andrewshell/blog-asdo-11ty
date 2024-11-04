---
title: Tackling Database Migration to Restore a Legacy Site
created: 2024-11-04T14:42:00.000Z
date: 2024-11-04T14:42:00.000Z
published: true
---
I've taken on the challenge of resurrecting a website that's been offline for more than a decade.

It had a very expansive and well-normalized database using MySQL. I've been out of the SQL game for about six years, as all my recent projects have used MongoDB. It's been fun getting back into it.

Due to the vast amount of data this website managed, and how out of date most of it is, I've had to really think about how I want to approach this project.

I decided to use SQLite instead of MySQL because it would be easier to manage since I wouldn't need to host a MySQL server.

I'll use two different SQLite databases in this project. One database is simply a partial export of the original MySQL database. I'll access this database in read-only mode to enforce the idea that this is just legacy data.

The other database will be the live database that the website will use and update.

One of the first challenges I've tackled is database migration.

I'm sure there are entire npm packages dedicated to SQLite database migration, but I've decided to roll my own. My needs are minor, and working with two databases is unusual. I've already written one migration that creates the new table and imports data from the legacy database.

I based the migration script loosely on how Laravel handles migrations.

I'm taking it step by step and focusing on a single core part of the database.

With the way I've designed the database migrations, I'll be able to gradually fold additional data into the website. I'll also leverage lazy migration, where I'm not copying all the data immediately. I'll only copy data when someone visits one of the legacy URLs.

This way, I can prioritize which data to review and clean up.
