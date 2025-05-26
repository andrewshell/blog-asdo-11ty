---
title: Collecting Data from Atlas ORM with PHP Debug Bar
date: 2016-10-14T05:00:09.000Z
published: true
itemtype: https://schema.org/TechArticle
created: 2016-10-14T05:00:09.000Z

---

In my last article, I talked about how I found [an N+1 bug in Atlas ORM](/essays/complex-database-relationships-with-atlasorm/).

I had mentioned how it took a little work to get PHP Debug Bar configured with Atlas but didn't really explain why it was difficult, or how I got them working together.

At first, it seemed like it would be easy. Debug Bar comes with a PDOCollector and Atlas is based on PDO. In `Atlas\Orm\AtlasContainer` it creates a new `Aura\Sql\ConnectionLocator` then creates and adds an `Aura\Sql\ExtendedPdo` connection to it.

PHP Debug Bar requires you wrap your PDO connection in `DebugBar\DataCollector\PDO\TraceablePDO` which extends `PDO`.

`Aura\Sql\ExtendedPdo` wraps a PDO connection and extends `PDO` however `DebugBar\DataCollector\PDO\TraceablePDO` is not a `Aura\Sql\ExtendedPdo` object.

That means that I need to wrap `PDO` in `DebugBar\DataCollector\PDO\TraceablePDO` which is then wrapped in `Aura\Sql\ExtendedPdo`.

There is no easy way of doing that without replacing some code.

The first step is to create a new `ExtendedPdo` class that extends `Aura\Sql\ExtendedPdo` that overrides `connect()` which instantiates the `PDO` connection. We want to wrap the newly created connection in `DebugBar\DataCollector\PDO\TraceablePDO`.

Next, we create a new `AtlasContainer` class that extends `Atlas\Orm\AtlasContainer` that overrides `setConnectionLocator` to instantiates my new `ExtendedPdo` instead of `Aura\Sql\ExtendedPdo`.

Finally, we can use the `DebugBar\DataCollector\PDO\PDOCollector` which requires a `DebugBar\DataCollector\PDO\TraceablePDO` connection. We can get that out of our `AtlasContainer` like this:

```php
$pdo = $atlasContainer->getConnectionLocator()->getDefault()->getPdo();
```

To make this step easier I created `AtlasOrmCollector` which extends `DebugBar\DataCollector\PDO\PDOCollector` but expects my `AtlasContainer` instead of a `PDO` connection in the constructor. This way I can pull out the `DebugBar\DataCollector\PDO\TraceablePDO` connection and pass it to the parent constructor.

I've packaged all of this up into the library [AtlasOrm.DebugBar.Bridge](https://github.com/cadrephp/AtlasOrm.DebugBar.Bridge) which is also available on packagist as [cadre/atlasorm-debugbar-bridge](https://packagist.org/packages/cadre/atlasorm-debugbar-bridge).

You can now integrate PHP Debug Bar into your applications that use Atlas ORM as simply as this:

```php
$atlasContainer = new Cadre\AtlasOrmDebugBarBridge\AtlasContainer(
  'mysql:host=localhost;dbname=testdb',
  'username',
  'password'
);
$debugbar = new DebugBar\StandardDebugBar();
$debugbar->addCollector(
);
```

