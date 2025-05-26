---
title: Tracking Multiple Connections with PHP Debug Bar and Atlas ORM
date: 2016-10-18T14:14:29.000Z
published: true
created: 2016-10-18T14:14:29.000Z

---

On Friday I talked about a new library I created that [helps integrate Atlas.ORM with PHP Debug Bar](/essays/collecting-data-from-atlas-orm-with-php-debug-bar/).

[Hari K T](https://twitter.com/harikt) replied asking about using multiple connections. For instance, if you use Atlas with a default master database for writes and multiple read-only slave databases. My library [AtlasOrm.DebugBar.Bridge](https://github.com/cadrephp/AtlasOrm.DebugBar.Bridge) does not support this is any way out of the box.

I spent the weekend thinking about how to solve this.

First, I asked "How would I do this right now with what's available?" and the answer was:

```php
$atlasContainer = new Cadre\AtlasOrmDebugBarBridge\AtlasContainer(
  'mysql:host=localhost;dbname=testdb',
  'username',
  'password'
);
$debugbar = new DebugBar\StandardDebugBar();
$atlasCollector = new Cadre\AtlasOrmDebugBarBridge\AtlasOrmCollector($atlasContainer);
$atlasContainer->setReadConnection('readonly', function () use ($atlasCollector) {
  $readOnly = new Cadre\AtlasOrmDebugBarBridge\ExtendedPdo(
    'mysql:host=localhost;dbname=slavedb',
    'readonly',
    'password'
  );
  $atlasCollector->addConnection('readonly', $readOnly->getPdo());
  return $readOnly;
});
$debugbar->addCollector($atlasCollector);
```

I wasn't happy with this solution. Too complicated and too easy to mess up.

It was difficult, because of Atlas.ORM inheriting the Aura.SQL requirement that adding read and write connections require a callable that returns the connection. This is done because if we want to register multiple possible connections, we don't want to connect to all of them right away. We only want to connect when we're using the connection.

Finally, yesterday morning I came up with a possible solution.

If I created a new class `ConnectionFactory` that could be configured identically as a connection and be passed into `AtlasContainer` as a callable (I implement the `__invoke` method). It could then also be aware of the `AtlasOrmCollector` which would have a new method `addConnectionFactory` that registered itself with the `ConnectionFactory` object.

This way, I could easily configure new connections (via ConnectionFactory), add them to the `AtlasContainer` and `AtlasOrmCollector` and they would wire themselves up. The `TraceablePDO` connection would only get added to the collector when it was invoked which prevented me from invoking all of the connections up front whether they were used or not.

The new method of adding multiple connections is then:

```php
$atlasContainer = Cadre\AtlasOrmDebugBarBridge\AtlasContainer(
  'mysql:host=localhost;dbname=testdb',
  'username',
  'password'
);
$factory = new Cadre\AtlasOrmDebugBarBridge\ConnectionFactory(
  'mysql:host=localhost;dbname=slavedb',
  'readonly',
  'password'
);
$atlasContainer->setReadConnection('readonly', $factory);
$collector = new Cadre\AtlasOrmDebugBarBridge\AtlasOrmCollector($container);
$collector->addConnectionFactory($factory, 'readonly');
$debugbar = new DebugBar\StandardDebugBar();
$debugbar->addCollector($collector);
```

I think it looks a lot cleaner and less prone to errors.

This code is currently sitting as a PR to allow any interested parties to comment before it gets merged. [Introducing ConnectionFactory](https://github.com/cadrephp/AtlasOrm.DebugBar.Bridge/pull/2). Feel free to review and comment.

