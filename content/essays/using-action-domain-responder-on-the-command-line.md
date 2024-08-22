---
title: Using Action-Domain-Responder on the command line
date: 2016-10-22T14:39:24.000Z
updated: 2016-10-22T14:39:24.000Z
published: true
---

Yesterday I was working on a project in [Radar](https://github.com/radarphp/Radar.Project) and needed to create a command line tool for it.

In the past, I've always used [Symfony Console](http://symfony.com/doc/current/components/console.html) which I like. Since my application was already built using Radar and adhering to [Action-Domain-Responder](http://pmjones.io/adr/) and Clean Architecture, I wanted a solution that was more consistent with the rest of the codebase.

The selling point to [Clean Architecture](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html) is that your domain logic is separate from the delivery mechanism. So if Radar was my delivery mechanism, I should be able to have a different command line delivery mechanism and my domain shouldn't know or care.

I took a look at [Aura.Cli](https://github.com/auraphp/Aura.Cli) which seems nice. However, it's very much a command line library. Out of the box, it's not a framework for building command line tools adhering to ADR.

So I took a stab at writing one (that uses Aura.Cli), it's called [Cadre.CliAdr](https://github.com/cadrephp/Cadre.CliAdr).

At this point, it's more of a proof of concept rather than a production solution. It's heavily based on Radar and uses the same patterns.

Here is an example of how you'd use it. It will seem very familiar [if you've used Radar](/essays/radar-under-the-hood/).

```php
use Aura\Di\ContainerBuilder;
use Aura\Cli\CliFactory;
require __DIR__ . '/../vendor/autoload.php';
$di = (new ContainerBuilder())
  ->newConfiguredInstance([
  ]);
$adr = $di->get('cadre:cliadr/adr');
$factory = new CliFactory();
$context = $factory->newContext($GLOBALS);
$stdio = $factory->newStdio();
$adr->route('test', function ($params) {
});
exit($adr->run($context, $stdio));
```

Expect revisions and documentation to come.  In the meantime, please post any comments here or as an [issue on GitHub](https://github.com/cadrephp/Cadre.CliAdr/issues).

