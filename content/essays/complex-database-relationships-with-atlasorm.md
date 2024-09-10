---
title: Complex Database Relationships with AtlasORM
date: 2016-10-10T16:51:58.000Z
published: true
itemtype: https://schema.org/TechArticle
created: 2016-10-10T16:51:58.000Z

---

In my [side project](https://github.com/andrewshell/pen-paper-2) I'm working with a very well normalized database with many relationships.

One of the most complex pages is a `Creator` where it shows info about the creator and all of the works that they have contributed to.

[![creatordiagram](/uploads/2016/10/CreatorDiagram.png)](/uploads/2016/10/CreatorDiagram.png)

This is the database structure for this page.  On the left, we have a Creator which has a one-to-many relationship to seven different join tables. Each of these tables represents this creators credit on that particular type of work.  So if the creator worked on an RPG book there would be a `RpgBookCreator` that shows what credit that creator had in a particular RPG book. A credit could be something like Author or Illustrator.

When I first started working on this project I was doing plain SQL with PDO. Quickly I realized that for all the pages I was building I'd be writing a whole lot of queries and that didn't sound particularly fun.

Then I tried porting part of this page over to [Doctrine 2 ORM](https://www.doctrine-project.org/projects/orm.html) and that was a huge mess.  All of the mapping files and entity objects was taking a long time to get right. Then, once I had it configured for `Creator`, `RpgBookCreator`, `RpgBook`, `Credit`, `GameLine` and `Publisher` (which is only 1/7 of the structure) I ran the query and the page just sat there spinning. I was not familiar enough with Doctrine to make it perform the way I wanted it to.

It was suffering from the ["N+1 Problem"](https://www.sitepoint.com/silver-bullet-n1-problem/):

This problem occurs when the code needs to load the children of a parent-child relationship (the "many" in the "one-to-many"). Most ORMs have lazy-loading enabled by default, so queries are issued for the parent record, and then one query for EACH child record. As you can expect, doing N+1 queries instead of a single query will flood your database with queries, which is something we can and should avoid.

Well, it just so happens [Paul M. Jones](http://paul-m-jones.com/) the creator of [Radar](/essays/radar-under-the-hood/) wrote the book ["Solving The N+1 Problem in PHP"](https://leanpub.com/sn1php). Not only that, he is the creator of [AtlasORM](https://github.com/atlasphp/Atlas.Orm) described as:

Atlas is a data mapper implementation for your persistence model (not your domain model).

If anyone would have an ORM that could handle my data structure, it's Paul.

It didn't take very long to get my site working with Atlas. There is a very useful CLI that will analyze your database and generate the scaffolding needed for Atlas to work.

The two types of classes required for atlas are Tables and Mappers. The Table classes (ex: [CreatorTable](https://github.com/andrewshell/pen-paper-2/blob/0.1.0/src/Persistence/DataSource/Creator/CreatorTable.php)) described things like the column names, the primary key, and the default values.

The Mapper describes the relationships between tables. By default, the method `setRelated` is empty because the CLI doesn't create them.  However, it was very easy for me to write a script that did automatically create these relationships because I was using a consistent naming scheme.

Here is the final [CreatorMapper](https://github.com/andrewshell/pen-paper-2/blob/0.1.0/src/Persistence/DataSource/Creator/CreatorMapper.php) which describes all of its one-to-many relationships.

Finally, in my [CreatorsAtlasRepository](https://github.com/andrewshell/pen-paper-2/blob/0.1.0/src/Persistence/CreatorsAtlasRepository.php#L33-L127) class I query the database, specifying all of the relationships I'd like to include.

It was pretty fast. I picked a creator with many credits across different types of work ([Monte Cook](https://en.wikipedia.org/wiki/Monte_Cook)) and it loaded in about 1.8 seconds. However, I wanted to make sure Atlas was querying efficiently.

In an ideal situation, it would query each table once or join some tables and have less than 20 queries. I wasn't expecting this.

In a more expected situation, it would query the tables close to the root once and some of the edge tables (publisher, game_line) might get queries a few times for different batches of data. Probably around 30-40 queries depending on the creator.

I found a project called [PHP Debug Bar](http://phpdebugbar.com/) that could hook into different systems (including PDO) and show stats for each page.

It took a little work to get that configured with Atlas, but I got it working and went to see how many queries were made to render the Monte Cook page.

I was very surprised to see a total of 484 queries. That was an order of magnitude larger than I was expecting. Clearly, there was still an N+1 problem with Atlas.  I dug through the query log and determined that the issue was with the edge relationships.  There were many many queries for single publishers and game lines.

I [submitted a PR](https://github.com/atlasphp/Atlas.Orm/issues/28) explaining my issue. Today Paul commented that he had a patch in a development branch and wanted me to test it.

I'm happy to report that the same Monte Cook page now loads with only 32 queries which is right where I was expecting it to be. The page is a little faster at 1.5 seconds which is good enough for development. Before the site goes live I'll implement a caching layer.

This patch should get merged into the main branch soon. This is really a fabulous library that I'm planning on using in all of my new projects.

